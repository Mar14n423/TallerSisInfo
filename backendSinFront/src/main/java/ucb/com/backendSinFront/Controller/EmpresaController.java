package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Empresa;
import ucb.com.backendSinFront.service.EmpresaService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import ucb.com.backendSinFront.LogHelper;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaController {

  @Autowired
  private EmpresaService empresaService;

  // Get general
  @GetMapping
  public List<Empresa> obtenerEmpresas() {
    return empresaService.obtenerTodas();
  }

  // Get por id
  @GetMapping("/{id}")
  public Optional<Empresa> obtenerEmpresa(@PathVariable Long id) {
    return empresaService.obtenerPorId(id);
  }

  // Crear
  @PostMapping("/create")
  public Empresa crearEmpresa(@RequestBody Empresa empresa) {
    return empresaService.guardar(empresa);
  }

  // Eliminar
  @DeleteMapping("/{id}")
  public void eliminarEmpresa(@PathVariable Long id) {
    empresaService.eliminar(id);
  }

  // Editar
  @PutMapping("/{id}")
  public Empresa actualizarEmpresa(@PathVariable Long id, @RequestBody Empresa empresaActualizada) {
    return empresaService.actualizarEmpresa(id, empresaActualizada);
  }

  // Login para empresas
  @PostMapping("/login")
  public ResponseEntity<?> autenticarEmpresa(@RequestBody Empresa empresa) {
    Optional<Empresa> empresaExistente = empresaService.obtenerPorCorreo(empresa.getCorreo());

    if (empresaExistente.isPresent()) {
      LogHelper.info(EmpresaController.class, "Empresa encontrada: " + empresaExistente.get().getCorreo());
      LogHelper.debug(EmpresaController.class, "Contraseña recibida: " + empresa.getPasswordHash());
      LogHelper.debug(EmpresaController.class, "Contraseña almacenada: " + empresaExistente.get().getPasswordHash());

      if (empresaExistente.get().getPasswordHash().equals(empresa.getPasswordHash())) {
        return ResponseEntity.ok().body(empresaExistente.get());
      } else {
        LogHelper.error(EmpresaController.class, "Contraseña incorrecta para la empresa: " + empresa.getCorreo());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
      }
    } else {
      LogHelper.error(EmpresaController.class, "Empresa no encontrada: " + empresa.getCorreo());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }
  }
}
