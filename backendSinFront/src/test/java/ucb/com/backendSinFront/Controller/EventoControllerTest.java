package ucb.com.backendSinFront.Controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.service.EventoService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventoControllerTest {

  @Mock
  private EventoService eventoService;

  @InjectMocks
  private EventoController eventoController;

  private Evento evento;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);

    evento = new Evento();
    evento.setId("test-id");
    evento.setName("Reunión");
    evento.setIcon("📅");
    evento.setDate(LocalDateTime.now());
    evento.setBackground("azul");
    evento.setColor("blanco");
    evento.setTime("10:30");
    evento.setLocation("Cbba");
  }

  @Test
  void obtenerEventos() {
    when(eventoService.obtenerTodos()).thenReturn(List.of(evento));

    List<Evento> resultado = eventoController.obtenerEventos();

    assertNotNull(resultado);
    assertEquals(1, resultado.size());
    assertEquals("Reunión", resultado.get(0).getName());
    assertEquals("10:30", resultado.get(0).getTime());
    assertEquals("Cbba", resultado.get(0).getLocation());
  }

  @Test
  void obtenerEventosPorRango() {
    LocalDateTime inicio = LocalDateTime.now().minusDays(1);
    LocalDateTime fin = LocalDateTime.now().plusDays(1);
    when(eventoService.obtenerPorRangoDeFecha(inicio, fin)).thenReturn(List.of(evento));

    List<Evento> resultado = eventoController.obtenerEventosPorRango(inicio, fin);

    assertNotNull(resultado);
    assertEquals(1, resultado.size());
    assertEquals("10:30", resultado.get(0).getTime());
  }

  @Test
  void obtenerEvento_Encontrado() {
    when(eventoService.obtenerPorId("test-id")).thenReturn(Optional.of(evento));

    ResponseEntity<Evento> response = eventoController.obtenerEvento("test-id");

    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Reunión", response.getBody().getName());
    assertEquals("Cbba", response.getBody().getLocation());
  }

  @Test
  void obtenerEvento_NoEncontrado() {
    when(eventoService.obtenerPorId("test-id")).thenReturn(Optional.empty());

    ResponseEntity<Evento> response = eventoController.obtenerEvento("test-id");

    assertEquals(404, response.getStatusCodeValue());
  }

  @Test
  void crearEvento() {
    when(eventoService.guardar(any(Evento.class))).thenReturn(evento);

    Evento nuevoEvento = eventoController.crearEvento(evento);

    assertNotNull(nuevoEvento);
    assertEquals("Reunión", nuevoEvento.getName());
    assertEquals("10:30", nuevoEvento.getTime());
  }

  @Test
  void eliminarEvento() {
    doNothing().when(eventoService).eliminar("test-id");

    ResponseEntity<Void> response = eventoController.eliminarEvento("test-id");

    assertEquals(204, response.getStatusCodeValue());
  }

  @Test
  void actualizarEvento() {
    Evento actualizado = new Evento();
    actualizado.setId("test-id");
    actualizado.setName("Actualizado");
    actualizado.setIcon("📌");
    actualizado.setDate(LocalDateTime.now());
    actualizado.setBackground("verde");
    actualizado.setColor("negro");
    actualizado.setTime("11:00");
    actualizado.setLocation("La Paz");

    when(eventoService.actualizarEvento(eq("test-id"), any(Evento.class))).thenReturn(actualizado);

    ResponseEntity<Evento> response = eventoController.actualizarEvento("test-id", actualizado);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Actualizado", response.getBody().getName());
    assertEquals("11:00", response.getBody().getTime());
    assertEquals("La Paz", response.getBody().getLocation());
  }
}
