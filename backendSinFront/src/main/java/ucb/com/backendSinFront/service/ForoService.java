package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.*;
import ucb.com.backendSinFront.repository.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForoService {
    private final PublicacionRepository publicacionRepository;
    private final RespuestaRepository respuestaRepository;
    private final ReporteRepository reporteRepository;
    private final ReglaForoRepository reglaForoRepository;
    
    @Autowired
    public ForoService(PublicacionRepository publicacionRepository,
                      RespuestaRepository respuestaRepository,
                      ReporteRepository reporteRepository,
                      ReglaForoRepository reglaForoRepository) {
        this.publicacionRepository = publicacionRepository;
        this.respuestaRepository = respuestaRepository;
        this.reporteRepository = reporteRepository;
        this.reglaForoRepository = reglaForoRepository;
    }

  
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
  public Reporte crearReporte(ReporteF reporte) {
        reporte.setFecha(LocalDateTime.now());
        reporte.setRevisado(false);
        
        if (reporte.getTipo() == Reporte.TipoContenido.POST) {
            Publicacion publicacion = publicacionRepository.findById(reporte.getContenidoId())
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
            reporte.setPublicacion(publicacion);
        } else {
            Respuesta respuesta = respuestaRepository.findById(reporte.getContenidoId())
                .orElseThrow(() -> new RuntimeException("Respuesta no encontrada"));
            reporte.setRespuesta(respuesta);
        }
        
        return reporteRepository.save(reporte);
    }
    public List<ReglaForo> obtenerReglasForo() {
        return reglaForoRepository.findAllByOrderByOrdenAsc();
    }
}
