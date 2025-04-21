# SinFronteras Backend

## Descripción
SinFronterasBackend es una aplicación desarrollada con Java (Spring Boot) para el backend y Angular para el frontend. Utiliza Maven para la gestión de dependencias y MySQL como base de datos.

## Tecnologías Utilizadas

### Backend:
- Java (Spring Boot)
- Maven (Gestor de dependencias)
- Spring Data JPA (Manejo de base de datos)
- Spring Security (Opcional, para autenticación y autorización)
- Lombok (Reducción de código boilerplate)

### Frontend:
- Angular
- Angular Material / Bootstrap (Opcional, para estilos y componentes UI)
- RxJS (Manejo de peticiones asíncronas)

### Base de Datos:
- MySQL

## Instalación y Configuración

### Prerrequisitos
Asegúrate de tener instalados los siguientes programas:
- Java 17+
- Maven
- Node.js & npm
- MySQL Server

### Configuración del Backend

1. Clona el repositorio:
   ```sh
   git clone https://github.com/usuario/proyecto.git
   cd proyecto/backend
   ```

2. Configura la base de datos en `application.properties` o `application.yml`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/nombre_bd
   spring.datasource.username=usuario
   spring.datasource.password=contraseña
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Ejecuta la aplicación:
   ```sh
   mvn spring-boot:run
   ```

### Configuración del Frontend

1. Accede a la carpeta del frontend:
   ```sh
   cd frontend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:
   ```sh
   ng serve
   ```

4. Accede a la aplicación en el navegador:
   ```
   http://localhost:4200
   ```

## Endpoints API

| Método | Ruta                  | Descripción          |
|--------|-----------------------|----------------------|
| GET    | `/api/entidades`      | Obtener todas       |
| GET    | `/api/entidades/{id}` | Obtener por ID      |
| POST   | `/api/entidades`      | Crear nueva        |
| PUT    | `/api/entidades/{id}` | Actualizar por ID   |
| DELETE | `/api/entidades/{id}` | Eliminar por ID     |

## Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama con tu funcionalidad:
   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza cambios y haz commit:
   ```sh
   git commit -m "Agregada nueva funcionalidad"
   ```
4. Sube los cambios a tu fork:
   ```sh
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un Pull Request en GitHub.


