package ucb.com.backendSinFront.Controller;

import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Empresa;
import ucb.com.backendSinFront.service.EmpresaService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import ucb.com.backendSinFront.LogHelper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaController {

  @Autowired
  private EmpresaService empresaService;

  @PostMapping("/registro")
  public ResponseEntity<String> registrarEmpresa(@RequestBody Empresa empresa) {
    if (empresaService.obtenerPorCorreo(empresa.getCorreo()).isPresent()) {
      return ResponseEntity.badRequest().body("Ya existe una empresa con este correo, ingrese otro correo.");
    }

    empresaService.guardar(empresa);
    return ResponseEntity.ok("Empresa registrada exitosamente");
  }

  @PostMapping("/iniciar-sesion")
  public ResponseEntity<String> iniciarSesion(@RequestBody Empresa empresa) {
    if (empresa.getCorreo() == null || empresa.getCorreo().isEmpty() ||
      empresa.getPasswordHash() == null || empresa.getPasswordHash().isEmpty()) {
      return ResponseEntity.badRequest().body("Los campos de correo y contraseña son obligatorios.");
    }

    Optional<Empresa> empresaExistente = empresaService.obtenerPorCorreo(empresa.getCorreo());

    if (empresaExistente.isPresent()) {
      if (empresaExistente.get().getPasswordHash().equals(empresa.getPasswordHash())) {
        return ResponseEntity.ok("Inicio de sesión exitoso.");
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta.");
      }
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Correo no encontrado.");
  }
}
