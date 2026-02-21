const formulario = document.querySelector(".login-form");
const correo = document.getElementById("mail");
const contraseña = document.getElementById("contraseña");
const msgErrorCorreo = document.getElementById("msgErrorCorreo");
const msgErrorContraseña = document.getElementById("msgErrorContraseña");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hayErrores = false;
    const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    const datos = {
        correo: correo.value,
        contraseña: contraseña.value
    }
    
    // VALIDAR CORREO
    if (!expresionRegularCorreo.test(correo.value.trim())) {
        mostrarError(correo, msgErrorCorreo,"Por favor, ingresa un correo válido");
        hayErrores = true;
    }
    if (correo.value.trim() === "") {
        mostrarError(correo, msgErrorCorreo, "El correo no puede estar vacío");
        hayErrores = true;
    }
    
    // VALIDAR CONTRASEÑA
    if (datos.contraseña === "") {
        mostrarError(contraseña, msgErrorContraseña, "La contraseña no puede estar vacía");
        hayErrores = true;
    }

    if (hayErrores) return; 
    
    // Si todo sale bien :)
    const btnLogin = formulario.querySelector('button');
    btnLogin.disabled = true;
    btnLogin.innerText = "Verificando...";

    try {
        // 1. Enviamos credenciales
        const respuesta = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: correo.value,       // Mapeo: front 'correo' -> back 'email'
                password: contraseña.value // Mapeo: front 'contraseña' -> back 'password'
            })
        });

        const data = await respuesta.json();

        // 2. Verificamos respuesta
        if (respuesta.ok) {
            await Swal.fire({
                title: "¡Conexión exitosa!",
                text: "LOGIN CORRECTO",
                icon: "success",
                background: "#1e293b",
                color: "#f8fafc",
                showConfirmButton: false,
                timer: 1500,
            });
            window.location.href = "/";
        } else {
            // Contraseña incorrecta o usuario no encontrado
            // Aquí decidimos dónde mostrar el error. Por ahora, en el general o contraseña.
            mostrarError(contraseña, msgErrorContraseña, data.message || "Credenciales inválidas");
        }

    } catch (error) {
        console.error(error);
        alert("No se pudo conectar con el servidor");
    } finally {
        btnLogin.disabled = false;
        btnLogin.innerText = "Iniciar sesión";
    }
});

/*La siguiente funcion agrega un mensaje y a ese mensaje 
le agregan una clase, tambien le agrego un estilo al input.*/

function mostrarError(input, msgElemento, mensaje) {
    input.classList.add("login-form__input--error");
    msgElemento.innerText = mensaje;
    msgElemento.classList.add("login-form__message--active");
}

function limpiarError(input, msgElemento) {
    input.classList.remove("login-form__input--error");
    msgElemento.classList.remove("login-form__message--active");
    msgElemento.innerText = "";
}

// Para limpiar el error en cuanto el usuario toca el input
correo.addEventListener("focus", () => limpiarError(correo, msgErrorCorreo));
contraseña.addEventListener("focus", () => limpiarError(contraseña, msgErrorContraseña));