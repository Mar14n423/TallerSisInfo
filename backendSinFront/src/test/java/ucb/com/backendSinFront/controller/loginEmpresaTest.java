package ucb.com.backendSinFront.Controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ucb.com.backendSinFront.entity.Empresa;
import ucb.com.backendSinFront.service.EmpresaService;
import ucb.com.backendSinFront.Controller.EmpresaController;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class loginEmpresaTest {

  @Mock
  private EmpresaService empresaService;

  @InjectMocks
  private EmpresaController empresaController;

  private Empresa empresaTest;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);

    empresaTest = new Empresa();
    empresaTest.setId(1L);
    empresaTest.setCorreo("empresa@test.com");
    empresaTest.setPasswordHash("correctPassword");
  }

  @Test
  void loginSuccess_ReturnsEmpresaAndOkStatus() {
    // Arrange
    Empresa loginRequest = new Empresa();
    loginRequest.setCorreo("empresa@test.com");
    loginRequest.setPasswordHash("correctPassword");

    when(empresaService.obtenerPorCorreo("empresa@test.com"))
      .thenReturn(Optional.of(empresaTest));

    // Act
    ResponseEntity<?> response = empresaController.loginEmpresa(loginRequest);

    // Assert
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertTrue(response.getBody() instanceof Empresa);
    assertEquals("empresa@test.com", ((Empresa) response.getBody()).getCorreo());
  }

  @Test
  void loginFailure_ReturnsUnauthorizedStatus() {
    // Arrange
    Empresa loginRequest = new Empresa();
    loginRequest.setCorreo("empresa@test.com");
    loginRequest.setPasswordHash("wrongPassword");

    when(empresaService.obtenerPorCorreo("empresa@test.com"))
      .thenReturn(Optional.of(empresaTest));

    // Act
    ResponseEntity<?> response = empresaController.loginEmpresa(loginRequest);

    // Assert
    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertEquals("Credenciales incorrectas", response.getBody());
  }

  @Test
  void loginUserNotFound_ReturnsUnauthorizedStatus() {
    // Arrange
    Empresa loginRequest = new Empresa();
    loginRequest.setCorreo("nonexistent@test.com");
    loginRequest.setPasswordHash("anyPassword");

    when(empresaService.obtenerPorCorreo("nonexistent@test.com"))
      .thenReturn(Optional.empty());

    // Act
    ResponseEntity<?> response = empresaController.loginEmpresa(loginRequest);

    // Assert
    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertEquals("Credenciales incorrectas", response.getBody());
  }
}
