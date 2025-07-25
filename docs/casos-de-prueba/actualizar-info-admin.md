# Casos de Prueba: Módulo de Administración - Actualización de Información Personal

Este documento describe los casos de prueba para la página donde el administrador puede actualizar su propia información y cambiar su contraseña.

## Feature: Actualización de Perfil de Administrador

**Página:** `src/admin/pages/UpdateInfoAdminPage.tsx`

---

### Escenario 1: Carga exitosa de la información del administrador

-   **ID del Caso:** `ADMIN-UPDATE-TC-001`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que al cargar la página, los campos del formulario se rellenan automáticamente con la información del administrador que ha iniciado sesión.
-   **Precondiciones:**
    -   El usuario debe haber iniciado sesión como "Administrador".
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Actualizar Información" o "Mi Perfil".
-   **Resultado Esperado:**
    -   El campo "Nombre" muestra el nombre actual del administrador.
    -   El campo "Email" muestra el correo electrónico actual del administrador.

---

### Escenario 2: Actualización exitosa de la información personal

-   **ID del Caso:** `ADMIN-UPDATE-TC-002`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el administrador puede cambiar su nombre y/o email correctamente.
-   **Precondiciones:**
    -   El usuario ha iniciado sesión como "Administrador".
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Actualizar Información".
    2.  Modificar el valor en el campo "Nombre".
    3.  Hacer clic en el botón "Guardar Cambios".
-   **Resultado Esperado:**
    -   Se realiza una petición a la API (PUT o PATCH) para actualizar los datos.
    -   La petición es exitosa (código 200 OK).
    -   Se muestra un mensaje de éxito, como "Información actualizada correctamente".
    -   Si el nombre se muestra en otra parte de la UI (como la barra de navegación), este también se actualiza.

---

### Escenario 3: Cambio de contraseña exitoso

-   **ID del Caso:** `ADMIN-UPDATE-TC-003`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el administrador puede cambiar su contraseña si proporciona los datos correctos.
-   **Pasos para reproducir:**
    1.  Navegar a la página de "Actualizar Información".
    2.  En la sección de cambio de contraseña, ingresar la contraseña actual correcta en "Contraseña Actual".
    3.  Ingresar una nueva contraseña válida en "Nueva Contraseña".
    4.  Ingresar la misma nueva contraseña en "Confirmar Nueva Contraseña".
    5.  Hacer clic en el botón "Cambiar Contraseña".
-   **Resultado Esperado:**
    -   Se realiza una petición a la API para cambiar la contraseña.
    -   La petición es exitosa (código 200 OK).
    -   Se muestra un mensaje de éxito, como "Contraseña cambiada correctamente".
    -   Los campos del formulario de contraseña se limpian.

---

### Escenario 4: Error al cambiar contraseña - Contraseña actual incorrecta

-   **ID del Caso:** `ADMIN-UPDATE-TC-004`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el sistema impide el cambio de contraseña si la contraseña actual proporcionada es incorrecta.
-   **Pasos para reproducir:**
    1.  Ingresar una contraseña incorrecta en el campo "Contraseña Actual".
    2.  Llenar los campos de nueva contraseña.
    3.  Hacer clic en "Cambiar Contraseña".
-   **Resultado Esperado:**
    -   La petición a la API falla (código 401/403 Unauthorized/Forbidden).
    -   Se muestra un mensaje de error claro, como "La contraseña actual es incorrecta".

---

### Escenario 5: Error al cambiar contraseña - Las nuevas contraseñas no coinciden

-   **ID del Caso:** `ADMIN-UPDATE-TC-005`
-   **Prioridad:** Media
-   **Descripción:** Verificar que la validación del lado del cliente impide enviar el formulario si las nuevas contraseñas no coinciden.
-   **Pasos para reproducir:**
    1.  Llenar el campo "Contraseña Actual" correctamente.
    2.  Ingresar "nuevaClave123" en "Nueva Contraseña".
    3.  Ingresar "otraClave456" en "Confirmar Nueva Contraseña".
    4.  Hacer clic en "Cambiar Contraseña".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   Se muestra un mensaje de error de validación, como "Las nuevas contraseñas no coinciden".

---

### Escenario 6: Validación de campos vacíos

-   **ID del Caso:** `ADMIN-UPDATE-TC-006`
-   **Prioridad:** Media
-   **Descripción:** Verificar que los formularios no se pueden enviar con campos requeridos vacíos.
-   **Pasos para reproducir:**
    1.  **Prueba A:** Borrar el contenido del campo "Nombre" y hacer clic en "Guardar Cambios".
    2.  **Prueba B:** Dejar vacío el campo "Contraseña Actual" e intentar cambiar la contraseña.
-   **Resultado Esperado:**
    -   No se realizan peticiones a la API.
    -   Se muestran mensajes de validación indicando que los campos son obligatorios.

---

### Escenario 7: Error al actualizar con un email duplicado

-   **ID del Caso:** `ADMIN-UPDATE-TC-007`
-   **Prioridad:** Media
-   **Descripción:** Verificar que el sistema maneja el error si el administrador intenta cambiar su email a uno que ya está en uso.
-   **Precondiciones:**
    -   Existe otro usuario en el sistema con el email `usuario.existente@test.com`.
-   **Pasos para reproducir:**
    1.  Cambiar el email en el formulario a `usuario.existente@test.com`.
    2.  Hacer clic en "Guardar Cambios".
-   **Resultado Esperado:**
    -   La petición a la API falla (código 409 Conflict).
    -   Se muestra un mensaje de error, como "El correo electrónico ya está en uso".
