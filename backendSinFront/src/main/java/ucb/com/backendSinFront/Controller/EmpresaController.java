package ucb.com.backendSinFront.Controller;

import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Empresa;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.EmpresaService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import ucb.com.backendSinFront.LogHelper;
import org.springframework.beans.factory.annotation.Autowired;
import ucb.com.backendSinFront.service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaController {

  @Autowired
  private EmpresaService empresaService;

  //Get general
  @GetMapping
  public List<Empresa> obtenerEmpresa() {
    return empresaService.obtenerTodas();
  }

  //Get por id
  @GetMapping("/{id}")
  public Optional<Empresa> obtenerEmpresa(@PathVariable Long id) {
    return empresaService.obtenerPorId(id);
  }

  //Crear
  @PostMapping("/create")
  public Empresa crearEmpresa(@RequestBody Empresa empresa) {
    return empresaService.guardar(empresa);
  }

  //Eliminar
  @DeleteMapping("/{id}")
  public void eliminarEmpresa(@PathVariable Long id) {
    empresaService.eliminar(id);
  }

  //Editar
  @PutMapping("/{id}")
  public Empresa actualizarEmpresa(@PathVariable Long id, @RequestBody Empresa empresaActualizada) {
    return empresaService.actualizarEmpresa(id, empresaActualizada);
  }

  @PostMapping("/login")
  public ResponseEntity<?> autenticarEmpresa(@RequestBody Empresa empresa) {
    Optional<Empresa> empresaExistente = empresaService.obtenerPorCorreo(empresa.getCorreo());

    if (empresaExistente.isEmpty()) {
      LogHelper.error(EmpresaController.class, "Empresa no encontrada: " + empresa.getCorreo());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo incorrecto");
    }

    Empresa empresaGuardada = empresaExistente.get();
    if (!empresaGuardada.getPasswordHash().equals(empresa.getPasswordHash())) {
      LogHelper.error(EmpresaController.class, "Contraseña incorrecta para: " + empresa.getCorreo());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
    }

    LogHelper.info(EmpresaController.class, "Empresa autenticada: " + empresaGuardada.getCorreo());
    return ResponseEntity.ok().body(empresaGuardada);
  }

}
