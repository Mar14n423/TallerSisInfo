package ucb.com.backendSinFront.config;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

    String path = request.getRequestURI();

    // ✅ Lista exacta de rutas públicas
    if (
      path.equals("/api/usuarios/login") ||
        path.equals("/api/usuarios/create") ||
        path.equals("/api/foro/publicaciones") ||
        path.equals("/api/foro/testimonios") ||
        path.equals("/api/foro/reglas") ||
        path.startsWith("/swagger-ui/") ||
        path.startsWith("/v3/api-docs/")
    ) {
      filterChain.doFilter(request, response);
      return;
    }

    // 🟡 Verificación del token JWT para rutas protegidas
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);

      try {
        String correo = jwtTokenUtil.extractUsername(token);
        Optional<Usuario> usuarioOpt = usuarioService.obtenerPorCorreo(correo);

        if (usuarioOpt.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
          Usuario usuario = usuarioOpt.get();

          // ✅ Cargamos el rol como una autoridad de Spring Security
          String rol = usuario.getTipo().equals("A") ? "ROLE_ADMIN" : "ROLE_USER";

          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            usuario,
            null,
            List.of(new SimpleGrantedAuthority(rol)) // <- aquí se cargan los roles
          );

          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      } catch (Exception e) {
        System.out.println("Token inválido o expirado: " + e.getMessage());
        System.out.println("Authorization header: " + authHeader);
      }
    }

    filterChain.doFilter(request, response);
  }
}
