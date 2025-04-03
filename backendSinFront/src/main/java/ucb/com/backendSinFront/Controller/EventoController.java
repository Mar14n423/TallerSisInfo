package ucb.com.backendSinFront.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.service.EventoService;

import java.util.List;
import java.util.Optional;

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

  // Obtener evento por ID
  @GetMapping("/{id}")
  public Optional<Evento> obtenerEvento(@PathVariable Long id) {
    return eventoService.obtenerPorId(id);
  }

  // Crear un nuevo evento
  @PostMapping("/create")
  public Evento crearEvento(@RequestBody Evento evento) {
    return eventoService.guardar(evento);
  }

  // Eliminar evento por ID
  @DeleteMapping("/{id}")
  public void eliminarEvento(@PathVariable Long id) {
    eventoService.eliminar(id);
  }

  // Actualizar evento por ID
  @PutMapping("/{id}")
  public Evento actualizarEvento(@PathVariable Long id, @RequestBody Evento eventoActualizado) {
    return eventoService.actualizarEvento(id, eventoActualizado);
  }
}
