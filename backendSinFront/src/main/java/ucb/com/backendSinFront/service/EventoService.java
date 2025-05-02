package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.repository.EventoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

  @Autowired
  private EventoRepository eventoRepository;

  public List<Evento> obtenerTodos() {
    return eventoRepository.findAll();
  }

  public List<Evento> obtenerPorRangoDeFecha(LocalDateTime inicio, LocalDateTime fin) {
    return eventoRepository.findByDateBetween(inicio, fin);
  }

  public Optional<Evento> obtenerPorId(String id) {
    return eventoRepository.findById(id);
  }

  public Evento guardar(Evento evento) {
    return eventoRepository.save(evento);
  }

  public void eliminar(String id) {
    eventoRepository.deleteById(id);
  }

  public Evento actualizarEvento(String id, Evento eventoActualizado) {
    return eventoRepository.findById(id)
      .map(evento -> {
        evento.setName(eventoActualizado.getName());
        evento.setIcon(eventoActualizado.getIcon());
        evento.setDate(eventoActualizado.getDate());
        evento.setBackground(eventoActualizado.getBackground());
        evento.setColor(eventoActualizado.getColor());
        evento.setTime(eventoActualizado.getTime());
        evento.setLocation(eventoActualizado.getLocation());
        return eventoRepository.save(evento);
      })
      .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
  }
}
