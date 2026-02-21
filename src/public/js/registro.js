const formRegister = document.getElementById("formRegister");
const nombre = document.getElementById("regNombre");
const correo = document.getElementById("regEmail");
const contraseña = document.getElementById("regPass");
const msgErrorNombre = document.getElementById("msgErrorNombre");
const msgErrorCorreo = document.getElementById("msgErrorCorreo");
const msgErrorContraseña = document.getElementById("msgErrorContraseña");

//Utilizo mucho el metodo thim() que me permite eliminar los espacios vacíos que haya al principio y al final de un texto, pero respeta los del medio.


// Función Principal: Validar al enviar
formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hayErrores = false;

    const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    const expresionRegularContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const expresionRegularNombre = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;

    //VALIDAR NOMBRE

    if (nombre.value.trim() === "") {
        mostrarError(nombre, msgErrorNombre, "El nombre es obligatorio");
        hayErrores = true;
    } 
    else if (nombre.value.trim().length < 2) {
        mostrarError(nombre, msgErrorNombre, "El nombre es muy corto (mínimo 2 letras)");
        hayErrores = true;
    }
    else if (!expresionRegularNombre.test(nombre.value.trim())) {
        mostrarError(nombre, msgErrorNombre, "El nombre no puede tener números ni símbolos");
        hayErrores = true;
    }

    //VALIDAR CORREO
    if (!expresionRegularCorreo.test(correo.value)) {
        mostrarError(correo, msgErrorCorreo,"Por favor, ingresa un correo válido");
        hayErrores = true;
    }
    if (correo.value.trim() === "") {
        mostrarError(correo, msgErrorCorreo, "El correo no puede estar vacío");
        hayErrores = true;
    }
    

    //VALIDAR CONTRASEÑA
    if (!expresionRegularContraseña.test(contraseña.value.trim())) {
        mostrarError(contraseña, msgErrorContraseña, "La contraseña debe tener 8 caracteres, una mayúscula y un número.");
        hayErrores = true;
    }
    
    if (contraseña.value.trim() === "") {
        mostrarError(contraseña, msgErrorContraseña, "La contraseña no puede estar vacía");
        hayErrores = true;
    } 
    

    if (hayErrores) return; 

    // Si todo sale bien :)
    const btnSubmit = formRegister.querySelector('button');
    btnSubmit.disabled = true; // Evitamos doble clic
    btnSubmit.innerText = "Registrando...";

    try {
        // 1. Preparamos el paquete de datos (Mapeamos tus variables al inglés que usa el back)
        const datosUsuario = {
            name: nombre.value.trim(),      // Tu variable 'nombre' -> Backend 'name'
            email: correo.value.trim(),     // Tu variable 'correo' -> Backend 'email'
            password: contraseña.value.trim() // Tu variable 'contraseña' -> Backend 'password'
        };

        // 2. Enviamos el paquete a la ruta de registro
        const respuesta = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        const data = await respuesta.json();

        // 3. Reaccionamos a lo que dijo el servidor
        // ... validaciones y fetch ...

        if (respuesta.ok) {
            // --- AQUÍ VA LA MAGIA DE SWEETALERT ---
            await Swal.fire({
                title: "¡Registrado!",
                text: "Tu cuenta ha sido creada exitosamente.",
                icon: "success",
                confirmButtonText: "Ir al Login",
                // Aquí personalizamos los colores (Ver explicación abajo)
                confirmButtonColor: "#4facfe", 
                background: "#1e293b",
                color: "#f8fafc"
            });

            // Redirigimos al Login cuando el usuario cierra la alerta
            window.location.href = "/login";
        } else {
            // Si hay error (ej: email repetido)
            await Swal.fire({
                title: "Ups...",
                text: data.message || "Error al registrar",
                icon: "error",
                confirmButtonColor: "#ff4757"
            });
        }
        
        // ... catch y finally ...

    } catch (error) {
        console.error("Error crítico:", error);
        // REEMPLAZO: En lugar de alert(), usamos Swal
        await Swal.fire({
            title: "Error de Conexión",
            text: "No pudimos contactar con el servidor. Verifica que esté encendido.",
            icon: "warning",
            confirmButtonColor: "#ffca28" // Un amarillo/naranja de advertencia
        });
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Registrarse";
    }
});

function mostrarError(input, msgElemento, mensaje) {
    input.classList.add("login-form__input--error");
    msgElemento.innerText = mensaje;
    msgElemento.classList.add("login-form__message--active");
}

function limpiarError(input) {
    const contenedorMensaje = input.parentElement.querySelector(".login-form__message");
    input.classList.remove("login-form__input--error");
    contenedorMensaje.classList.remove("login-form__message--active");
}

//Se activa cuando el usuario sale del input
nombre.addEventListener("blur", () => {
    // Convierte "juan perez" en "Juan Perez"
    const texto = nombre.value.trim().toLowerCase();
    
    // Divide por espacios, pone la primera mayúscula y vuelve a unir
    const nombreFormateado = texto.split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');

    if(nombreFormateado.length > 1) {
        nombre.value = nombreFormateado;
    }
});

// Limpiar errores automáticamente cuando el usuario empieza a escribir
[nombre, correo, contraseña].forEach(input => {
    input.addEventListener("focus", () => limpiarError(input));
});