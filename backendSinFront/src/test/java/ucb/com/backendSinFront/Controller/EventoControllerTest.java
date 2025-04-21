package ucb.com.backendSinFront.Controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.service.EventoService;

import java.util.*;

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
    evento.setDate(new Date());
    evento.setBackground("azul");
    evento.setColor("blanco");
  }

  @Test
  void obtenerEventos() {
    when(eventoService.obtenerTodos()).thenReturn(List.of(evento));

    List<Evento> resultado = eventoController.obtenerEventos();

    assertNotNull(resultado);
    assertEquals(1, resultado.size());
    assertEquals("Reunión", resultado.get(0).getName());
  }

  @Test
  void obtenerEventosPorRango() {
    Date inicio = new Date();
    Date fin = new Date();
    when(eventoService.obtenerPorRangoDeFecha(inicio, fin)).thenReturn(List.of(evento));

    List<Evento> resultado = eventoController.obtenerEventosPorRango(inicio, fin);

    assertNotNull(resultado);
    assertEquals(1, resultado.size());
  }

  @Test
  void obtenerEvento_Encontrado() {
    when(eventoService.obtenerPorId("test-id")).thenReturn(Optional.of(evento));

    ResponseEntity<Evento> response = eventoController.obtenerEvento("test-id");

    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Reunión", response.getBody().getName());
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
  }

  @Test
  void eliminarEvento() {
    doNothing().when(eventoService).eliminar("test-id");

    ResponseEntity<Void> response = eventoController.eliminarEvento("test-id");

    assertEquals(204, response.getStatusCodeValue());
  }

  @Test
  void actualizarEvento() {
    Evento actualizado = new Evento("Actualizado", "📌", new Date(), "verde", "negro");
    actualizado.setId("test-id");

    when(eventoService.actualizarEvento(eq("test-id"), any(Evento.class))).thenReturn(actualizado);

    ResponseEntity<Evento> response = eventoController.actualizarEvento("test-id", actualizado);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Actualizado", response.getBody().getName());
  }
}
