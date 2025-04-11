package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Empresa;
import ucb.com.backendSinFront.repository.EmpresaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

  @Autowired
  private EmpresaRepository empresaRepository;

  // Obtener todas las empresas
  public List<Empresa> obtenerTodas() {
    return empresaRepository.findAll();
  }

  // Obtener empresa por id
  public Optional<Empresa> obtenerPorId(Long id) {
    return empresaRepository.findById(id);
  }

  // Obtener empresa por correo
  public Optional<Empresa> obtenerPorCorreo(String correo) {
    return empresaRepository.findByCorreo(correo);
  }

  // Guardar empresa
  public Empresa guardar(Empresa empresa) {
    return empresaRepository.save(empresa);
  }

  // Eliminar empresa
  public void eliminar(Long id) {
    empresaRepository.deleteById(id);
  }

  // Actualizar empresa
  public Empresa actualizarEmpresa(Long id, Empresa empresaActualizada) {
    return empresaRepository.findById(id)
      .map(empresa -> {
        empresa.setNombre(empresaActualizada.getNombre());
        empresa.setCorreo(empresaActualizada.getCorreo());
        empresa.setPasswordHash(empresaActualizada.getPasswordHash());
        empresa.setTelefono(empresaActualizada.getTelefono());
        empresa.setDescripcion(empresaActualizada.getDescripcion());
        return empresaRepository.save(empresa);
      })
      .orElseThrow(() -> new RuntimeException("Empresa no encontrada con id: " + id));
  }
}
