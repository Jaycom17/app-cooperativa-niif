# Casos de Prueba: Módulo de Administración - Gestión de Profesores

Este documento describe los casos de prueba para listar, actualizar y eliminar usuarios con rol "Profesor".

## Feature: Gestión de Profesores

**Página:** `src/admin/pages/MainAdminPage.tsx`

---

### Escenario 1: Listar todos los profesores existentes

-   **ID del Caso:** `PROF-MGMT-TC-001`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que la lista de profesores se muestra correctamente al cargar la página principal del administrador.
-   **Precondiciones:**
    -   El usuario debe haber iniciado sesión como "Administrador".
    -   Existen varios profesores registrados en la base de datos.
-   **Pasos para reproducir:**
    1.  Navegar a la página principal de administrador (`/admin/dashboard`).
-   **Resultado Esperado:**
    -   Se realiza una petición a la API para obtener la lista de profesores.
    -   La página muestra una tabla o lista con los profesores existentes, mostrando información clave como "Nombre Completo", "Cédula" y "Email".
    -   Cada fila de la tabla contiene botones o iconos para "Editar" y "Eliminar".

---

### Escenario 2: La lista de profesores está vacía

-   **ID del Caso:** `PROF-MGMT-TC-002`
-   **Prioridad:** Media
-   **Descripción:** Verificar que se muestra un mensaje apropiado si no hay profesores registrados.
-   **Precondiciones:**
    -   El usuario debe haber iniciado sesión como "Administrador".
    -   No hay ningún profesor registrado en la base de datos.
-   **Pasos para reproducir:**
    1.  Navegar a la página principal de administrador.
-   **Resultado Esperado:**
    -   En lugar de la tabla, se muestra un mensaje claro como "No hay profesores registrados" o "Aún no has creado ningún profesor".
    -   Debe haber un botón o enlace visible para ir a la página de "Crear Profesor".

---

### Escenario 3: Editar exitosamente la información de un profesor

-   **ID del Caso:** `PROF-MGMT-TC-003`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que un administrador puede modificar los datos de un profesor existente.
-   **Precondiciones:**
    -   El usuario ha iniciado sesión como "Administrador" y está en la página de gestión de profesores.
-   **Pasos para reproducir:**
    1.  Hacer clic en el botón "Editar" de un profesor de la lista.
    2.  Se abre un modal o se redirige a una página de edición con los datos del profesor cargados en un formulario.
    3.  Modificar el "Nombre Completo" del profesor.
    4.  Hacer clic en el botón "Guardar Cambios".
-   **Resultado Esperado:**
    -   Se realiza una petición a la API (PUT o PATCH) para actualizar al usuario.
    -   La petición es exitosa (código 200 OK).
    -   Se muestra un mensaje de éxito (ej. "Profesor actualizado correctamente").
    -   El modal se cierra y la lista de profesores en `MainAdminPage.tsx` se actualiza mostrando el nuevo nombre.

---

### Escenario 4: Cancelar la edición de un profesor

-   **ID del Caso:** `PROF-MGMT-TC-004`
-   **Prioridad:** Media
-   **Descripción:** Verificar que la acción de edición puede ser cancelada sin guardar cambios.
-   **Pasos para reproducir:**
    1.  Hacer clic en el botón "Editar" de un profesor.
    2.  Modificar algún dato en el formulario de edición.
    3.  Hacer clic en el botón "Cancelar" o cerrar el modal.
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API para actualizar.
    -   La información del profesor en la lista principal permanece sin cambios.

---

### Escenario 5: Eliminar exitosamente un profesor

-   **ID del Caso:** `PROF-MGMT-TC-005`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que un administrador puede eliminar un profesor del sistema.
-   **Precondiciones:**
    -   El usuario ha iniciado sesión como "Administrador".
-   **Pasos para reproducir:**
    1.  Hacer clic en el botón "Eliminar" de un profesor en la lista.
    2.  Aparece un modal de confirmación para prevenir borrados accidentales (ej. "¿Estás seguro de que deseas eliminar a este profesor?").
    3.  Hacer clic en el botón "Confirmar" o "Eliminar".
-   **Resultado Esperado:**
    -   Se realiza una petición a la API (DELETE) para eliminar al usuario.
    -   La petición es exitosa (código 200 OK o 204 No Content).
    -   Se muestra un mensaje de éxito (ej. "Profesor eliminado correctamente").
    -   El profesor desaparece de la lista en la `MainAdminPage.tsx`.

---

### Escenario 6: Cancelar la eliminación de un profesor

-   **ID del Caso:** `PROF-MGMT-TC-006`
-   **Prioridad:** Media
-   **Descripción:** Verificar que la acción de eliminación puede ser cancelada.
-   **Pasos para reproducir:**
    1.  Hacer clic en el botón "Eliminar" de un profesor.
    2.  En el modal de confirmación, hacer clic en el botón "Cancelar".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   El modal se cierra y el profesor sigue apareciendo en la lista.

---

### Escenario 7: Error al actualizar (ej. email duplicado)

-   **ID del Caso:** `PROF-MGMT-TC-007`
-   **Prioridad:** Media
-   **Descripción:** Verificar que el sistema maneja los errores del servidor al intentar actualizar un profesor con datos inválidos (ej. un email que ya usa otro profesor).
-   **Pasos para reproducir:**
    1.  Hacer clic en "Editar" en el Profesor A.
    2.  Cambiar el email del Profesor A al email que ya está usando el Profesor B.
    3.  Hacer clic en "Guardar Cambios".
-   **Resultado Esperado:**
    -   La petición a la API falla (código 409 Conflict).
    -   Se muestra un mensaje de error en el formulario de edición (ej. "El correo electrónico ya está en uso").
    -   El formulario no se cierra, permitiendo al usuario corregir el dato.
