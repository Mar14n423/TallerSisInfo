package ucb.com.backendSinFront.Controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UsuarioControllerTest {

  @Mock
  private UsuarioService usuarioService;

  @InjectMocks
  private UsuarioController usuarioController;

  private Usuario usuario;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);

    usuario = new Usuario();
    usuario.setId(1L);
    usuario.setNombre("Test User");
    usuario.setCorreo("test@correo.com");
    usuario.setPasswordHash("1234");
    usuario.setTipo("U");
  }

  @Test
  void obtenerUsuarios() {
    List<Usuario> lista = List.of(usuario);
    when(usuarioService.obtenerTodos()).thenReturn(lista);

    List<Usuario> result = usuarioController.obtenerUsuarios();

    assertEquals(1, result.size());
    assertEquals("test@correo.com", result.get(0).getCorreo());
  }

  @Test
  void obtenerUsuario() {
    when(usuarioService.obtenerPorId(1L)).thenReturn(Optional.of(usuario));

    Optional<Usuario> result = usuarioController.obtenerUsuario(1L);

    assertTrue(result.isPresent());
    assertEquals("test@correo.com", result.get().getCorreo());
  }

  @Test
  void crearUsuario() {
    when(usuarioService.guardar(any(Usuario.class))).thenReturn(usuario);

    Usuario result = usuarioController.crearUsuario(usuario);

    assertNotNull(result);
    assertEquals("test@correo.com", result.getCorreo());
  }

  @Test
  void eliminarUsuario() {
    doNothing().when(usuarioService).eliminar(1L);

    assertDoesNotThrow(() -> usuarioController.eliminarUsuario(1L));
    verify(usuarioService, times(1)).eliminar(1L);
  }

  @Test
  void actualizarUsuario() {
    when(usuarioService.actualizarUsuario(eq(1L), any(Usuario.class))).thenReturn(usuario);

    Usuario result = usuarioController.actualizarUsuario(1L, usuario);

    assertNotNull(result);
    assertEquals("test@correo.com", result.getCorreo());
  }

  @Test
  void actualizarTipoUsuario_Success() {
    when(usuarioService.actualizarTipoUsuario(1L, "A")).thenReturn(usuario);

    Map<String, String> tipoMap = new HashMap<>();
    tipoMap.put("tipo", "A");

    ResponseEntity<Usuario> response = usuarioController.actualizarTipoUsuario(1L, tipoMap);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }

  @Test
  void actualizarTipoUsuario_MissingTipo() {
    Map<String, String> tipoMap = new HashMap<>(); // No contiene "tipo"

    ResponseEntity<Usuario> response = usuarioController.actualizarTipoUsuario(1L, tipoMap);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
  }

  @Test
  void actualizarTipoUsuario_NotFound() {
    Map<String, String> tipoMap = new HashMap<>();
    tipoMap.put("tipo", "A");

    when(usuarioService.actualizarTipoUsuario(1L, "A")).thenThrow(new RuntimeException("Usuario no encontrado"));

    ResponseEntity<Usuario> response = usuarioController.actualizarTipoUsuario(1L, tipoMap);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }

  @Test
  void autenticarUsuario_Success() {
    when(usuarioService.obtenerPorCorreo("test@correo.com")).thenReturn(Optional.of(usuario));

    Usuario login = new Usuario();
    login.setCorreo("test@correo.com");
    login.setPasswordHash("1234");

    ResponseEntity<?> response = usuarioController.autenticarUsuario(login);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof Usuario);
  }

  @Test
  void autenticarUsuario_WrongPassword() {
    when(usuarioService.obtenerPorCorreo("test@correo.com")).thenReturn(Optional.of(usuario));

    Usuario login = new Usuario();
    login.setCorreo("test@correo.com");
    login.setPasswordHash("wrong");

    ResponseEntity<?> response = usuarioController.autenticarUsuario(login);

    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertEquals("Credenciales incorrectas", response.getBody());
  }

  @Test
  void autenticarUsuario_NotFound() {
    when(usuarioService.obtenerPorCorreo("unknown@correo.com")).thenReturn(Optional.empty());

    Usuario login = new Usuario();
    login.setCorreo("unknown@correo.com");
    login.setPasswordHash("1234");

    ResponseEntity<?> response = usuarioController.autenticarUsuario(login);

    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertEquals("Credenciales incorrectas", response.getBody());
  }
}
