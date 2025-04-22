package ucb.com.backendSinFront.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import ucb.com.backendSinFront.LogHelper;


import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  //Get general
  @GetMapping
  public List<Usuario> obtenerUsuarios() {
    return usuarioService.obtenerTodos();
  }

  //Get por id
  @GetMapping("/{id}")
  public Optional<Usuario> obtenerUsuario(@PathVariable Long id) {
    return usuarioService.obtenerPorId(id);
  }

  //Crear
  @PostMapping("/create")
  public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {

    if (usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()) {
      return ResponseEntity.badRequest().body("El correo no puede estar vacio");
    }

    if (!usuario.getCorreo().contains("@") || !usuario.getCorreo().contains(".")) {
      return ResponseEntity.badRequest().body("El correo debe tener un formato valido");
    }

    Usuario usuarioGuardado = usuarioService.guardar(usuario);
    return ResponseEntity.ok(usuarioGuardado);
  }

  //Eliminar
  @DeleteMapping("/{id}")
  public void eliminarUsuario(@PathVariable Long id) {
    usuarioService.eliminar(id);
  }

  //Editar
  @PutMapping("/{id}")
  public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
    return usuarioService.actualizarUsuario(id, usuarioActualizado);
  }
  @PatchMapping("/{id}")
  public ResponseEntity<Usuario> actualizarTipoUsuario(
    @PathVariable Long id,
    @RequestBody Map<String, String> updates) {

    if (!updates.containsKey("tipo")) {
      return ResponseEntity.badRequest().build();
    }

    try {
      Usuario usuarioActualizado = usuarioService.actualizarTipoUsuario(id, updates.get("tipo"));
      return ResponseEntity.ok(usuarioActualizado);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }
  @PostMapping("/login")
  public ResponseEntity<?> autenticarUsuario(@RequestBody Usuario usuario) {
    Optional<Usuario> usuarioExistente = usuarioService.obtenerPorCorreo(usuario.getCorreo());

    if (usuarioExistente.isPresent()) {
      LogHelper.info(UsuarioController.class, "Usuario encontrado: " + usuarioExistente.get().getCorreo());
      LogHelper.debug(UsuarioController.class, "Contraseña recibida: " + usuario.getPasswordHash());
      LogHelper.debug(UsuarioController.class, "Contraseña almacenada: " + usuarioExistente.get().getPasswordHash());

      if (usuarioExistente.get().getPasswordHash().equals(usuario.getPasswordHash())) {
        return ResponseEntity.ok().body(usuarioExistente.get());
      } else {
        LogHelper.error(UsuarioController.class, "Contraseña incorrecta para el usuario: " + usuario.getCorreo());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
      }
    } else {
      LogHelper.error(UsuarioController.class, "Usuario no encontrado: " + usuario.getCorreo());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }
  }
}
