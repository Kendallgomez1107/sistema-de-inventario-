// login.js
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Realizamos la solicitud de autenticación
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Si el login es exitoso, redirigimos según el rol
            if (data.role === 'admin') {
                window.location.href = 'admin.html';  // Página de administración
            } else {
                window.location.href = 'index.html';  // Página pública
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con la autenticación');
    });
});
