package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.entity.HistorialPublicacion;
import ucb.com.backendSinFront.service.EmpresaOfertaService;

import java.util.List;

@RestController
@RequestMapping("/api/empresa/ofertas")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaOfertaController {

  @Autowired
  private EmpresaOfertaService service;

  @GetMapping("/empresa/{idEmpresa}")
  public List<OfertaEmpleo> obtenerOfertasPorEmpresa(@PathVariable Long idEmpresa) {
    return service.obtenerOfertasPorEmpresa(idEmpresa);
  }

  @PostMapping("/crear")
  public OfertaEmpleo crearOferta(@RequestBody OfertaEmpleo oferta) {
    return service.crearOfertaEmpresa(oferta);
  }

  @PutMapping("/editar/{id}")
  public OfertaEmpleo editarOferta(@PathVariable Long id, @RequestBody OfertaEmpleo nueva) {
    return service.editarOfertaEmpresa(id, nueva);
  }

  @DeleteMapping("/eliminar/{id}")
  public void eliminarOferta(@PathVariable Long id) {
    service.eliminarOfertaEmpresa(id);
  }

  @GetMapping("/historial/{idEmpresa}")
  public List<HistorialPublicacion> obtenerHistorialEmpresa(@PathVariable Long idEmpresa,
                                                            @RequestParam(defaultValue = "0") int page,
                                                            @RequestParam(defaultValue = "10") int size) {
    return service.obtenerHistorialEmpresa(idEmpresa, page, size);
  }
}
