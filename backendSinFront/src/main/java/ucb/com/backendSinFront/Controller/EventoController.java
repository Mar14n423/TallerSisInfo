package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.service.EventoService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoController {

  @Autowired
  private EventoService eventoService;

  @GetMapping
  public List<Evento> obtenerEventos() {
    return eventoService.obtenerTodos();
  }

  @GetMapping("/rango")
  public List<Evento> obtenerEventosPorRango(
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
    return eventoService.obtenerPorRangoDeFecha(inicio, fin);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Evento> obtenerEvento(@PathVariable String id) {
    return eventoService.obtenerPorId(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Evento crearEvento(@RequestBody Evento evento) {
    return eventoService.guardar(evento);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminarEvento(@PathVariable String id) {
    eventoService.eliminar(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Evento> actualizarEvento(@PathVariable String id, @RequestBody Evento eventoActualizado) {
    return ResponseEntity.ok(eventoService.actualizarEvento(id, eventoActualizado));
  }
}
