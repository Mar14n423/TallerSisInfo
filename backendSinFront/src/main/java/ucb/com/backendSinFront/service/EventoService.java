package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Evento;
import ucb.com.backendSinFront.repository.EventoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

  @Autowired
  private EventoRepository eventoRepository;

  public List<Evento> obtenerTodos() {
    return eventoRepository.findAll();
  }

  public Optional<Evento> obtenerPorId(Long id) {
    return eventoRepository.findById(id);
  }

  public Evento guardar(Evento evento) {
    return eventoRepository.save(evento);
  }

  public void eliminar(Long id) {
    eventoRepository.deleteById(id);
  }

  public Evento actualizarEvento(Long id, Evento eventoActualizado) {
    return eventoRepository.findById(id)
      .map(evento -> {
        evento.setNombre(eventoActualizado.getNombre());
        evento.setBaseDeDatos(eventoActualizado.getBaseDeDatos());
        evento.setFecha(eventoActualizado.getFecha());
        return eventoRepository.save(evento);
      })
      .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
  }
}
