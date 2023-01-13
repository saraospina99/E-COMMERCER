window.addEventListener("load", function () {
    const load = document.querySelector(".load");

    setTimeout(function () {
        load.style.display = "none";
    }, 3000);
});
// menu hamburguesa inicio
const toggleMenuElement = document.querySelector("#toggle-menu");
const mainMenuElement = document.querySelector("#main-menu");

toggleMenuElement.addEventListener("click", () => {
    mainMenuElement.classList.toggle("main-menu--show");
});
// menu hamburguesa final

// ..................CARRITO INICIO...............
let cloths = [
    {
        id: "0",
        name: "Hoodies",
        price: 14,
        stock: 10,
        urlImage: "./assets/img/featured1.png",
        classFilter: "Hoodies",
    },
    {
        id: "1",
        name: "Shirts",
        price: 24,
        stock: 15,
        urlImage: "./assets/img/featured2.png",
        classFilter: "Shirts",
    },
    {
        id: "2",
        name: "Sweatshirts",
        price: 24,
        stock: 20,
        urlImage: "./assets/img/featured3.png",
        classFilter: "Sweatshirts",
    },
];

const iconCart = document.querySelector(".bx-cart-add");
const contentCart = document.querySelector(".contentCar");

iconCart.addEventListener("click", function () {
    contentCart.classList.toggle("contentCar__show");
});

const products = document.querySelector(".products_card_container");
const cartProducts = document.querySelector(".carProducts");
const carTotal = document.querySelector(".carTotal");
const amountCart = document.querySelector(".amountCart");
const btnRefresh = document.querySelector(".btn__refresh");

cloths = JSON.parse(localStorage.getItem("cloths")) || cloths;
let objCart = JSON.parse(localStorage.getItem("objCart")) || {};

function verifyAddToCart(findProduct, id) {
    if (findProduct.stock === objCart[id].amount) {
        alert("No tengo mas en stock");
    } else {
        objCart[id].amount++;
    }
}

function seacrProduct(id) {
    return cloths.find(function (food) {
        return food.id === id;
    });
}

function deleteProduct(id) {
    const res = confirm("Seguro quieres eliminar este producto");
    if (res) delete objCart[id];
}

function printAmountCart() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    if (!arrayCart.length) {
        amountCart.style.display = "none";
        return;
    }

    amountCart.style.display = "inline-block";

    arrayCart.forEach(function ({ amount }) {
        sum += amount;
    });

    amountCart.textContent = sum;
}

function printTotalCart() {
    const arrayCart = Object.values(objCart);

    if (!arrayCart.length) {
        carTotal.innerHTML = `
            <h3>No hay nada, a comprar!!!</h3>
        `;

        return;
    }

    let sum = 0;

    arrayCart.forEach(function ({ amount, price }) {
        sum += amount * price;
    });

    carTotal.innerHTML = `
            <h3>Total a pagar ${sum}</h3>
            <button class="btn btn__buy">Comprar</button>
        `;
}

function printProductsInCart() {
    let html = "";

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function ({ id, name, price, urlImage, amount }) {
        html += `
            <div class="product">
                <div class="product__img">
                    <img src="${urlImage}" alt="${name}" />
                </div>

                <div class="product__info">
                    <p>${name}</p>
                    <span class="price"> $${price}.00 c/u</span>
                    <p>Cant: ${amount}</p>
                </div>

                <div class="product__options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash' ></i>
                </div>
            </div>
        `;
    });

    cartProducts.innerHTML = html;
}

function printProducts() {
    let html = "";

    // cloths.forEach(function (cloth){
    //     html += `
    //         <div class="product">
    //             <div class="product__img">
    //                 <img src="${cloth.urlImage}" alt="${cloth.name}"/>
    //             </div>
    //             <div class"product__info">
    //                 <p>Nombre: ${cloth.name}</p>
    //                 <p>Precio: ${cloth.price}</p>
    //                 <p>Stock: ${cloth.stock}</p>
    //             </div>
    //             <div class="product__options" id="${cloth.id}">
    //                 <button class="btn btn__add">+</i></button>
    //             </div>
    //         </div>
    //     `
    // })

    cloths.forEach(function ({
        id,
        name,
        price,
        stock,
        urlImage,
        classFilter,
    }) {
        const typeButton = stock
            ? '<button class="btn btn__add">+</button>'
            : '<button class="btn btn__NA">N / A</button>';

        html += `
            <div class="product ${classFilter}">
                <div class="product__img">
                    <img src="${urlImage}" alt="${name}" />
                </div>
                <div class="data_products">
                        <span class="price">$${price}.00</span>
                        <span class="stock">| Stock: ${stock}</span>
                        <h3>${name}</h3>
                </div>

                <div class="product__options" id="${id}">
                    ${typeButton}
                </div>
            </div>
        `;
    });

    products.innerHTML = html;
}
printProducts();

products.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__add")) {
        //         // obtenemos el id
        const id = e.target.parentElement.id;

        //         // vamos a obtener el producto por id
        let findProduct = seacrProduct(id);

        if (findProduct.stock === 0) return alert("Ya no tengo mas");

        if (objCart[id]) {
            // logica para el carrito
            verifyAddToCart(findProduct, id);
        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1,
            };
        }

        localStorage.setItem("objCart", JSON.stringify(objCart));
    }

    printProductsInCart();
    printTotalCart();
    printAmountCart();
});

cartProducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;

        if (objCart[id].amount === 1) {
            deleteProduct(id);
        } else {
            objCart[id].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;
        let findProduct = seacrProduct(id);
        verifyAddToCart(findProduct, id);
    }

    if (e.target.classList.contains("bx-trash")) {
        const id = e.target.parentElement.id;
        deleteProduct(id);
    }

    localStorage.setItem("objCart", JSON.stringify(objCart));

    printProductsInCart();
    printTotalCart();
    printAmountCart();
});

carTotal.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__buy")) {
        const res = confirm("Seguro quieres hacer la compra");

        if (!res) return;

        let newArray = [];

        cloths.forEach(function (food) {
            if (food.id === objCart[food.id]?.id) {
                newArray.push({
                    ...food,
                    stock: food.stock - objCart[food.id].amount,
                });
            } else {
                newArray.push(food);
            }
        });

        cloths = newArray;
        objCart = {};

        localStorage.setItem("objCart", JSON.stringify(objCart));
        localStorage.setItem("cloths", JSON.stringify(cloths));

        printProducts();
        printProductsInCart();
        printTotalCart();
        printAmountCart();
    }
});

btnRefresh.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
});

printProducts();
printTotalCart();
printAmountCart();
printProductsInCart();
// ..............................CARRITO FINAL...........

// ---------------------------------- S A R A -------------------------------

var mixer = mixitup(".products_card_container", {
    selectors: {
        target: ".product",
    },
    animation: {
        duration: 700,
    },
});

console.log(mixer);
