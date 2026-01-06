# 🤖 Gestión de Asistentes de IA - Prueba Técnica

Aplicación web moderna para la gestión, configuración y simulación de Asistentes de Inteligencia Artificial. Este proyecto ha sido desarrollado siguiendo una filosofía de **"Código Nativo en Español"**, demostrando no solo habilidades técnicas sino también la capacidad de adaptar el código a un lenguaje de dominio específico.

## 🚀 Instrucciones para Correr el Proyecto

El proyecto utiliza **Next.js** y **NPM**. Asegúrate de tener Node.js instalado.

1.  **Clonar el repositorio** (si aún no lo tienes):
    ```bash
    git clone https://github.com/AltamarDuglas/pruebaTecnica.git
    cd prueba-tecnica
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador**:
    Ingresa a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 🛠️ Decisiones Técnicas

### 1. Arquitectura en Capas y DDD (Simplificado)
Se estructuró el proyecto separando claramente las responsabilidades, lo que facilita la escalabilidad y el mantenimiento:
-   **`src/dominio`**: Define las Entidades (`Asistente`) y DTOs, actuando como el núcleo de la lógica de negocio.
-   **`src/servicios`**: Implementa el patrón **Repository**. Se creó una interfaz `RepositorioAsistente` para desacoplar la lógica de persistencia. Actualmente se usa una implementación base `LocalStorage` (`LocalStorageRepositorio.ts`), pero podría cambiarse por una API real sin tocar la UI.
-   **`src/hooks`**: Custom hooks (e.g., `useAsistentes`) que actúan como adaptadores entre la vista y la capa de servicios, manejando estados de carga y errores.
-   **`src/componentes`**: Separados en `ui` (componentes base reutilizables sgnostic) y `funcionalidades` (componentes de negocio específicos).

### 2. Código Nativo en Español
Para cumplir con el objetivo de refactorización y demostrar adaptabilidad, **todo el código está en español**:
-   Variables, Funciones, Clases e Interfaces.
-   CSS Modules y Clases.
-   Comentarios y Documentación.
Esto facilita la lectura para equipos hispanohablantes y demuestra un dominio total sobre la semántica del código.

### 3. Sistema de Diseño (UI/UX)
-   **CSS Modules**: Se optó por CSS nativo modular para tener control total sobre los estilos, animaciones y especificidad, sin depender de librerías pesadas como Tailwind (aunque se podría integrar).
-   **Variables CSS**: Se definieron tokens de diseño globales (`globals.css`) para colores, espaciados y radios, facilitando la implementación del **Modo Oscuro**.
-   **Componentes Reutilizables**: Se crearon componentes base robustos (`Boton`, `CampoTexto`, `Modal`, `Selector`) que encapsulan estilos y comportamientos (accesibilidad, animaciones), asegurando consistencia visual.

---

## ✨ Características Implementadas

1.  **Gestión (CRUD) de Asistentes**:
    -   Crear nuevos asistentes con un **formulario multi-paso** (Info Básica -> Configuración -> Revisión).
    -   Validación de formularios en tiempo real.
    -   Listado de asistentes con tarjetas interactivas.
    -   Eliminación con confirmación.
    -   Edición de asistentes existentes.

2.  **Configuración Avanzada**:
    -   **Slider Balanceado Inteligentemente**: Al configurar la longitud de respuesta, los sliders se auto-ajustan para asegurar que siempre sumen 100%.
    -   Selector de tono y lenguaje.

3.  **Área de Entrenamiento y Simulación**:
    -   Página dinámica por asistente (`/[id]`).
    -   **Editor de System Prompt**: Campo de texto para definir las instrucciones de comportamiento.
    -   **Simulador de Chat**: Interfaz de chat funcional donde el asistente responde (simulado) con delay de red artificial para mayor realismo.

4.  **Extras UI**:
    -   **Tema Oscuro/Claro**: Toggle funcional persistente.
    -   **Animaciones**: Transiciones suaves al abrir modales, cargar listas y enviar mensajes.
    -   **Responsive**: Diseño 100% adaptable a móviles y escritorio.

---

## ⚖️ Priorización y Trade-offs (Qué dejé fuera)

Dado el tiempo limitado, se tomaron las siguientes decisiones:

1.  **Backend Real / Base de Datos**:
    -   *Decisión*: Usar `localStorage`.
    -   *Por qué*: Para priorizar la calidad de la UI/UX y la estructura del frontend sin complicaciones de despliegue de infraestructura. El patrón Repositorio hace que migrar a una API real sea trivial.

2.  **Librerías de Componentes (MUI / Shadcn)**:
    -   *Decisión*: Construir componentes propios (`src/componentes/ui`).
    -   *Por qué*: Para demostrar la capacidad de construir interfaces desde cero, manejar CSS avanzado y entender el ciclo de vida de los componentes React sin "muletas".

3.  **Tests Automatizados (Jest/Cypress)**:
    -   *Decisión*: No incluidos en esta iteración.
    -   *Por qué*: Se priorizó la funcionalidad visible y la experiencia de usuario. Sin embargo, la arquitectura (Servicios desacoplados) está lista para ser testeada unitariamente con facilidad.

---

## ⏱️ Tiempo de Dedicación

**Aproximadamente 4 - 5 horas.**
-   **1h**: Configuración inicial, Git flow y definición de arquitectura.
-   **2h**: Implementación de capa base (UI Kit, Servicios) y Refactorización a Español.
-   **1.5h**: Desarrollo de funcionalidades complejas (Formulario Multi-paso y Simulador de Chat).
-   **0.5h**: Pulido visual, animaciones y documentación.

---

### Autor
Desarrollado como parte de la prueba técnica para demostrar dominio en **Next.js, TypeScript, React, Git y Arquitectura de Software**.
