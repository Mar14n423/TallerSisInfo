package ucb.com.backendSinFront.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ucb.com.backendSinFront.util.JwtTokenUtil;
import ucb.com.backendSinFront.entity.Usuario;
import ucb.com.backendSinFront.service.UsuarioService;

import java.io.IOException;
import java.util.Optional;
import java.util.List;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtTokenUtil jwtTokenUtil;
  private final UsuarioService usuarioService;

  public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, UsuarioService usuarioService) {
    this.jwtTokenUtil = jwtTokenUtil;
    this.usuarioService = usuarioService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain)
    throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);

      try {
        String correo = jwtTokenUtil.extractUsername(token);
        Optional<Usuario> usuarioOpt = usuarioService.obtenerPorCorreo(correo);

        if (usuarioOpt.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
          Usuario usuario = usuarioOpt.get();
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            usuario, null, List.of() // puedes añadir roles si los defines
          );
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      } catch (Exception e) {
        System.out.println("Token inválido o expirado: " + e.getMessage());
      }
    }

    filterChain.doFilter(request, response);
  }
}
