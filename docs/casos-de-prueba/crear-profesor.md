# Casos de Prueba: Módulo de Administración - Creación de Profesores

Este documento describe los casos de prueba para la funcionalidad de creación de nuevos usuarios con rol "Profesor".

## Feature: Creación de Profesores

**Página:** `src/admin/pages/CreateProfessorPage.tsx`

---

### Escenario 1: Creación exitosa de un profesor

-   **ID del Caso:** `PROF-TC-001`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que un administrador puede crear un nuevo profesor proporcionando todos los datos válidos y requeridos.
-   **Precondiciones:**
    -   El usuario debe haber iniciado sesión como "Administrador".
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Crear Profesor" desde el dashboard de administrador.
    2.  Llenar el campo "Nombre Completo" con un nombre válido (ej. "Juan Pérez").
    3.  Llenar el campo "Cédula" con un número único y válido (ej. "123456789").
    4.  Llenar el campo "Email" con un correo electrónico único y con formato válido (ej. "juan.perez@test.com").
    5.  Hacer clic en el botón "Crear Profesor" o "Guardar".
-   **Resultado Esperado:**
    -   La petición a la API es exitosa (código 201 Created).
    -   Se muestra un mensaje de éxito en la pantalla (ej. "Profesor creado correctamente").
    -   El formulario se limpia o el administrador es redirigido a la lista de profesores, donde el nuevo usuario debe aparecer.

---

### Escenario 2: Intentar crear un profesor con un email que ya existe

-   **ID del Caso:** `PROF-TC-002`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el sistema impide la creación de un profesor si el email proporcionado ya está en uso por otro usuario.
-   **Precondiciones:**
    -   El usuario debe haber iniciado sesión como "Administrador".
    -   Debe existir un usuario en la base de datos con el email "usuario.existente@test.com".
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Crear Profesor".
    2.  Llenar todos los campos con datos válidos.
    3.  En el campo "Email", ingresar "usuario.existente@test.com".
    4.  Hacer clic en el botón "Crear Profesor".
-   **Resultado Esperado:**
    -   La petición a la API falla (código 409 Conflict o 400 Bad Request).
    -   Se muestra un mensaje de error claro en la pantalla, como "El correo electrónico ya está en uso".
    -   Los datos ingresados en el formulario permanecen para que el usuario pueda corregirlos.

---

### Escenario 3: Validación de campos obligatorios

-   **ID del Caso:** `PROF-TC-003`
-   **Prioridad:** Media
-   **Descripción:** Verificar que el formulario no se puede enviar si alguno de los campos requeridos (nombre, cédula, email) está vacío.
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Crear Profesor".
    2.  Dejar uno o más campos requeridos en blanco.
    3.  Hacer clic en el botón "Crear Profesor".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   Aparecen mensajes de error de validación debajo de cada campo obligatorio que esté vacío (ej. "Este campo es requerido").

---

### Escenario 4: Validación de formato de campos

-   **ID del Caso:** `PROF-TC-004`
-   **Prioridad:** Media
-   **Descripción:** Verificar las validaciones de formato para los campos de cédula y email.
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Crear Profesor".
    2.  **Prueba A (Email):** Ingresar un texto sin formato de email (ej. "email-invalido").
    3.  **Prueba B (Cédula):** Ingresar un texto no numérico en el campo de cédula (ej. "abcdef").
    4.  Llenar los demás campos con datos válidos.
    5.  Hacer clic en el botón "Crear Profesor".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   Para la Prueba A, se muestra un error de validación como "Por favor, ingrese un correo electrónico válido".
    -   Para la Prueba B, se muestra un error de validación como "La cédula solo debe contener números".

---

### Escenario 5: Acceso no autorizado a la página

-   **ID del Caso:** `PROF-TC-005`
-   **Prioridad:** Crítica
-   **Descripción:** Verificar que un usuario que no es administrador no puede acceder a la página de creación de profesores.
-   **Precondiciones:**
    -   El usuario ha iniciado sesión con un rol diferente a "Administrador" (ej. "Profesor").
-   **Pasos para reproducir:**
    1.  Intentar navegar directamente a la URL de la página de creación de profesores (ej. `/admin/create-professor`).
-   **Resultado Esperado:**
    -   El sistema de enrutamiento (guardas de ruta) bloquea el acceso.
    -   El usuario es redirigido a una página de "No autorizado" (Error 403) o a su propia página de inicio.
