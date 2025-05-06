package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.HistorialPublicacion;
import ucb.com.backendSinFront.repository.HistorialPublicacionRepository;

import java.util.List;

@Service
public class HistorialPublicacionService {

  @Autowired
  private HistorialPublicacionRepository historialRepo;

  public List<HistorialPublicacion> obtenerTodosLosHistoriales(int page, int size) {
    return historialRepo.findAllByOrderByFechaAccionDesc(PageRequest.of(page, size)).getContent();
  }
}
