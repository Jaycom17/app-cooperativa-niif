# Casos de Prueba: Módulo de Autenticación (Login)

Este documento describe los casos de prueba para la funcionalidad de inicio de sesión de la aplicación.

## Feature: Inicio de Sesión de Usuario

**Página:** `src/auth/pages/LoginPage.tsx`

---

### Escenario 1: Inicio de sesión exitoso como Administrador

-   **ID del Caso:** `LOGIN-TC-001`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que un usuario con rol de "Administrador" y credenciales válidas puede iniciar sesión y es redirigido a la página principal de administrador.
-   **Precondiciones:**
    -   Debe existir un usuario con rol "Administrador" en la base de datos.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Ingresar un email de administrador válido en el campo "Email".
    3.  Ingresar la contraseña correcta en el campo "Contraseña".
    4.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   La petición a la API es exitosa (código 200).
    -   El token de autenticación se guarda en el estado global (Zustand `AuthStore`).
    -   El usuario es redirigido a la página principal de administrador (`/admin/dashboard`).

---

### Escenario 2: Inicio de sesión exitoso como Profesor

-   **ID del Caso:** `LOGIN-TC-002`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que un usuario con rol de "Profesor" y credenciales válidas puede iniciar sesión y es redirigido a la página principal de profesor.
-   **Precondiciones:**
    -   Debe existir un usuario con rol "Profesor" en la base de datos.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Ingresar un email de profesor válido.
    3.  Ingresar la contraseña correcta.
    4.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   La petición a la API es exitosa.
    -   El token se guarda en el estado.
    -   El usuario es redirigido a la página principal de profesor (`/professor/dashboard`).

---

### Escenario 3: Credenciales incorrectas (Contraseña errónea)

-   **ID del Caso:** `LOGIN-TC-003`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el sistema muestra un mensaje de error claro cuando el usuario ingresa una contraseña incorrecta.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Ingresar un email válido.
    3.  Ingresar una contraseña incorrecta.
    4.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   La petición a la API falla (código 401 Unauthorized).
    -   Se muestra un mensaje de error visible en la pantalla, como "El correo o la contraseña son incorrectos".
    -   El usuario permanece en la página de inicio de sesión.
    -   Los campos de contraseña se vacían por seguridad.

---

### Escenario 4: Usuario no existente

-   **ID del Caso:** `LOGIN-TC-004`
-   **Prioridad:** Alta
-   **Descripción:** Verificar que el sistema muestra un mensaje de error genérico cuando el email no corresponde a ningún usuario registrado.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Ingresar un email que no existe en la base de datos (`usuario.inexistente@test.com`).
    3.  Ingresar cualquier contraseña.
    4.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   Se muestra el mismo mensaje de error genérico: "El correo o la contraseña son incorrectos" (para no revelar si un email está registrado o no).
    -   El usuario permanece en la página de inicio de sesión.

---

### Escenario 5: Campos de formulario vacíos

-   **ID del Caso:** `LOGIN-TC-005`
-   **Prioridad:** Media
-   **Descripción:** Verificar que la validación del formulario del lado del cliente funciona y no permite enviar el formulario si los campos están vacíos.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Dejar el campo "Email" y/o "Contraseña" vacíos.
    3.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   Se muestran mensajes de validación debajo de cada campo requerido, como "Este campo es obligatorio".
    -   El botón "Entrar" podría estar deshabilitado hasta que ambos campos tengan contenido.

---

### Escenario 6: Validación de formato de email

-   **ID del Caso:** `LOGIN-TC-006`
-   **Prioridad:** Media
-   **Descripción:** Verificar que el campo de email valida que el texto ingresado tenga un formato de correo electrónico válido.
-   **Pasos para reproducir:**
    1.  Navegar a la página de inicio de sesión.
    2.  Ingresar un texto sin formato de email (ej. "texto-invalido").
    3.  Llenar el campo de contraseña.
    4.  Hacer clic en el botón "Entrar".
-   **Resultado Esperado:**
    -   No se realiza ninguna petición a la API.
    -   Se muestra un mensaje de validación debajo del campo de email, como "Por favor, ingrese un correo electrónico válido".
