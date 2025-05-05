package ucb.com.backendSinFront.Controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.UsuarioService;
import ucb.com.backendSinFront.Controller.UsuarioController;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UsuarioControllerTest {

  @Mock
  private UsuarioService usuarioService;

  @InjectMocks
  private UsuarioController usuarioController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void crearUsuario_ConCorreoValido() {

    Usuario usuario = new Usuario();
    usuario.setNombre("Test User");
    usuario.setCorreo("test@example.com");
    usuario.setPasswordHash("password");

    when(usuarioService.guardar(any(Usuario.class))).thenReturn(usuario);


    ResponseEntity<?> response = usuarioController.crearUsuario(usuario);


    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertTrue(response.getBody() instanceof Usuario);
  }

  @Test
  void crearUsuario_ConCorreoVacio() {

    Usuario usuario = new Usuario();
    usuario.setNombre("Test User");
    usuario.setCorreo("");
    usuario.setPasswordHash("password");


    ResponseEntity<?> response = usuarioController.crearUsuario(usuario);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("El correo no puede estar vacio", response.getBody());
  }

  @Test
  void crearUsuario_ConFormatoInvalido() {

    Usuario usuario = new Usuario();
    usuario.setNombre("Test User");
    usuario.setCorreo("correoInvalido");
    usuario.setPasswordHash("password");


    ResponseEntity<?> response = usuarioController.crearUsuario(usuario);


    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("El correo debe tener un formato valido", response.getBody());
  }

  @Test
  void crearUsuario_ConCorreoSinArroba() {

    Usuario usuario = new Usuario();
    usuario.setNombre("Test User");
    usuario.setCorreo("correoInvalido.com");
    usuario.setPasswordHash("password");


    ResponseEntity<?> response = usuarioController.crearUsuario(usuario);


    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("El correo debe tener un formato valido", response.getBody());
  }

  @Test
  void crearUsuario_ConCorreoSinPunto() {

    Usuario usuario = new Usuario();
    usuario.setNombre("Test User");
    usuario.setCorreo("correo@invalido");
    usuario.setPasswordHash("password");


    ResponseEntity<?> response = usuarioController.crearUsuario(usuario);


    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("El correo debe tener un formato valido", response.getBody());
  }
}
