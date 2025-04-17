package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> obtenerPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

  public Usuario guardar(Usuario usuario) {
    if (usuario.getTipo() == null) {
      usuario.setTipo(null); // O puedes asignar un valor por defecto, por ejemplo: usuario.setTipo("U");
    }
    return usuarioRepository.save(usuario);
  }





  public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
  public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
    return usuarioRepository.findById(id)
      .map(usuario -> {
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setCorreo(usuarioActualizado.getCorreo());
        usuario.setDiscapacidad(usuarioActualizado.getDiscapacidad());
        usuario.setPasswordHash(usuarioActualizado.getPasswordHash());

        // Solo actualiza 'tipo' si se proporciona en la petición
        if (usuarioActualizado.getTipo() != null) {
          usuario.setTipo(usuarioActualizado.getTipo());
        }

        return usuarioRepository.save(usuario);
      })
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
  }

  public Usuario actualizarTipoUsuario(Long id, String tipo) {
    return usuarioRepository.findById(id)
      .map(usuario -> {
        // Validar que el tipo sea A o U
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
