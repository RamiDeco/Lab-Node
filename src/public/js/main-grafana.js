// Esta parte de la conexión de Sockets me costaba un poco, así que me apoyé en IA para hacerlo.
// Si podes dale una buena revisada por las dudas.

// ==========================================
// 1. REFERENCIAS AL DOM
// ==========================================
const socketStatusDiv = document.getElementById('socketStatus');
const crearTurnoBtn = document.getElementById('crearTurnoBtn');
const startBtn = document.getElementById('startExp');
const tempDisplay = document.getElementById('tempDisplay');
const turnStatus = document.getElementById('turnStatus');
const resetQueueBtn = document.getElementById('resetQueueBtn');

// ==========================================
// 2. VARIABLES DE ESTADO
// ==========================================
let shiftId = null;
let currentSocketId = null;

// Leemos el ID invisible que dejamos en el body
const bodyUserId = document.body.getAttribute('data-userid');
let userId = bodyUserId ? parseInt(bodyUserId) : 1; // Si por alguna razón falla, usamos el 1 como respaldo

// ==========================================
// 3. CONEXIÓN SOCKET.IO
// ==========================================
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    currentSocketId = socket.id;
    socketStatusDiv.textContent = `Conectado (ID: ${currentSocketId})`;
    socketStatusDiv.style.color = 'var(--success)';
    crearTurnoBtn.disabled = false;
});

socket.on('disconnect', () => {
    currentSocketId = null;
    socketStatusDiv.textContent = 'Sistema Offline';
    socketStatusDiv.style.color = 'var(--danger)';
    crearTurnoBtn.disabled = true;
});

socket.on('experiment:started', (data) => {
    turnStatus.textContent = "Experimento en curso...";
    startBtn.style.display = 'none';
});

socket.on('turno:ofrecido', (data) => {
    startBtn.style.display = 'block'; 
    turnStatus.textContent = "¡ES TU TURNO! Sistema listo para iniciar.";
    turnStatus.style.color = "var(--success)";
    shiftId = data.turnoId;
});

socket.on('exp:data', (data) => {
    if(data.temperatura) {
        tempDisplay.textContent = parseFloat(data.temperatura).toFixed(2) + " °C";
    }
});

// ==========================================
// 4. CREAR TURNO
// ==========================================
crearTurnoBtn.addEventListener('click', async () => {
    // Si por alguna razón no hay usuario logueado, lo frenamos
    if (!userId) {
        alert("Error: No estás logueado correctamente.");
        return;
    }

    const shiftData = {
        socketid: currentSocketId,
        userId: userId
    }
    
    turnStatus.textContent = "Solicitando turno al servidor...";
    turnStatus.style.color = "var(--text-muted)";
    
    try {
        const response = await fetch('http://localhost:3000/shift/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shiftData)
        });    
        
        if (response.ok) {
            turnStatus.textContent = "En cola de espera...";
            turnStatus.style.color = "orange";
            crearTurnoBtn.disabled = true;
        } else {
            const result = await response.json();
            alert("Respuesta del servidor: " + JSON.stringify(result));
            turnStatus.textContent = "Error al solicitar turno.";
        }
    } catch (error) {
        console.error(error);
        turnStatus.textContent = "Error de red.";
    }
});

// ==========================================
// 5. INICIAR EXPERIMENTO
// ==========================================
startBtn.addEventListener('click', async () => {
    try {
        startBtn.disabled = true;
        startBtn.textContent = "Iniciando...";
        
        const response = await fetch('http://localhost:3000/exp/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shiftId: shiftId }) 
        });
        
        if (!response.ok) {
            const result = await response.json();
            alert("Respuesta del servidor al iniciar: " + JSON.stringify(result));
            startBtn.disabled = false;
            startBtn.textContent = "INICIAR EXPERIMENTO";
        }
    } catch (error) {
        console.error(error);    
        alert("Error de red: No se pudo conectar con el servidor para iniciar.");
    }
});

// ==========================================
// 6. RESETEAR COLA (ADMIN - TEMPORAL)
// ==========================================
resetQueueBtn.addEventListener('click', async () => {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Se borrarán todos los turnos y las temperaturas registradas.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4757',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar todo',
        cancelButtonText: 'Cancelar',
        background: "#1e293b",
        color: "#f8fafc"
    });
    
    if (confirmacion.isConfirmed) {
        try {
            const response = await fetch('http://localhost:3000/shift/reset', {
                method: 'DELETE', 
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                Swal.fire({
                    title: '¡Reseteado!',
                    text: 'La cola y las temperaturas han sido eliminadas.',
                    icon: 'success',
                    background: "#1e293b",
                    color: "#f8fafc"
                });
                setTimeout(() => window.location.reload(), 2000);
            } else {
                const result = await response.json();
                Swal.fire('Error', result.message || 'No se pudo resetear la base de datos.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error de red', 'No se pudo conectar con el servidor.', 'error');
        }
    }
});