# Gestión de Asistentes IA 🤖 ✨

¡Hola! 👋 Esta es mi solución para la prueba técnica. Básicamente es una app para gestionar y entrenar asistentes virtuales, todo hecho con React, Next.js y mucho cariño.

## ¿Cómo lo hago correr? 🚀

Súper fácil, nada raro:

1.  **Instala las dependencias**:
    ```bash
    npm install
    ```
    *(O `pnpm`, `yarn`, lo que uses, pero con npm va fijo).*

2.  **Arranca el servidor**:
    ```bash
    npm run dev
    ```
    Y listo, abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ¿Qué tiene de interesante? 🧐

Le metí bastante onda a la UI y la arquitectura para que quede prolijo y escalable:

*   **Arquitectura Limpia (Clean Architecture)**:
    *   Separé todo en capas (`dominio`, `servicios`, `componentes`) para no mezclar peras con manzanas.
    *   La lógica de negocio no sabe nada de React ni de dónde se guardan los datos.
*   **Persistencia**:
    *   Ahora mismo usa `localStorage` para no complicarla con backend, pero está hecho con el **Patrón Repositorio**. Si mañana queremos enchufarle una API real, cambiamos una sola clase y el resto ni se entera. Magia. 🪄
*   **UI/UX**:
    *   **Tema Oscuro/Claro**: Detecta tu preferencia y te la guarda.
    *   **Diseño Responsivo**: Se ve bien en el celu y en la compu.
    *   **Modales y Steppers**: El formulario de creación no es un choclo gigante, está dividido en pasitos prolijos.
    *   **Simulador de Chat**: Puedes "entrenar" al asistente y chatear con él (simulado, obvio).

## Tecnologías 🛠️

*   **Next.js y React**: La base de todo.
*   **CSS Modules**: Para que los estilos no se peleen entre sí.
*   **Context API**: Para manejar el estado global sin volverse loco.
*   **Lucide React**: Esos íconos facheros que ves por ahí.

---

En fin, espero que les guste. Cualquier cosa me chiflan. ¡Saludos! 🧉
