# 📦 Gestión de Inventario con Archivos JSON  

## Introducción 

Este proyecto simula un **Sistema de Gestión de Inventario (CRUD)** desarrollado en **Node.js** y **Express**. La característica distintiva es que la persistencia de los datos se realiza exclusivamente en un archivo **JSON** (`products.json`), sin utilizar una base de datos tradicional.

El objetivo es demostrar las operaciones básicas de **CRUD** (Crear, Leer, Actualizar y Eliminar) interactuando directamente con el sistema de archivos de Node.js (`fs`).

---

## 🛠️ Tecnologías Utilizadas 

* **Node.js**: Entorno de ejecución.
* **Express**: Framework para montar el servidor web y definir las rutas API.
* **Módulo `fs` (File System)**: Módulo nativo de Node.js para interactuar con el archivo de datos (`products.json`). 

---

## 📁 Estructura del Proyecto 

``` 
inventario-json-app/
├── node_modules/
├── package.json
├── server.js           # Servidor Express: Rutas y manejo de peticiones HTTP.
├── fileUtils.js        # Lógica de Persistencia: Funciones CRUD que leen/escriben en el archivo.
└── products.json       # Almacén de Datos: Archivo de texto plano con el inventario.
``` 

---

## 🚀 Instalación y Ejecución 

Sigue estos pasos para poner en marcha el servidor:

1.  **Instalar dependencias** (`express`):
    ```bash 
    npm install
    ``` 
2.  **Iniciar el servidor**: El servidor se ejecutará en el puerto 3000.
    ```bash 
    npm start
    # o
    node server.js
    ``` 

El servidor estará listo para recibir peticiones en `http://localhost:3000`.

---

## 💻 API Endpoints (Rutas) 
Los siguientes endpoints están disponibles para gestionar el inventario. Todos los productos deben incluir las propiedades mínimas: `{ id, name, price, quantity }`.

| Método | Ruta | Descripción | Cuerpo (Body JSON) de Ejemplo |
| :--- | :--- | :--- | :--- |
| **GET** | `/products` | **Leer:** Obtiene y devuelve la lista completa de productos. | *Ninguno* | 
| **POST** | `/products` | **Crear:** Agrega un nuevo producto al inventario. | `{ "id": 1, "name": "Monitor Curvo", "price": 350.50, "quantity": 15 }` | 
| **PUT** | `/products/:id` | **Actualizar:** Modifica las propiedades de un producto específico (por su ID). | `{ "price": 340.00, "quantity": 18 }` | 
| **DELETE** | `/products/:id` | **Eliminar:** Elimina el producto que coincida con el ID proporcionado. | *Ninguno* | 

### Ejemplo de Prueba (con cURL)

**1. Crear un producto (POST):**

```bash 
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"id": 101, "name": "Mouse Inalámbrico", "price": 25.99, "quantity": 50}'
``` 

**2. Obtener todos los productos (GET):**

```bash 
curl http://localhost:3000/products
``` 
---

## 💡 Modularización y Persistencia

La **modularización** es clave en este proyecto:

* **`server.js`** maneja las peticiones HTTP y usa la lógica de persistencia. 
* **`fileUtils.js`** encapsula toda la interacción con el disco, usando: 
    * `fs.readFileSync()` para la operación de lectura. 
    * `fs.writeFileSync()` para la operación de escritura (guardar cambios, actualizaciones o eliminaciones). 
Esto aísla la lógica de acceso a datos, haciendo que el código del servidor sea más limpio y enfocado en el manejo de rutas.
