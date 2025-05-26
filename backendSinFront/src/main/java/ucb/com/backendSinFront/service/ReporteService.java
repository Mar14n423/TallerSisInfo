package ucb.com.backendSinFront.service;

import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Reporte;
import ucb.com.backendSinFront.repository.ReporteRepository;

import java.util.List;

@Service
public class ReporteService {
  private final ReporteRepository repo;

  public ReporteService(ReporteRepository repo) {
    this.repo = repo;
  }

  public List<Reporte> getAll() {
    return repo.findAll();
  }

  public Reporte save(Reporte reporte) {
    return repo.save(reporte);
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }
}
