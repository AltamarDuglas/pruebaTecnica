# Prueba Técnica - Gestión de Asistentes IA

Este proyecto implementa una solución para la gestión y configuración de asistentes de inteligencia artificial, desarrollado íntegramente en español.

## Instrucciones de Ejecución

1.  **Instalación**:
    ```bash
    npm install
    ```

2.  **Desarrollo**:
    ```bash
    npm run dev
    ```
    Accesible en [http://localhost:3000](http://localhost:3000).

## Decisiones Técnicas y Arquitectura

El desarrollo se guió por principios **SOLID** y **Clean Architecture** para garantizar mantenibilidad y escalabilidad.

### 1. Arquitectura Hexagonal Simplificada (Capas)
Se separó la lógica de negocio de la infraestructura y la UI:
-   **Dominio (`src/dominio`)**: Define las interfaces (`Asistente`, `RepositorioAsistente`) y tipos puros. No tiene dependencias de framework.
-   **Infraestructura/Servicios (`src/servicios`)**: Implementación concreta de los repositorios.
    -   *Decisión*: Se usó el **Patrón Repositorio** (`RepositorioAsistente`) para desacoplar la lógica de guardado. Actualmente implementa persistencia en `LocalStorage`, pero gracias a la Inversión de Dependencias (D of SOLID), cambiar a una API REST solo requeriría crear una nueva clase `ApiRepositorio` sin modificar la UI o lógica de negocio.
-   **UI (`src/componentes`)**: Componentes de React divididos en `ui` (genéricos, "dumb components") y `funcionalidades` (con lógica de negocio).

### 2. Principios SOLID Aplicados
-   **Single Responsibility (SRP)**: Cada componente de UI tiene una única responsabilidad (ej. `Modal` solo maneja su estado de apertura, `FormularioEntrenamiento` solo la lógica de ese form). Los hooks encapsulan la lógica de estado.
-   **Open/Closed (OCP)**: Los componentes base como `Boton` o `Tarjeta` están abiertos a extensión mediante props, pero cerrados a modificación interna para nuevos casos de uso.
-   **Liskov Substitution (LSP)**: Las implementaciones del repositorio pueden ser intercambiables sin romper la aplicación.
-   **Interface Segregation (ISP)**: Interfaces de dominio específicas y pequeñas.
-   **Dependency Inversion (DIP)**: Los hooks dependen de la abstracción `RepositorioAsistente` (vía singleton/inyección manual), no de la implementación concreta de `localStorage` directamente.

### 3. CSS Modules
Se optó por CSS Modules para evitar colisiones de nombres y mantener los estilos encapsulados junto a sus componentes, facilitando la eliminación de código muerto.

## Características Implementadas

1.  **CRUD de Asistentes**: Listado, creación, edición y eliminación.
2.  **Formulario Avanzado**: Wizard de creación con validaciones y lógica de negocio compleja (slider de distribución porcentual balanceada automáticamente).
3.  **Simulador de Entrenamiento**: Interfaz de chat simulada para verificar el comportamiento del asistente.
4.  **UI/UX**: Modo oscuro/claro persistente, diseño responsive y estados de carga.

## Trade-offs y Priorización

Debido al límite de tiempo, se priorizó la **calidad del código frontend y la arquitectura** sobre la infraestructura de backend:

-   **Testing y Calidad**: Aunque la suite de tests (Jest/Cypress) no se implementó por limitaciones de tiempo, la arquitectura **Hexagonal/Clean** aplicada garantiza una alta **testabilidad**:
    -   *Lógica de Negocio*: Las entidades y DTOs en `src/dominio` son funciones puras o tipos, triviales de testear.
    -   *Servicios*: Al depender de abstracciones (`RepositorioAsistente`), se pueden mockear fácilmente para tests de integración.
    -   *Hooks*: Los Custom Hooks encapsulan la lógica de estado y efectos, permitiendo un testing aislado con `renderHook`.

## Tiempo de Dedicación

**Total estimado: 4.5 horas.**
-   Configuración y estructura base: 1h
-   Desarrollo de componentes UI y lógica global: 2h
-   Implementación de funcionalidades complejas (Formulario/Chat): 1.5h
