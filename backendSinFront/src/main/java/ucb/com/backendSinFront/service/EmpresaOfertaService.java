package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.EmpresaOferta;
import ucb.com.backendSinFront.repository.EmpresaOfertaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaOfertaService {

  private final EmpresaOfertaRepository empresaOfertaRepository;

  @Autowired
  public EmpresaOfertaService(EmpresaOfertaRepository empresaOfertaRepository) {
    this.empresaOfertaRepository = empresaOfertaRepository;
  }

  // Obtener todas las ofertas
  public List<EmpresaOferta> obtenerTodasLasOfertas() {
    return empresaOfertaRepository.findAll();
  }

  // Obtener una oferta por ID
  public Optional<EmpresaOferta> obtenerOfertaPorId(Long id) {
    return empresaOfertaRepository.findById(id);
  }

  // Crear una oferta (sin imagen)
  public EmpresaOferta crearOferta(EmpresaOferta oferta) {
    return empresaOfertaRepository.save(oferta);
  }

  // Crear una oferta con imagen
  public EmpresaOferta crearOfertaConImagen(String descripcion, String nombreImagen) {
    EmpresaOferta nueva = new EmpresaOferta();
    nueva.setDescripcion(descripcion);
    nueva.setImagen(nombreImagen); // Asegúrate que tu entidad tenga el campo imagen
    nueva.setFechaPublicacion(LocalDate.now());
    nueva.setEstado("ACTIVO"); // Opcional: establece estado inicial
    return empresaOfertaRepository.save(nueva);
  }

  // Actualizar una oferta
  public EmpresaOferta actualizarOferta(Long id, EmpresaOferta nuevaOferta) {
    return empresaOfertaRepository.findById(id).map(oferta -> {
      oferta.setIdEmpresa(nuevaOferta.getIdEmpresa());
      oferta.setTituloTrabajo(nuevaOferta.getTituloTrabajo());
      oferta.setDescripcion(nuevaOferta.getDescripcion());
      oferta.setRequisitos(nuevaOferta.getRequisitos());
      oferta.setUbicacion(nuevaOferta.getUbicacion());
      oferta.setTipoContrato(nuevaOferta.getTipoContrato());
      oferta.setEstado(nuevaOferta.getEstado());
      oferta.setFechaPublicacion(nuevaOferta.getFechaPublicacion());
      return empresaOfertaRepository.save(oferta);
    }).orElseThrow(() -> new RuntimeException("Oferta no encontrada con ID: " + id));
  }

  // Eliminar una oferta
  public void eliminarOferta(Long id) {
    empresaOfertaRepository.deleteById(id);
  }
}
