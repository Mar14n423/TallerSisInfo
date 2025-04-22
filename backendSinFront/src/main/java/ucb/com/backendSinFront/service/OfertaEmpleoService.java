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

  public List<OfertaEmpleo> listar() {
    return repository.findAll();
  }

  public Optional<OfertaEmpleo> obtenerPorId(Long id) {
    return repository.findById(id);
  }

  public OfertaEmpleo crearOferta(OfertaEmpleo oferta) {
    oferta.setFechaPublicacion(LocalDate.now());
    oferta.setEstado("Activo");
    return repository.save(oferta);
  }

  public void eliminar(Long id) {
    repository.deleteById(id);
  }

  public List<OfertaEmpleo> filtrarPorUbicacion(String ubicacion) {
    return repository.findByUbicacion(ubicacion);
  }

  public List<OfertaEmpleo> filtrarPorContrato(String tipoContrato) {
    return repository.findByTipoContrato(tipoContrato);
  }

  public List<OfertaEmpleo> filtrarPorEstado(String estado) {
    return repository.findByEstado(estado);
  }
}
