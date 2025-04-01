package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import java.util.List;
import java.util.Optional;

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
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
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

