package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// ✅ IMPORTS CORREGIDOS
import ucb.com.backendSinFront.entity.foro.Publicacion;
import ucb.com.backendSinFront.entity.foro.Respuesta;
import ucb.com.backendSinFront.entity.foro.ReporteF;
import ucb.com.backendSinFront.entity.foro.ReglaForo;

import ucb.com.backendSinFront.repository.foro.PublicacionRepository;
import ucb.com.backendSinFront.repository.foro.RespuestaRepository;
import ucb.com.backendSinFront.repository.foro.ReporteFRepository;
import ucb.com.backendSinFront.repository.foro.ReglaForoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ForoService {
  private final PublicacionRepository publicacionRepository;
  private final RespuestaRepository respuestaRepository;
  private final ReporteFRepository reporteFRepository;
  private final ReglaForoRepository reglaForoRepository;

  @Autowired
  public ForoService(PublicacionRepository publicacionRepository,
                     RespuestaRepository respuestaRepository,
                     ReporteFRepository reporteFRepository,
                     ReglaForoRepository reglaForoRepository) {
    this.publicacionRepository = publicacionRepository;
    this.respuestaRepository = respuestaRepository;
    this.reporteFRepository = reporteFRepository;
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
      respuesta.setPublicacion(publicacion);
      publicacion.agregarRespuesta(respuesta);
      respuestaRepository.save(respuesta);
      return respuesta;
    }
    return null;
  }

  public ReporteF crearReporte(ReporteF reporte) {

    if (reporte.getTipo() == ReporteF.TipoContenido.POST) {
      Publicacion publicacion = publicacionRepository.findById(reporte.getContenidoId())
        .orElseThrow(() -> new RuntimeException("Publicación no encontrada con ID: " + reporte.getContenidoId()));
      reporte.setPublicacion(publicacion);
      reporte.setRespuesta(null);
      reporte.setPostPadreId(null);
    } else if (reporte.getTipo() == ReporteF.TipoContenido.COMENTARIO) {
      Respuesta respuesta = respuestaRepository.findById(reporte.getContenidoId())
        .orElseThrow(() -> new RuntimeException("Respuesta no encontrada con ID: " + reporte.getContenidoId()));
      reporte.setRespuesta(respuesta);
      reporte.setPublicacion(null);
      if (respuesta.getPublicacion() != null) {
        reporte.setPostPadreId(respuesta.getPublicacion().getId());
      } else {
        reporte.setPostPadreId(null);
      }
    } else {
      throw new IllegalArgumentException("Tipo de contenido de reporte no válido: " + reporte.getTipo());
    }

    return reporteFRepository.save(reporte);
  }

  public List<ReglaForo> obtenerReglasForo() {
    return reglaForoRepository.findAllByOrderByOrdenAsc();
  }

  public List<ReporteF> obtenerTodosLosReportes() {
    return reporteFRepository.findAll();
  }

  /*public void cargarReglasEjemplo() {
    ReglaForo r1 = new ReglaForo("Sé respetuoso", "No se permiten insultos ni ataques personales", 1);
    ReglaForo r2 = new ReglaForo("No spam", "Evita contenido promocional o repetitivo", 2);
    ReglaForo r3 = new ReglaForo("Contenido relevante", "Publica temas relacionados al foro", 3);
    ReglaForo r4 = new ReglaForo("Privacidad", "No compartas información personal", 4);

    reglaForoRepository.saveAll(List.of(r1, r2, r3, r4));
  }*/


}
