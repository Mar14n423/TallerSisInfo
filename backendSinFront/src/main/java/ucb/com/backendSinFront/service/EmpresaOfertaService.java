package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.entity.HistorialPublicacion;
import ucb.com.backendSinFront.repository.OfertaEmpleoRepository;
import ucb.com.backendSinFront.repository.HistorialPublicacionRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaOfertaService {

  @Autowired
  private OfertaEmpleoRepository ofertaRepo;

  @Autowired
  private HistorialPublicacionRepository historialRepo;

  public List<OfertaEmpleo> obtenerOfertasPorEmpresa(Long idEmpresa) {
    return ofertaRepo.findByIdEmpresa(idEmpresa);
  }

  public OfertaEmpleo crearOfertaEmpresa(OfertaEmpleo oferta) {
    oferta.setFechaPublicacion(LocalDate.now());
    oferta.setEstado("Activa");
    OfertaEmpleo guardada = ofertaRepo.save(oferta);

    guardarHistorial(guardada, "CREADA");

    return guardada;
  }

  public OfertaEmpleo editarOfertaEmpresa(Long id, OfertaEmpleo nueva) {
    Optional<OfertaEmpleo> original = ofertaRepo.findById(id);
    if (original.isPresent()) {
      OfertaEmpleo actualizada = original.get();
      actualizada.setTituloTrabajo(nueva.getTituloTrabajo());
      actualizada.setDescripcion(nueva.getDescripcion());
      actualizada.setRequisitos(nueva.getRequisitos());
      actualizada.setUbicacion(nueva.getUbicacion());
      actualizada.setTipoContrato(nueva.getTipoContrato());
      actualizada.setEstado("Editada");
      OfertaEmpleo guardada = ofertaRepo.save(actualizada);

      guardarHistorial(guardada, "EDITADA");
      return guardada;
    } else {
      return null;
    }
  }

  public void eliminarOfertaEmpresa(Long id) {
    Optional<OfertaEmpleo> oferta = ofertaRepo.findById(id);
    if (oferta.isPresent()) {
      OfertaEmpleo eliminada = oferta.get();
      eliminada.setEstado("Eliminada");
      ofertaRepo.save(eliminada);

      guardarHistorial(eliminada, "ELIMINADA");
    }
  }

  public List<HistorialPublicacion> obtenerHistorialEmpresa(Long idEmpresa, int page, int size) {
    return historialRepo.findByIdEmpresaOrderByFechaAccionDesc(idEmpresa, PageRequest.of(page, size)).getContent();
  }

  private void guardarHistorial(OfertaEmpleo oferta, String accion) {
    HistorialPublicacion hist = new HistorialPublicacion();
    hist.setIdOferta(oferta.getId());
    hist.setIdEmpresa(oferta.getIdEmpresa());
    hist.setAccion(accion);
    hist.setFechaAccion(LocalDateTime.now());
    hist.setDescripcionSnapshot(oferta.getDescripcion());
    historialRepo.save(hist);
  }
}
