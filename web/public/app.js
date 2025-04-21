let productosData = [];
let categoriasData = [];

document.addEventListener("DOMContentLoaded", () => {
  // Cargar productos
  fetch('http://localhost:3000/api/productos')
    .then(res => res.json())
    .then(data => {
      productosData = data;
      cargarCategorias(); // Cargar categorías después de los productos
      mostrarProductos(data);
    });

  // Cargar categorías
  fetch('http://localhost:3000/api/categorias')
    .then(res => res.json())
    .then(data => {
      categoriasData = data;
      cargarCategorias(); // Llamar después de obtener categorías
    });

  // Filtros
  document.getElementById('buscador').addEventListener('input', filtrar);
  document.getElementById('categoria').addEventListener('change', filtrar);
});

function mostrarProductos(productos) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>${producto.descripcion}</p>
      <p><strong>Precio:</strong> $${producto.precio_venta}</p>
      <button onclick="verDetalle(${producto.id_producto})">Ver más</button>
    `;
    contenedor.appendChild(card);
  });
}

function cargarCategorias() {
  if (categoriasData.length === 0) return; // Evitar que falle si aún no se cargaron las categorías

  const select = document.getElementById('categoria');
  // Agregar una opción "Todas las categorías"
  const opcionTodas = document.createElement('option');
  opcionTodas.value = "";
  opcionTodas.textContent = "Todas las categorías";
  select.appendChild(opcionTodas);

  // Crear las opciones de categorías con sus nombres
  categoriasData.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.id_categoria;
    option.textContent = categoria.nombre; // Suponiendo que tienes el campo "nombre" en la categoría
    select.appendChild(option);
  });
}

function filtrar() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const categoria = document.getElementById('categoria').value;

  const filtrados = productosData.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "" || p.id_categoria == categoria;
    return coincideTexto && coincideCategoria;
  });

  mostrarProductos(filtrados);
}

function verDetalle(id) {
  const producto = productosData.find(p => p.id_producto === id);
  alert(`
    Nombre: ${producto.nombre}
    Descripción: ${producto.descripcion}
    Precio: $${producto.precio_venta}
    Stock actual: ${producto.stock_actual}
  `);
}
