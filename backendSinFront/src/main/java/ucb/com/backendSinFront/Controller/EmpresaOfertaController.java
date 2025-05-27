package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ucb.com.backendSinFront.service.EmpresaOfertaService;
import ucb.com.backendSinFront.entity.EmpresaOferta;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/empresa/ofertas")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaOfertaController {

  private final EmpresaOfertaService empresaOfertaService;

  @Autowired
  public EmpresaOfertaController(EmpresaOfertaService empresaOfertaService) {
    this.empresaOfertaService = empresaOfertaService;
  }

  @PostMapping("/crear")
  public ResponseEntity<String> crearOfertaConImagen(
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
      Path ruta = Paths.get(carpetaDestino, nombreArchivo); // <-- Ruta local correcta
      Files.write(ruta, imagen.getBytes());

      String urlImagen = "http://localhost:4200/imagenes/" + nombreArchivo;

      EmpresaOferta nueva = new EmpresaOferta();
      nueva.setIdEmpresa(idEmpresa);
      nueva.setTituloTrabajo(tituloTrabajo);
      nueva.setDescripcion(descripcion);
      nueva.setRequisitos(requisitos);
      nueva.setUbicacion(ubicacion);
      nueva.setTipoContrato(tipoContrato);
      nueva.setImagen(urlImagen);  // Guardamos la URL pública
      nueva.setEstado("ACTIVO");
      nueva.setFechaPublicacion(LocalDate.now());


      empresaOfertaService.crearOferta(nueva);

      return ResponseEntity.ok("Oferta creada correctamente");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al guardar la imagen");
    }
  }

  @GetMapping
  public ResponseEntity<?> obtenerTodasLasOfertas() {
    return ResponseEntity.ok(empresaOfertaService.obtenerTodasLasOfertas());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> obtenerOfertaPorId(@PathVariable Long id) {
    return empresaOfertaService.obtenerOfertaPorId(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> actualizarOferta(@PathVariable Long id, @RequestBody EmpresaOferta oferta) {
    return ResponseEntity.ok(empresaOfertaService.actualizarOferta(id, oferta));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> eliminarOferta(@PathVariable Long id) {
    empresaOfertaService.eliminarOferta(id);
    return ResponseEntity.ok().build();
  }
}
