package ucb.com.backendSinFront.controller;

import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Reporte;
import ucb.com.backendSinFront.service.ReporteService;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

  private final ReporteService service;

  public ReporteController(ReporteService service) {
    this.service = service;
  }

  @GetMapping
  public List<Reporte> getAll() {
    return service.getAll();
  }

  @PostMapping
  public Reporte save(@RequestBody Reporte reporte) {
    return service.save(reporte);
  }


  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}
