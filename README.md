# Prueba Técnica - Gestión de Asistentes IA

Hola, esta es mi entrega para la prueba técnica. El objetivo fue crear una aplicación robusta para gestionar y entrenar asistentes virtuales, enfocándome principalmente en la arquitectura frontend y la experiencia de usuario.

## Instrucciones para correr el proyecto

Es un proyecto estándar de Next.js, así que no tiene misterio:

1.  **Instala las dependencias**:
    ```bash
    npm install
    ```

2.  **Levanta el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Y abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Decisiones Técnicas

Opté por una arquitectura que escale bien y sea fácil de mantener, no solo "que funcione":

*   **Arquitectura Limpia (Clean Architecture)**: Separé el código en capas (`dominio`, `servicios`, `componentes`).
    *   *¿Por qué?* Para que la lógica de negocio (como la validación de un asistente) no dependa de React. Si mañana cambiamos el framework UI, el dominio sigue intacto.
*   **Patrón Repositorio**: Usé `RepositorioAsistente` para manejar los datos.
    *   *¿Por qué?* Ahora mismo guardo todo en `LocalStorage` por simplicidad, pero gracias a esto, conectar una API real sería cuestión de crear una nueva implementación del repositorio sin tocar ni una línea de los componentes visuales.
*   **Principios SOLID**: Intenté aplicarlos en todo el frontend. Por ejemplo, el Principio de Responsabilidad Única (SRP) en los componentes (el Modal solo orquesta, los Pasos renderizan) y la Inversión de Dependencias (hooks dependiendo de interfaces, no de implementaciones).
*   **CSS Modules**: Para mantener los estilos encapsulados y evitar que un cambio en un botón rompa el layout de otra página.

## ✨ Características Implementadas

*   **Gestión Completa (CRUD)**: Puedes crear, listar, editar y eliminar asistentes.
*   **Wizard de Creación**: Un formulario de 2 pasos ("Info" y "Configuración") con validaciones en tiempo real.
*   **Lógica de Negocio en Frontend**: El slider de configuración de respuestas se balancea solo (si subes uno, los otros bajan para mantener el 100%).
*   **Simulador de Chat**: Una interfaz para probar cómo respondería el asistente según su configuración.
*   **Apariencia**: Tema Oscuro/Claro persistente y diseño responsive adaptado a móvil y desktop.

## Trade-offs: Qué dejé fuera y por qué

Tuve que priorizar para entregar valor en el tiempo estimado:

*   **Tests Automatizados (Jest/Cypress)**:
    *   *Razón*: Aunque la arquitectura está diseñada para ser ultra-testeable (lógica separada de UI), configurar el entorno de testing y escribir cobertura decente me habría llevado más tiempo del límite. Prioricé la funcionalidad y el acabado visual.

## Tiempo de Dedicación

**Aproximadamente 4.5 horas** distribuidas en:
*   Planteamiento de arquitectura y estructura inicial.
*   Desarrollo de componentes UI y sistema de diseño.
*   Implementación de lógica compleja (Formulario wizard y estado).
*   Refinamiento visual y responsive.
---
Espero que el código sea de su agrado. Cualquier feedback es bienvenido
