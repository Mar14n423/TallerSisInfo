package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "evento")
public class Evento {

  @Id
  private String id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, length = 50)
  private String icon;

  @Column(nullable = false)
  private LocalDateTime date;

  @Column(length = 20)
  private String background;

  @Column(length = 20)
  private String color;

  public Evento() {
    this.id = UUID.randomUUID().toString();
    this.date = LocalDateTime.now(); // valor por defecto para evitar error
  }

  public Evento(String name, String icon, LocalDateTime date, String background, String color) {
    this();
    this.name = name;
    this.icon = icon;
    this.date = date != null ? date : LocalDateTime.now();
    this.background = background;
    this.color = color;
  }

  // Getters y setters

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getIcon() { return icon; }
  public void setIcon(String icon) { this.icon = icon; }

  public LocalDateTime getDate() { return date; }
  public void setDate(LocalDateTime date) { this.date = date; }

  public String getBackground() { return background; }
  public void setBackground(String background) { this.background = background; }

  public String getColor() { return color; }
  public void setColor(String color) { this.color = color; }
}
