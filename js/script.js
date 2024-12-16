const products = [
    {
        id: 1,
        nombre: "Papercraft",
        description: "Un proyecto creativo con papel para construir figuras tridimensionales. Yo solo quiero ser minero, y romper un pico de hierro.",
        stock: 10,
        precio: 5.99,
        descuento: 0.1 // 10% de descuento
    },
    {
        id: 2,
        nombre: "Auto eléctrico de cartón",
        description: "Un vehículo funcional hecho con cartón y un motor eléctrico. ¿Todo bien? ¿Todo correcto? Y yo que me alegro.",
        stock: 5,
        precio: 15.99,
        descuento: 0.15 // 15% de descuento
    },
    {
        id: 3,
        nombre: "Hardware de PC",
        description: "Componentes básicos de hardware para montar un sistema informático simple. Te recuerdo que esta es Mi Primera Chamba.",
        stock: 7,
        precio: 49.99,
        descuento: 0.2 // 20% de descuento
    },
    {
        id: 4,
        nombre: "Brazo hidráulico con jeringas",
        description: "Un brazo robótico accionado por un sistema hidráulico con jeringas. Muy buenas a todos guapísimos.",
        stock: 4,
        precio: 25.49,
        descuento: 0.1 // 10% de descuento
    },
    {
        id: 5,
        nombre: "Brazo robot con servos",
        description: "Un brazo robótico controlado por servomotores. ¿a que mola?",
        stock: 3,
        precio: 75.00,
        descuento: 0.05 // 5% de descuento
    },
    {
        id: 6,
        nombre: "Auto con brazo robot",
        description: "Un vehículo motorizado equipado con un brazo robótico funcional. Y recuerda, cada vez que agregas un item, un hater llora.",
        stock: 2,
        precio: 100.00,
        descuento: 0.2 // 20% de descuento
    }
];

function actualizaDescripcion(id, index) {
    //let paragraph = "Esto es una tremenda explicación sobre un tema re importante que tiene que ver con el espacio, el tiempo, la vida y todo lo demás. La respuesta es 34."
    let paragraph = document.getElementById(id);
    paragraph.innerHTML = "Esto es una tremenda explicación sobre un tema re importante que tiene que ver con el espacio, el tiempo, la vida y todo lo demás. La respuesta es 34. <br>" + products[index].description
    paragraph.innerHTML += '<div class="producto">'
    paragraph.innerHTML += '   <span>' + products[index].nombre + ' - u$d' + products[index].precio + '</span><br>'
    paragraph.innerHTML += '   <span>Stock: <span id=\"stock-' + index + '\">' + products[index].stock + '</span></span><br>'
    paragraph.innerHTML += '<button onclick=\"agregarAlCarrito(\'' + products[index].nombre + '\', ' + products[index].precio + ', \'' + index + '\')\">Agregar</button>'
    paragraph.innerHTML += '</div>'

    //paragraph.parentNode()


}

// Función para generar el array de productos y mostrarlo en consola
function generateProductsArray() {
    

    
}

// Llamar a la función para generar y mostrar los productos
generateProductsArray();
console.log(products);

// Constante para el IVA
const IVA = 0.21;  // 21% de IVA

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

function agregarAlCarrito(nombre, precio, productoKey) {
    // Obtener el producto específico
    const producto = products[productoKey];

    // Validar stock
    if (producto.stock <= 0) {
        alert('¡Producto agotado!');
        return;
    }

    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Agregar nuevo producto
    carrito.push({ 
        nombre: producto.nombre, 
        precio: producto.precio,
        productoKey: productoKey
    });
    
    // Reducir stock
    producto.stock--;
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock;
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar vista del carrito
    renderizarCarrito();
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const descuentoCarrito = document.getElementById('descuento-carrito');
    const ivaCarrito = document.getElementById('iva-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar lista anterior
    listaCarrito.innerHTML = '';
    
    // Totales iniciales
    let subtotal = 0;
    let descuentoTotal = 0;
    
    // Renderizar cada producto
    carrito.forEach((producto, index) => {
        const productoInfo = products[producto.productoKey];
        const li = document.createElement('li');
        
        // Calcular descuento individual
        const descuentoProducto = productoInfo.descuento * producto.precio;
        const precioConDescuento = producto.precio - descuentoProducto;
        
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
            ${productoInfo.descuento > 0 ? 
                `<span class="descuento">(Desc. ${(productoInfo.descuento * 100).toFixed(0)}%: 
                -$${descuentoProducto.toFixed(2)})</span>` 
                : ''}
        `;
        
        // Botón para eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
        
        // Sumar al subtotal y descuentos
        subtotal += producto.precio;
        descuentoTotal += descuentoProducto;
    });
    
    // Calcular IVA
    const ivaTotal = (subtotal - descuentoTotal) * IVA;
    const total = subtotal - descuentoTotal + ivaTotal;
    
    // Actualizar totales
    subtotalCarrito.textContent = subtotal.toFixed(2);
    descuentoCarrito.textContent = descuentoTotal.toFixed(2);
    ivaCarrito.textContent = ivaTotal.toFixed(2);
    totalCarrito.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Recuperar el producto para devolver stock
    const producto = products[carrito[index].productoKey];
    producto.stock++;
    document.getElementById(`stock-${carrito[index].productoKey}`).textContent = producto.stock;
    
    // Eliminar producto por índice
    carrito.splice(index, 1);
    
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Renderizar de nuevo
    renderizarCarrito();
}

function vaciarCarrito() {
    // Restaurar stock de todos los productos
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const producto = products[item.productoKey];
        producto.stock++;
        document.getElementById(`stock-${item.productoKey}`).textContent = producto.stock;
    });
    
    // Limpiar localStorage
    localStorage.removeItem('carrito');
    
    // Renderizar
    renderizarCarrito();
}

function cargarCarrito() {
    // Cargar carrito al iniciar la página
    renderizarCarrito();
    cerrarCheckout();
}

// Funciones de Checkout
function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Validar que hay productos en el carrito
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Mostrar modal de checkout
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';
    
    // Actualizar totales en el modal
    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    const descuento = parseFloat(document.getElementById('descuento-carrito').textContent);
    const iva = parseFloat(document.getElementById('iva-carrito').textContent);
    const total = parseFloat(document.getElementById('total-carrito').textContent);
    
    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-descuento').textContent = descuento.toFixed(2);
    document.getElementById('modal-iva').textContent = iva.toFixed(2);
    document.getElementById('modal-total').textContent = total.toFixed(2);
}

function realizarCompra() {
    // Simular compra
    alert('¡Compra realizada con éxito!');
    toggleFloatingDiv(event);
    // Vaciar carrito
    localStorage.removeItem('carrito');
    
    // Cerrar modal
    cerrarCheckout();
    
    // Renderizar carrito vacío
    renderizarCarrito();
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

function toggleFloatingDiv(event) {
    event.preventDefault();
    const floatingDiv = document.getElementById("floatingDiv");
    const backdrop = document.getElementById("backdrop");

    if (floatingDiv.classList.contains("show")) {
        floatingDiv.classList.remove("show");
        backdrop.classList.remove("show");
    } else {
        floatingDiv.classList.add("show");
        backdrop.classList.add("show");
    }
}