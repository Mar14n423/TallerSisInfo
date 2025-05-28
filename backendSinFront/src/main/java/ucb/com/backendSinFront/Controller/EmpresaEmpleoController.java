package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ucb.com.backendSinFront.service.EmpresaEmpleoService;
import ucb.com.backendSinFront.entity.EmpresaEmpleo;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/empresa/empleos")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaEmpleoController {

  private final EmpresaEmpleoService empresaEmpleoService;

  @Autowired
  public EmpresaEmpleoController(EmpresaEmpleoService empresaEmpleoService) {
    this.empresaEmpleoService = empresaEmpleoService;
  }

  @PostMapping("/crear")
  public ResponseEntity<String> crearEmpleoConImagen(
    @RequestParam("idEmpresa") Long idEmpresa,
    @RequestParam("tituloTrabajo") String tituloTrabajo,
    @RequestParam("descripcion") String descripcion,
    @RequestParam("requisitos") String requisitos,
    @RequestParam("ubicacion") String ubicacion,
    @RequestParam("tipoContrato") String tipoContrato,
    @RequestParam("imagen") MultipartFile imagen) {
    try {
      String carpetaDestino = "uploads/";
      File carpeta = new File(carpetaDestino);
      if (!carpeta.exists()) carpeta.mkdirs();

      String nombreArchivo = imagen.getOriginalFilename();
      Path ruta = Paths.get(carpetaDestino, nombreArchivo);
      Files.write(ruta, imagen.getBytes());

      String urlImagen = "http://localhost:4200/imagenes/" + nombreArchivo;

      EmpresaEmpleo nuevo = new EmpresaEmpleo();
      nuevo.setIdEmpresa(idEmpresa);
      nuevo.setTituloTrabajo(tituloTrabajo);
      nuevo.setDescripcion(descripcion);
      nuevo.setRequisitos(requisitos);
      nuevo.setUbicacion(ubicacion);
      nuevo.setTipoContrato(tipoContrato);
      nuevo.setImagen(urlImagen);
      nuevo.setEstado("ACTIVO");
      nuevo.setFechaPublicacion(LocalDate.now());

      empresaEmpleoService.crearEmpleo(nuevo);

      return ResponseEntity.ok("Empleo creado correctamente");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al guardar la imagen");
    }
  }

  @GetMapping
  public ResponseEntity<?> obtenerTodosLosEmpleos() {
    return ResponseEntity.ok(empresaEmpleoService.obtenerTodosLosEmpleos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> obtenerEmpleoPorId(@PathVariable Long id) {
    return empresaEmpleoService.obtenerEmpleoPorId(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> actualizarEmpleo(@PathVariable Long id, @RequestBody EmpresaEmpleo empleo) {
    return ResponseEntity.ok(empresaEmpleoService.actualizarEmpleo(id, empleo));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> eliminarEmpleo(@PathVariable Long id) {
    empresaEmpleoService.eliminarEmpleo(id);
    return ResponseEntity.ok().build();
  }
}
