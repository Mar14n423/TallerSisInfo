package ucb.com.backendSinFront.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import java.util.List;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;
import java.util.Arrays;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import ucb.com.backendSinFront.util.JwtTokenUtil;
import ucb.com.backendSinFront.service.UsuarioService;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, UsuarioService usuarioService) {
    return new JwtAuthenticationFilter(jwtTokenUtil, usuarioService);
  }
@Bean
public SecurityFilterChain securityFilterChain(
  HttpSecurity http,
  JwtTokenUtil jwtTokenUtil,
  UsuarioService usuarioService
) throws Exception {
  http
    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth
      .requestMatchers(
        "/api/usuarios/login",
        "/api/usuarios/create",
        "/api/foro/**",
        "/api/foro/reporte",
        "/api/empresas",
        "/api/empresas/{id}",
        "/api/empresas/create",
        "/api/empresas/login",
        "/api/empresa/empleos/crear",
        "/api/empresa/empleos/crear-con-imagen",
        "/swagger-ui/**",
        "/v3/api-docs/**"
      ).permitAll()
      .anyRequest().authenticated()
    )
    .addFilterBefore(jwtAuthenticationFilter(jwtTokenUtil, usuarioService), UsernamePasswordAuthenticationFilter.class)
    .logout(logout -> logout
      .logoutUrl("/api/logout")
      .logoutSuccessHandler((request, response, authentication) -> {
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().flush();
      })
      .invalidateHttpSession(true)
      .deleteCookies("JSESSIONID")
      .permitAll()
    )
    .formLogin(form -> form.disable())
    .httpBasic(basic -> basic.disable());

  return http.build();
}



  @Bean // Configuración CORS global
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
