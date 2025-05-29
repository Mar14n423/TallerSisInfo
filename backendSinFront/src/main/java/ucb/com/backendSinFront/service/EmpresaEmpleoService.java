package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.EmpresaEmpleo;
import ucb.com.backendSinFront.repository.EmpresaEmpleoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaEmpleoService {

  private final EmpresaEmpleoRepository empresaEmpleoRepository;

  @Autowired
  public EmpresaEmpleoService(EmpresaEmpleoRepository empresaEmpleoRepository) {
    this.empresaEmpleoRepository = empresaEmpleoRepository;
  }

  // Crear un nuevo empleo
  public EmpresaEmpleo crearEmpleo(EmpresaEmpleo empleo) {
    empleo.setEstado("ACTIVO");
    empleo.setFechaPublicacion(LocalDate.now());
    return empresaEmpleoRepository.save(empleo);
  }

  // Obtener todos los empleos
  public List<EmpresaEmpleo> obtenerTodosLosEmpleos() {
    return empresaEmpleoRepository.findAll();
  }

  // Obtener un empleo por ID
  public Optional<EmpresaEmpleo> obtenerEmpleoPorId(Long id) {
    return empresaEmpleoRepository.findById(id);
  }

  // Actualizar un empleo
  public EmpresaEmpleo actualizarEmpleo(Long id, EmpresaEmpleo nuevoEmpleo) {
    return empresaEmpleoRepository.findById(id).map(empleo -> {
      empleo.setIdEmpresa(nuevoEmpleo.getIdEmpresa());
      empleo.setTituloTrabajo(nuevoEmpleo.getTituloTrabajo());
      empleo.setDescripcion(nuevoEmpleo.getDescripcion());
      empleo.setRequisitos(nuevoEmpleo.getRequisitos());
      empleo.setUbicacion(nuevoEmpleo.getUbicacion());
      empleo.setTipoContrato(nuevoEmpleo.getTipoContrato());
      empleo.setEstado(nuevoEmpleo.getEstado());
      empleo.setFechaPublicacion(nuevoEmpleo.getFechaPublicacion());
      empleo.setImagen(nuevoEmpleo.getImagen());
      return empresaEmpleoRepository.save(empleo);
    }).orElseThrow(() -> new RuntimeException("Empleo no encontrado con ID: " + id));
  }

  // Eliminar un empleo
  public void eliminarEmpleo(Long id) {
    empresaEmpleoRepository.deleteById(id);
  }
}
