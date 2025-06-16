package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.service.OfertaEmpleoService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "http://localhost:4200")
public class OfertaEmpleoController {

  @Autowired
  private OfertaEmpleoService service;

  // Crear oferta con imagen (desde empresa o desde panel que permite imagen)
  @PostMapping("/crear-con-imagen")
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

      OfertaEmpleo nuevo = new OfertaEmpleo();
      nuevo.setIdEmpresa(idEmpresa);
      nuevo.setTituloTrabajo(tituloTrabajo);
      nuevo.setDescripcion(descripcion);
      nuevo.setRequisitos(requisitos);
      nuevo.setUbicacion(ubicacion);
      nuevo.setTipoContrato(tipoContrato);
      nuevo.setImagenNombre(urlImagen);
      nuevo.setEstado("ACTIVO");
      nuevo.setFechaPublicacion(LocalDate.now());

      service.crearOferta(nuevo);

      return ResponseEntity.ok("Empleo creado correctamente");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al guardar la imagen");
    }
  }

  // Crear oferta sin imagen
  @PostMapping("/crear")
  public OfertaEmpleo crear(@RequestBody OfertaEmpleo oferta) {
    oferta.setFechaPublicacion(LocalDate.now());
    oferta.setEstado("ACTIVO");
    return service.crearOferta(oferta);
  }

  // Subir imagen a una oferta existente (edición posterior)
  @PostMapping("/subir-imagen/{id}")
  public String subirImagen(@PathVariable Long id, @RequestParam("imagen") MultipartFile imagen) {
    try {
      Optional<OfertaEmpleo> optionalOferta = service.obtenerPorId(id);
      if (!optionalOferta.isPresent()) {
        return "Oferta no encontrada";
      }

      String folder = "uploads/";
      byte[] bytes = imagen.getBytes();
      Path path = Paths.get(folder + imagen.getOriginalFilename());
      Files.write(path, bytes);

      OfertaEmpleo oferta = optionalOferta.get();
      oferta.setImagenNombre("http://localhost:4200/imagenes/" + imagen.getOriginalFilename());
      service.crearOferta(oferta); // usar crear para guardar los cambios

      return "Imagen subida correctamente";
    } catch (Exception e) {
      return "Error al subir la imagen: " + e.getMessage();
    }
  }

  // Obtener la imagen (se puede consumir desde Angular directamente)
  @GetMapping("/imagen/{nombre}")
  public ResponseEntity<byte[]> obtenerImagen(@PathVariable String nombre) {
    try {
      Path path = Paths.get("uploads/" + nombre);
      byte[] data = Files.readAllBytes(path);
      return ResponseEntity.ok()
        .header("Content-Type", "image/jpeg")
        .body(data);
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  // Listar todas
  @GetMapping
  public List<OfertaEmpleo> listar() {
    return service.listar();
  }

  // Obtener por ID
  @GetMapping("/{id}")
  public Optional<OfertaEmpleo> obtener(@PathVariable Long id) {
    return service.obtenerPorId(id);
  }

  // Eliminar
  @DeleteMapping("/{id}")
  public void eliminar(@PathVariable Long id) {
    service.eliminar(id);
  }

  // Actualizar sin imagen (solo datos)
  @PutMapping("/{id}")
  public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody OfertaEmpleo oferta) {
    return ResponseEntity.ok(service.actualizarOferta(id, oferta));
  }

  // Filtros
  @GetMapping("/filtrar/ubicacion/{ubicacion}")
  public List<OfertaEmpleo> filtrarUbicacion(@PathVariable String ubicacion) {
    return service.filtrarPorUbicacion(ubicacion);
  }

  @GetMapping("/filtrar/contrato/{tipo}")
  public List<OfertaEmpleo> filtrarContrato(@PathVariable String tipo) {
    return service.filtrarPorContrato(tipo);
  }

  @GetMapping("/filtrar/estado/{estado}")
  public List<OfertaEmpleo> filtrarEstado(@PathVariable String estado) {
    return service.filtrarPorEstado(estado);
  }
}
