package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.repository.OfertaEmpleoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OfertaEmpleoService {

  @Autowired
  private OfertaEmpleoRepository repository;

  // Listar todos
  public List<OfertaEmpleo> listar() {
    return repository.findAll();
  }

  // Obtener por ID
  public Optional<OfertaEmpleo> obtenerPorId(Long id) {
    return repository.findById(id);
  }

  // Crear oferta
  public OfertaEmpleo crearOferta(OfertaEmpleo oferta) {
    oferta.setFechaPublicacion(LocalDate.now());
    if (oferta.getEstado() == null) {
      oferta.setEstado("ACTIVO");
    }
    return repository.save(oferta);
  }

  // Actualizar oferta
  public OfertaEmpleo actualizarOferta(Long id, OfertaEmpleo nueva) {
    return repository.findById(id).map(oferta -> {
      oferta.setIdEmpresa(nueva.getIdEmpresa());
      oferta.setTituloTrabajo(nueva.getTituloTrabajo());
      oferta.setDescripcion(nueva.getDescripcion());
      oferta.setRequisitos(nueva.getRequisitos());
      oferta.setUbicacion(nueva.getUbicacion());
      oferta.setTipoContrato(nueva.getTipoContrato());
      oferta.setEstado(nueva.getEstado());
      oferta.setFechaPublicacion(nueva.getFechaPublicacion());
      oferta.setImagenNombre(nueva.getImagenNombre());
      return repository.save(oferta);
    }).orElseThrow(() -> new RuntimeException("Oferta no encontrada con ID: " + id));
  }

  // Eliminar
  public void eliminar(Long id) {
    repository.deleteById(id);
  }

  // Filtros
  public List<OfertaEmpleo> filtrarPorUbicacion(String ubicacion) {
    return repository.findByUbicacion(ubicacion);
  }

  public List<OfertaEmpleo> filtrarPorContrato(String tipoContrato) {
    return repository.findByTipoContrato(tipoContrato);
  }

  public List<OfertaEmpleo> filtrarPorEstado(String estado) {
    return repository.findByEstado(estado);
  }

  // Buscar empleos por empresa
  public List<OfertaEmpleo> obtenerPorEmpresa(Long idEmpresa) {
    return repository.findByIdEmpresa(idEmpresa);
  }
}
