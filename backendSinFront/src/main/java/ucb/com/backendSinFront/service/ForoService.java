package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Publicacion;
import ucb.com.backendSinFront.entity.Respuesta;
import ucb.com.backendSinFront.repository.PublicacionRepository;
import ucb.com.backendSinFront.repository.RespuestaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ForoService {

  @Autowired
  private PublicacionRepository publicacionRepository;

  @Autowired
  private RespuestaRepository respuestaRepository;

  public Publicacion crearPublicacion(Publicacion publicacion) {
    return publicacionRepository.save(publicacion);
  }

  public List<Publicacion> obtenerTodasLasPublicaciones() {
    return publicacionRepository.findAll();
  }

  public Optional<Publicacion> obtenerPublicacionPorId(Long id) {
    return publicacionRepository.findById(id);
  }

  public Respuesta agregarRespuesta(Long publicacionId, Respuesta respuesta) {
    Optional<Publicacion> publicacionOpt = publicacionRepository.findById(publicacionId);
    if (publicacionOpt.isPresent()) {
      Publicacion publicacion = publicacionOpt.get();
      publicacion.agregarRespuesta(respuesta);
      respuestaRepository.save(respuesta);
      return respuesta;
    }
    return null;
  }
}
