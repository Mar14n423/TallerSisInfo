package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  public List<Usuario> obtenerTodos() {
    return usuarioRepository.findAll();
  }

  public Optional<Usuario> obtenerPorId(Long id) {
    return usuarioRepository.findById(id);
  }

  public Optional<Usuario> obtenerPorCorreo(String correo) {
    return usuarioRepository.findByCorreo(correo);
  }

  // Fragmento relevante del método guardar
  public Usuario guardar(Usuario usuario) {
    if (usuario.getPasswordHash() != null) {
      usuario.setPasswordHash(passwordEncoder.encode(usuario.getPasswordHash()));
    }
    return usuarioRepository.save(usuario);
  }

  // Fragmento del método actualizarUsuario
  public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
    return usuarioRepository.findById(id)
      .map(usuario -> {
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setCorreo(usuarioActualizado.getCorreo());
        usuario.setDiscapacidad(usuarioActualizado.getDiscapacidad());
        if (usuarioActualizado.getPasswordHash() != null) {
          usuario.setPasswordHash(usuarioActualizado.getPasswordHash());
        }
        if (usuarioActualizado.getProfileImage() != null) {
          usuario.setProfileImage(usuarioActualizado.getProfileImage());
        }
        if (usuarioActualizado.getTipo() != null) {
          usuario.setTipo(usuarioActualizado.getTipo());
        }
        if (usuarioActualizado.getTelefono() != null) {
          usuario.setTelefono(usuarioActualizado.getTelefono());
        }
        if (usuarioActualizado.getDireccion() != null) {
          usuario.setDireccion(usuarioActualizado.getDireccion());
        }
        return usuarioRepository.save(usuario);
      })
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
  }


  public void eliminar(Long id) {
    usuarioRepository.deleteById(id);
  }



  public Usuario actualizarTipoUsuario(Long id, String tipo) {
    return usuarioRepository.findById(id)
      .map(usuario -> {
        if (tipo != null && (tipo.equalsIgnoreCase("A") || tipo.equalsIgnoreCase("U"))) {
          usuario.setTipo(tipo.toUpperCase());
        } else {
          throw new RuntimeException("Tipo de usuario no válido. Debe ser 'A' o 'U'");
        }
        return usuarioRepository.save(usuario);
      })
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
  }
}
