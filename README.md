# Prueba Técnica - Gestión de Asistentes
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

## Estructura del Proyecto

El proyecto sigue una arquitectura modular en `src/`, diseñada para separar la lógica de negocio de la interfaz:

```
src/
├── app/                  # App Router de Next.js
│   ├── layout.tsx        # Layout raíz (Fuentes, Metadata)
│   ├── page.tsx          # Página de inicio
│   └── globals.css       # Estilos globales y variables Tailwind
├── componentes/          # Biblioteca de componentes UI
│   ├── ui/               # Componentes primitivos (Boton, Input, Modal)
│   ├── funcionalidades/  # Componentes de negocio (FormularioAsistente)
│   └── layout/           # Componentes estructurales (Header, Grid)
├── dominio/              # Entidades y Tipos (Clean Architecture)
│   └── tipos.ts          # Interfaces TypeScript centrales (Asistente, DTOs)
├── servicios/            # Lógica de acceso a datos
│   └── RepositorioAsistente.ts # Abstracción sobre LocalStorage
├── hooks/                # Custom Hooks
│   └── useAsistentes.ts  # Lógica reactiva para gestionar asistentes
└── utilidades/           # Helpers y formatters
```

## Configuración

### 1. Alias de Rutas (`tsconfig.json`)
Para mantener los imports limpios, hemos configurado el alias `@`:
```json
"@/*": ["./src/*"]
```
Esto permite importar así: `import { Boton } from '@/componentes/ui/Boton';`

### 2. Sistema de Diseño (`tailwind.config.js`)
El diseño no está "hardcodeado". Usamos tokens semánticos en `extend.colors`:
- **`primary` / `secondary`**: Colores principales de la marca.
- **`background` / `foreground`**: Permiten el modo oscuro automático.
- **`destructive`**: Para acciones de peligro (borrar).

Referencian variables CSS en `globals.css` (`--primary: 346.8 77.2% 49.8%;`).

### 3. Editor (`.vscode/settings.json`)
Incluimos una configuración de workspace para evitar falsos positivos en los linters con reglas de Tailwind (`@tailwind`, `@apply`).

## Decisiones Técnicas

Opté por una arquitectura que escale bien y sea fácil de mantener, no solo "que funcione":

*   **Arquitectura Limpia (Clean Architecture)**: Separé el código en capas (`dominio`, `servicios`, `componentes`).
    *   *¿Por qué?* Para que la lógica de negocio (como la validación de un asistente) no dependa de React. Si mañana cambiamos el framework UI, el dominio sigue intacto.
*   **Patrón Repositorio**: Usé `RepositorioAsistente` para manejar los datos.
    *   *¿Por qué?* Ahora mismo guardo todo en `LocalStorage` por simplicidad, pero gracias a esto, conectar una API real sería cuestión de crear una nueva implementación del repositorio sin tocar ni una línea de los componentes visuales.
*   **Principios SOLID**: Intenté aplicarlos en todo el frontend. Por ejemplo, el Principio de Responsabilidad Única (SRP) en los componentes (el Modal solo orquesta, los Pasos renderizan) y la Inversión de Dependencias (hooks dependiendo de interfaces, no de implementaciones).
*   **CSS Modules**: Para mantener los estilos encapsulados y evitar que un cambio en un botón rompa el layout de otra página.

## Migración a Tailwind CSS (Refactorización)

Recientemente migramos todo el proyecto de **CSS Modules** a **Tailwind CSS** buscando una UI más moderna y fácil de mantener, pero sin perder la limpieza del código.

### ¿Cómo lo hicimos manteniendo SOLID?
En lugar de llenar todos los componentes de clases de utilidad ("div soup"), seguimos una estrategia de **Componentes Primitivos**:

1.  **Refactorizamos los UI Primitives (`src/componentes/ui`)**:
    *   Componentes como `Boton`, `CampoTexto`, `Selector` y `Modal` encapsulan internamente las clases de Tailwind.
    *   *Beneficio*: El resto de la aplicación usa `<Boton variante="primario" />` sin preocuparse si por debajo usa CSS puro o Tailwind.
2.  **Eliminamos CSS Modules**:
    *   Se borraron todos los archivos `*.module.css`.
    *   Redujimos la cantidad de archivos y centralizamos la configuración de diseño en `tailwind.config.js` y `globals.css` (variables CSS).
3.  **Animaciones "Lucid"**:
    *   Integramos `tailwindcss-animate` para efectos de entrada (`zoom-in`, `fade-in`) y retroalimentación visual (ej: indicador de escritura con rebote).

### ¿Qué se eliminó?
*    Todos los archivos `.module.css` (código muerto).
*   Clases CSS manuales y selectores complejos.

### ¿Qué se ganó?
*    **Consistencia**: Todos los colores, espaciados y bordes vienen del mismo sistema de diseño.
*    **Velocidad**: Menos cambio de contexto entre archivos `.tsx` y `.css`.
*    **Modernidad**: Tema oscuro/claro nativo y animaciones fluidas out-of-the-box.

## Características Implementadas

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
*   Migracion a Tailwind CSS.
---
Espero que el código sea de su agrado. Cualquier feedback es bienvenido
