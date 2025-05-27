//package ucb.com.backendSinFront.Controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import ucb.com.backendSinFront.entity.HistorialPublicacion;
//import ucb.com.backendSinFront.service.HistorialPublicacionService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/historial")
//@CrossOrigin(origins = "http://localhost:4200")
//public class HistorialPublicacionController {
//
//  @Autowired
//  private HistorialPublicacionService historialService;
//
//  // Solo accesible por ADMIN
//  @GetMapping("/admin/todas")
//  public List<HistorialPublicacion> obtenerTodosLosHistoriales(
//    @RequestParam(defaultValue = "0") int page,
//    @RequestParam(defaultValue = "10") int size
//  ) {
//    return historialService.obtenerTodosLosHistoriales(page, size);
//  }
//}
