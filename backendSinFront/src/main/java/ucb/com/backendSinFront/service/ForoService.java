package ucb.com.backendSinFront.service;

import ucb.com.backendSinFront.dto.PublicacionDTO;
import ucb.com.backendSinFront.dto.RespuestaDTO;
import ucb.com.backendSinFront.dto.ComentarioReportadoDTO;
import ucb.com.backendSinFront.dto.ReporteDetalleDTO;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.entity.foro.Publicacion;
import ucb.com.backendSinFront.entity.foro.ReporteF;
import ucb.com.backendSinFront.entity.foro.Respuesta;
import ucb.com.backendSinFront.entity.foro.ReglaForo;
import ucb.com.backendSinFront.repository.UsuarioRepository;
import ucb.com.backendSinFront.repository.foro.PublicacionRepository;
import ucb.com.backendSinFront.repository.foro.ReporteFRepository;
import ucb.com.backendSinFront.repository.foro.RespuestaRepository;
import ucb.com.backendSinFront.repository.foro.ReglaForoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ForoService {

  private final PublicacionRepository publicacionRepository;
  private final RespuestaRepository respuestaRepository;
  private final ReporteFRepository reporteFRepository;
  private final ReglaForoRepository reglaForoRepository;
  private final UsuarioRepository usuarioRepository;

  @Autowired
  public ForoService(PublicacionRepository publicacionRepository,
                     RespuestaRepository respuestaRepository,
                     ReporteFRepository reporteFRepository,
                     ReglaForoRepository reglaForoRepository,
                     UsuarioRepository usuarioRepository) {
    this.publicacionRepository = publicacionRepository;
    this.respuestaRepository = respuestaRepository;
    this.reporteFRepository = reporteFRepository;
    this.reglaForoRepository = reglaForoRepository;
    this.usuarioRepository = usuarioRepository;
  }

  public List<PublicacionDTO> obtenerTodasLasPublicacionesDTO() {
    List<Publicacion> publicaciones = publicacionRepository.findAll();

    return publicaciones.stream().map(pub -> {
      String avatarUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
      List<Usuario> usuariosPub = usuarioRepository.findByNombre(pub.getUsuario());
      if (!usuariosPub.isEmpty() && usuariosPub.get(0).getProfileImage() != null && !usuariosPub.get(0).getProfileImage().isEmpty()) {
        avatarUrl = usuariosPub.get(0).getProfileImage();
      }

      List<RespuestaDTO> respuestaDTOs = pub.getRespuestas().stream().map(resp -> {
        String avatarRespUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
        List<Usuario> usuariosResp = usuarioRepository.findByNombre(resp.getUsuario());
        if (!usuariosResp.isEmpty() && usuariosResp.get(0).getProfileImage() != null && !usuariosResp.get(0).getProfileImage().isEmpty()) {
          avatarRespUrl = usuariosResp.get(0).getProfileImage();
        }

        return new RespuestaDTO(
          resp.getId(),
          resp.getUsuario(),
          resp.getMensaje(),
          avatarRespUrl
        );
      }).collect(Collectors.toList());

      PublicacionDTO dto = new PublicacionDTO(
        pub.getId(),
        pub.getUsuario(),
        pub.getFecha().toString(),
        pub.getTitulo(),
        pub.getMensaje(),
        avatarUrl
      );
      dto.setRespuestas(respuestaDTOs);

      return dto;
    }).collect(Collectors.toList());
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

  public List<Publicacion> obtenerPublicacionesDestacadas() {
    Pageable topThree = PageRequest.of(0, 3, Sort.by("fecha").descending());
    return publicacionRepository.findTopPublicacionesWithRespuestasOrderedByDate(topThree);
  }

  public void guardarReglas(List<ReglaForo> reglas) {
    reglaForoRepository.deleteAll();
    reglaForoRepository.saveAll(reglas);
  }

  public List<ReporteF> obtenerComentariosReportados() {
    return reporteFRepository.findByTipoOrderByFechaDesc(ReporteF.TipoContenido.COMENTARIO);
  }

  public List<ReporteF> obtenerPostsReportados() {
    return reporteFRepository.findByTipoOrderByFechaDesc(ReporteF.TipoContenido.POST);
  }

  public List<ComentarioReportadoDTO> obtenerComentariosReportadosDetallado() {
    List<ReporteF> reportes = reporteFRepository.findByTipoOrderByFechaDesc(ReporteF.TipoContenido.COMENTARIO);
    Map<Long, List<ReporteF>> agrupado = reportes.stream().collect(Collectors.groupingBy(ReporteF::getContenidoId));

    List<ComentarioReportadoDTO> resultado = new ArrayList<>();
    for (Map.Entry<Long, List<ReporteF>> entry : agrupado.entrySet()) {
      Long comentarioId = entry.getKey();
      List<ReporteF> reportesDeEsteComentario = entry.getValue();

      Optional<Respuesta> respuestaOpt = respuestaRepository.findById(comentarioId);
      if (!respuestaOpt.isPresent()) continue;
      Respuesta respuesta = respuestaOpt.get();

      ComentarioReportadoDTO dto = new ComentarioReportadoDTO();
      dto.setComentarioId(comentarioId);
      dto.setContenido(respuesta.getMensaje());
      dto.setUsuario(respuesta.getUsuario());
      dto.setFecha(respuesta.getFecha().atStartOfDay());

      List<ReporteDetalleDTO> detalles = reportesDeEsteComentario.stream().map(rep -> {
        ReporteDetalleDTO det = new ReporteDetalleDTO();
        det.setUsuarioReportador(rep.getUsuarioReportador());
        det.setRazon(rep.getRazon());
        det.setOtraRazon(rep.getOtraRazon());
        det.setFecha(rep.getFecha());
        return det;
      }).collect(Collectors.toList());

      dto.setReportes(detalles);
      resultado.add(dto);
    }
    return resultado;
  }
}
