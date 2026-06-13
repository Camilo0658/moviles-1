# TechStore API - Spring Boot Backend

## Requisitos Previos

- Java 17
- Maven 3.6+
- MongoDB instalado y corriendo localmente

## Configuración de MongoDB

### 1. Instalar MongoDB (si no lo tienes)

**Windows:**
- Descarga el instalador desde: https://www.mongodb.com/try/download/community
- Ejecuta el instalador y sigue las instrucciones

**macOS (con Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
```

### 2. Iniciar el servicio de MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Verificar que MongoDB está corriendo

```bash
mongosh
```

Deberías ver el shell de MongoDB. Escribe `exit` para salir.

## Configuración del Proyecto

### 1. Navegar a la carpeta del backend

```bash
cd spring-boot-backend
```

### 2. Configurar la conexión a MongoDB (opcional)

El archivo `src/main/resources/application.properties` ya está configurado para conectarse a MongoDB local:

```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=techstore
```

Si tu MongoDB usa credenciales, modifica el archivo:

```properties
spring.data.mongodb.uri=mongodb://usuario:password@localhost:27017/techstore
```

### 3. Compilar el proyecto

```bash
./mvnw clean install
```

En Windows:
```bash
mvnw.cmd clean install
```

### 4. Ejecutar la aplicación

```bash
./mvnw spring-boot:run
```

En Windows:
```bash
mvnw.cmd spring-boot:run
```

La API estará disponible en: `http://localhost:8080`

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/{id}` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/{id}` | Actualizar un producto |
| DELETE | `/api/products/{id}` | Eliminar un producto |

## Ejemplo de Producto (JSON)

```json
{
  "name": "iPhone 15 Pro",
  "description": "El último smartphone de Apple con chip A17 Pro",
  "price": 999.99,
  "imageUrl": "https://ejemplo.com/iphone15.jpg"
}
```

## Probar la API con cURL

**Crear un producto:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"MacBook Pro","description":"Laptop profesional","price":1999.99,"imageUrl":"https://ejemplo.com/macbook.jpg"}'
```

**Obtener todos los productos:**
```bash
curl http://localhost:8080/api/products
```

**Actualizar un producto:**
```bash
curl -X PUT http://localhost:8080/api/products/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"MacBook Pro M3","description":"Laptop con chip M3","price":2499.99,"imageUrl":"https://ejemplo.com/macbook-m3.jpg"}'
```

**Eliminar un producto:**
```bash
curl -X DELETE http://localhost:8080/api/products/{id}
```

## Estructura del Proyecto

```
spring-boot-backend/
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/techstore/
│       │   ├── TechstoreApiApplication.java  # Clase principal
│       │   ├── config/
│       │   │   └── WebConfig.java            # Configuración CORS
│       │   ├── controller/
│       │   │   └── ProductController.java    # Controlador REST
│       │   ├── model/
│       │   │   └── Product.java              # Entidad Product
│       │   ├── repository/
│       │   │   └── ProductRepository.java    # Repositorio MongoDB
│       │   └── service/
│       │       └── ProductService.java       # Lógica de negocio
│       └── resources/
│           └── application.properties        # Configuración
```

## Solución de Problemas

### Error: "Connection refused" a MongoDB
- Verifica que el servicio de MongoDB esté corriendo
- Comprueba que el puerto 27017 no esté bloqueado

### Error: "Port 8080 already in use"
- Cambia el puerto en `application.properties`:
  ```properties
  server.port=8081
  ```

### La base de datos no se crea
- MongoDB crea la base de datos automáticamente al insertar el primer documento
- No necesitas crear la base de datos manualmente
