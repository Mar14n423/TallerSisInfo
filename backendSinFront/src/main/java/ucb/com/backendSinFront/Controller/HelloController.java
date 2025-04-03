package ucb.com.backendSinFront.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/saludo")
    public String obtenerSaludo() {
        return "¡Hola desde Spring Boot!";
    }
}
