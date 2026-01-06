# Prueba Técnica - Gestión de Asistentes

Esta es mi entrega para la prueba técnica.
Mi objetivo principal no fue solo "hacer que funcione", sino crear una aplicación robusta, mantenible y con una arquitectura frontend sólida que escale bien. También puse especial atención a la experiencia de usuario.

---

## Cómo correr el proyecto

Esto es un proyecto estándar de Next.js, así que es directo:

1.  **Instala las dependencias**:
    ```bash
    npm install
    ```
2.  **Levanta el servidor**:
    ```bash
    npm run dev
    ```
    Y abre [http://localhost:3000](http://localhost:3000).

---

## Estructura del Proyecto

Organicé el código en `src/` siguiendo una arquitectura modular para que se entienda qué es negocio y qué es interfaz visual:

```
src/
├── app/                  # Aquí están las páginas (App Router)
│   ├── layout.tsx        # Fuentes y metadata global
│   ├── page.tsx          # La Home
│   └── globals.css       # Variables de diseño
├── componentes/          # Componentes reutilizables
│   ├── ui/               # Botones, Modales, Inputs (tontos y puros)
│   ├── funcionalidades/  # Componentes complejos (Formulario, Chat)
│   └── layout/           # Header, Grid
├── dominio/              # El corazón del negocio (Types, Interfaces)
├── servicios/            # Cómo guardamos datos (Repository Pattern)
└── hooks/                # Lógica de estado (useAsistentes)
```

## Configuración

Dejé algunas cosas listas para que trabajar aquí sea cómodo:

- **Alias `@/`**: Configurado en `tsconfig.json` para que importes cosas como `import { Boton } from '@/componentes/ui/Boton'` en lugar de rutas relativas largas.
- **Diseño en Código**: En `tailwind.config.js` y `globals.css` definí tokens semánticos (como `primary` o `destructive`). Así, si mañana queremos cambiar el color de error, lo cambiamos en un solo sitio.
- **VS Code**: Dejé un `.vscode/settings.json` para que el editor valide correctamente las reglas de Tailwind.

---

## Decisiones que tomé

Quise aplicar buenas prácticas de ingeniería de software desde el primer commit:

1.  **Arquitectura Desacoplada**: Separé el `dominio` (reglas de negocio y tipos) de la capa visual. Esto significa que la lógica "core" de la aplicación no depende de React, facilitando pruebas y mantenimiento futuro.
2.  **Patrón Repositorio**: El acceso a datos está abstraído. Aunque hoy guardamos en `LocalStorage` por simplicidad, encapsular esto en un `Repositorio` permite migrar mañana a una API REST o GraphQL cambiando **un solo archivo**, sin romper ningún componente.
3.  **Sistema de Diseño Atómico**: En lugar de depender de librerías UI pesadas, construí un set de componentes primitivos ligeros (`ui/`) usando Tailwind CSS. Esto me dio control total para implementar la estética **"Glassmorphism"** y las animaciones sin luchar contra estilos predefinidos.
4.  **Experiencia de Usuario (UX)**:
    - **Reactividad**: Validaciones en tiempo real y feedback visual instantáneo (iconos animados).
    - **Performance**: Implementé `debounce` en los sliders para evitar re-renderizados excesivos y asegurar 60fps incluso en dispositivos lentos.
    - **Accesibilidad**: Cuidado especial en el contraste del modo oscuro (evitando negros puros) y estados de foco visibles.

## Lo que implementé

- **CRUD Completo**: Crear, editar, borrar y listar asistentes.
- **Wizard**: Un formulario por pasos para simplificar el proceso.
- **Chat de Prueba**: Para ver cómo responde tu asistente.
- **Responsive**: Se adapta correctamente a móvil y escritorio.

## Tiempo invertido

Le dediqué unas **5.5 horas**, priorizando una buena arquitectura y acabado visual sobre aspectos como tests automatizados, debido al límite de tiempo.

Espero que el código sea de tu agrado y se entienda fácil. Cualquier feedback me sirve
