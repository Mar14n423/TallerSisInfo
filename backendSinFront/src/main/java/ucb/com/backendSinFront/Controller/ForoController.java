package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.foro.Publicacion;
import ucb.com.backendSinFront.entity.foro.Respuesta;
import ucb.com.backendSinFront.entity.foro.ReporteF;
import ucb.com.backendSinFront.entity.foro.ReglaForo;
import ucb.com.backendSinFront.dto.PublicacionDTO;
import ucb.com.backendSinFront.dto.ComentarioReportadoDTO;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;

import ucb.com.backendSinFront.service.ForoService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")


@RestController
@RequestMapping("/api/foro")
public class ForoController {

  @Autowired
  private ForoService foroService;

  @PostMapping("/publicacion")
  public ResponseEntity<Publicacion> crearPublicacion(@RequestBody Publicacion publicacion) {
    Publicacion nuevaPublicacion = foroService.crearPublicacion(publicacion);
    return ResponseEntity.ok(nuevaPublicacion);
  }

  @GetMapping("/publicaciones")
  public ResponseEntity<List<PublicacionDTO>> obtenerTodasLasPublicaciones() {
    List<PublicacionDTO> publicaciones = foroService.obtenerTodasLasPublicacionesDTO();
    return ResponseEntity.ok(publicaciones);
  }


  @GetMapping("/publicacion/{id}")
  public ResponseEntity<Publicacion> obtenerPublicacionPorId(@PathVariable Long id) {
    Optional<Publicacion> publicacion = foroService.obtenerPublicacionPorId(id);
    return publicacion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping("/publicacion/{id}/respuesta")
  public ResponseEntity<Respuesta> agregarRespuesta(@PathVariable Long id, @RequestBody Respuesta respuesta) {
    Respuesta nuevaRespuesta = foroService.agregarRespuesta(id, respuesta);
    return nuevaRespuesta != null ? ResponseEntity.ok(nuevaRespuesta) : ResponseEntity.notFound().build();
  }
  @PostMapping("/reporte")
  public ResponseEntity<ReporteF> crearReporte(@RequestBody ReporteF reporte) {
      ReporteF nuevoReporte = foroService.crearReporte(reporte);
      return ResponseEntity.ok(nuevoReporte);
  }

  @GetMapping("/reglas")
  public ResponseEntity<List<ReglaForo>> obtenerReglasForo() {
      List<ReglaForo> reglas = foroService.obtenerReglasForo();
      return ResponseEntity.ok(reglas);
  }

  @GetMapping("/reportes")
  public ResponseEntity<List<ReporteF>> obtenerTodosLosReportes() {
    return ResponseEntity.ok(foroService.obtenerTodosLosReportes());
  }

  @GetMapping("/testimonios")
  public ResponseEntity<List<Publicacion>> obtenerTestimonios() {
    List<Publicacion> testimonios = foroService.obtenerPublicacionesDestacadas();
    return ResponseEntity.ok(testimonios);
  }

  /*@PostMapping("/reglas/cargar")
  public ResponseEntity<String> cargarReglasDePrueba() {
    foroService.cargarReglasEjemplo();
    return ResponseEntity.ok("Reglas cargadas exitosamente");
  }*/

  @PostMapping("/reglas")
  public ResponseEntity<String> guardarReglas(@RequestBody List<ReglaForo> reglas) {
    foroService.guardarReglas(reglas);
    return ResponseEntity.ok("Reglas guardadas correctamente");
  }

  @GetMapping("/reportes/comentarios")
  public ResponseEntity<List<ComentarioReportadoDTO>> obtenerComentariosReportados() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (auth == null || auth.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
      throw new AccessDeniedException("Solo los administradores pueden ver comentarios reportados");
    }

    return ResponseEntity.ok(foroService.obtenerComentariosReportadosDetallado());
  }

  @GetMapping("/reportes/posts")
  public ResponseEntity<List<ReporteF>> obtenerPostsReportados() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    // 👇 DEBUG: Imprimir usuario y rol en consola
    System.out.println("=== DEBUG DE ACCESO ===");
    System.out.println("Usuario autenticado: " + (auth != null ? auth.getName() : "null"));
    System.out.println("Authorities: " + (auth != null ? auth.getAuthorities() : "null"));
    System.out.println("========================");

    if (auth == null || auth.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
      throw new AccessDeniedException("Solo los administradores pueden ver posts reportados");
    }

    return ResponseEntity.ok(foroService.obtenerPostsReportados());
  }



}
