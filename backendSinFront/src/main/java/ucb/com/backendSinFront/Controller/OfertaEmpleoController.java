package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.service.OfertaEmpleoService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "http://localhost:4200")
public class OfertaEmpleoController {

  @Autowired
  private OfertaEmpleoService service;

  @GetMapping
  public List<OfertaEmpleo> listar() {
    return service.listar();
  }

  @GetMapping("/{id}")
  public Optional<OfertaEmpleo> obtener(@PathVariable Long id) {
    return service.obtenerPorId(id);
  }

  //crear
  @PostMapping("/crear")
  public OfertaEmpleo crear(@RequestBody OfertaEmpleo oferta) {
    return service.crearOferta(oferta);
  }

  //eliminar
  @DeleteMapping("/{id}")
  public void eliminar(@PathVariable Long id) {
    service.eliminar(id);
  }

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
      oferta.setImagenNombre(imagen.getOriginalFilename());
      service.crearOferta(oferta);

      return "Imagen subida correctamente";
    } catch (Exception e) {
      return "Error al subir la imagen: " + e.getMessage();
    }
  }

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
}
