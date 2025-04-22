package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.service.EventoService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoController {

  @Autowired
  private EventoService eventoService;

  // Obtener todos los eventos
  @GetMapping
  public List<Evento> obtenerEventos() {
    return eventoService.obtenerTodos();
  }

  // Obtener eventos por rango de fechas (para el calendario)
  @GetMapping("/rango")
  public List<Evento> obtenerEventosPorRango(
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date inicio,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fin) {
    return eventoService.obtenerPorRangoDeFecha(inicio, fin);
  }

  // Obtener evento por ID
  @GetMapping("/{id}")
  public ResponseEntity<Evento> obtenerEvento(@PathVariable String id) {
    return eventoService.obtenerPorId(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Crear un nuevo evento
  @PostMapping
  public Evento crearEvento(@RequestBody Evento evento) {
    return eventoService.guardar(evento);
  }

  // Eliminar evento por ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminarEvento(@PathVariable String id) {
    eventoService.eliminar(id);
    return ResponseEntity.noContent().build();
  }

  // Actualizar evento por ID
  @PutMapping("/{id}")
  public ResponseEntity<Evento> actualizarEvento(@PathVariable String id, @RequestBody Evento eventoActualizado) {
    return ResponseEntity.ok(eventoService.actualizarEvento(id, eventoActualizado));
  }
}
