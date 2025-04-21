document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCategorias();
    cargarProveedores();
    cargarUsuarios();
});

function cargarProductos() {
    fetch('http://localhost:3000/api/productos')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('lista-productos');
            lista.innerHTML = '';
            data.forEach(producto => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${producto.nombre}</p>
                    <button onclick="editarProducto(${producto.id_producto})">Editar</button>
                    <button onclick="eliminarProducto(${producto.id_producto})">Eliminar</button>
                `;
                lista.appendChild(div);
            });
        });
}

function cargarCategorias() {
    fetch('http://localhost:3000/api/categorias')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('lista-categorias');
            lista.innerHTML = '';
            data.forEach(categoria => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${categoria.nombre}</p>
                    <button onclick="editarCategoria(${categoria.id_categoria})">Editar</button>
                    <button onclick="eliminarCategoria(${categoria.id_categoria})">Eliminar</button>
                `;
                lista.appendChild(div);
            });
        });
}

function cargarProveedores() {
    fetch('http://localhost:3000/api/proveedores')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('lista-proveedores');
            lista.innerHTML = '';
            data.forEach(proveedor => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${proveedor.nombre}</p>
                    <button onclick="editarProveedor(${proveedor.id_proveedor})">Editar</button>
                    <button onclick="eliminarProveedor(${proveedor.id_proveedor})">Eliminar</button>
                `;
                lista.appendChild(div);
            });
        });
}

function cargarUsuarios() {
    fetch('http://localhost:3000/api/usuarios')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('lista-usuarios');
            lista.innerHTML = '';
            data.forEach(usuario => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${usuario.nombre} (${usuario.email})</p>
                    <button onclick="editarUsuario(${usuario.id_usuario})">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id_usuario})">Eliminar</button>
                `;
                lista.appendChild(div);
            });
        });
}

// Funciones de agregar (puedes expandirlas más según sea necesario)

function mostrarFormularioProducto() {
    document.getElementById('producto-form').style.display = 'block';
}

function ocultarFormularioProducto() {
    document.getElementById('producto-form').style.display = 'none';
}

function guardarProducto() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio_venta = document.getElementById('precio_venta').value;

    const producto = { nombre, descripcion, precio_venta };

    fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data => {
        cargarProductos();
        ocultarFormularioProducto();
    });
}

// Similar para las otras funciones (categorías, proveedores, usuarios)
