package ucb.com.backendSinFront.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ucb.com.backendSinFront.entity.Usuario;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private Long expiration;


  private SecretKey getSigningKey() {
    // Asegura que la clave tenga al menos 256 bits (32 caracteres)
    String base64Key = java.util.Base64.getEncoder().encodeToString(secret.getBytes());
    return Keys.hmacShaKeyFor(base64Key.getBytes());
  }

  public String generateToken(Usuario usuario) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("tipo", usuario.getTipo());
    claims.put("id", usuario.getId());
    return createToken(claims, usuario.getCorreo());
  }

  private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
      .setClaims(claims)
      .setSubject(subject)
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
      .signWith(getSigningKey())
      .compact();
  }
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
      .parserBuilder()
      .setSigningKey(getSigningKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }

}
