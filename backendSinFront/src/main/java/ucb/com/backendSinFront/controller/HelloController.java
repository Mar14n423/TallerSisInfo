package ucb.com.backendSinFront.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/saludo")
    public String obtenerSaludo() {
        return "¡Hola desde Spring Boot!";
    }
}
