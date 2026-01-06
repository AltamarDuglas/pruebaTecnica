# Prueba Técnica - Gestión de Asistentes

Hola, soy Duglas. Esta es mi entrega para la prueba técnica.
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

## Configuración para Desarrolladores

Dejé algunas cosas listas para que trabajar aquí sea cómodo:

- **Alias `@/`**: Configurado en `tsconfig.json` para que importes cosas como `import { Boton } from '@/componentes/ui/Boton'` en lugar de rutas relativas largas.
- **Diseño en Código**: En `tailwind.config.js` y `globals.css` definí tokens semánticos (como `primary` o `destructive`). Así, si mañana queremos cambiar el color de error, lo cambiamos en un solo sitio.
- **VS Code**: Dejé un `.vscode/settings.json` para que el editor valide correctamente las reglas de Tailwind.

---

## Decisiones que tomé

Quise aplicar buenas prácticas desde el inicio:

1.  **Arquitectura Limpia**: Separé `dominio` de `componentes`. Si mañana cambiamos React por otra librería, la lógica de negocio se mantiene intacta.
2.  **Patrón Repositorio**: Ahora guardo los datos en `LocalStorage` por simplicidad, pero encapsulé esa lógica en `RepositorioAsistente`. La ventaja es que si queremos conectar una API real, solo cambio ese archivo y el resto de la app sigue funcionando igual.
3.  **Componentes Sólidos**: Creé mis propios componentes base (`ui/`) encima de Tailwind. Esto evita repetir clases por todos lados y mantiene la UI consistente.
4.  **UI/UX**:
    - **Validaciones en tiempo real** en el formulario.
    - **Sliders fluidos**: Les implementé un debounce para que no se sientan pesados al arrastrar.
    - **Tema Oscuro/Claro**: Implementado de forma nativa.

## Lo que implementé

- **CRUD Completo**: Crear, editar, borrar y listar asistentes.
- **Wizard**: Un formulario por pasos para simplificar el proceso.
- **Chat de Prueba**: Para ver cómo responde tu asistente.
- **Responsive**: Se adapta correctamente a móvil y escritorio.

## Tiempo invertido

Le dediqué unas **4.5 horas**, priorizando una buena arquitectura y acabado visual sobre aspectos como tests automatizados, debido al límite de tiempo.

Espero que el código sea de tu agrado y se entienda fácil. ¡Cualquier feedback me sirve!
