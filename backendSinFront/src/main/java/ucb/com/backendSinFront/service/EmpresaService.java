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

    public List<Empresa> obtenerTodas() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> obtenerPorId(Long id) {
        return empresaRepository.findById(id);
    }

    public Optional<Empresa> obtenerPorCorreo(String correo) {
        return empresaRepository.findByCorreo(correo);
    }

    public Empresa guardar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public void eliminar(Long id) {
        empresaRepository.deleteById(id);
    }

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