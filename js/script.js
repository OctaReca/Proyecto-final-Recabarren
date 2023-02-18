const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("./data.json")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((product) => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
        <img src="${product.img}">
        <h3> ${product.nombre}</h3>
        <p class="price">${product.precio} $ </p>
        `;

            shopContent.append(content);

            let comprar = document.createElement("button");
            comprar.className = "comprar"
            comprar.innerText = "Comprar";

            content.append(comprar);

            comprar.addEventListener("click", () => {
                const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
                if (repeat) {
                    carrito.map((prod) => {
                        if (prod.id === product.id) {
                            prod.cantidad++;
                        }
                    });
                } else {
                    carrito.push({
                        id: product.id,
                        img: product.img,
                        nombre: product.nombre,
                        precio: product.precio,
                        cantidad: product.cantidad,
                    })
                    console.log(carrito);
                    carritoCounter();
                    saveLocal();
                }
            });
            comprar.addEventListener("click", () => {
                Toastify({
                    text: `Agregó ${product.nombre}`,
                    duration: 1500,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "Green",
                    },
                }).showToast();
            })
        });
    })

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};