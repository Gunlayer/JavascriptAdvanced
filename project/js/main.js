class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.getGoodSum();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }
    getGoodSum() {
        let sum = 0;
        this.goods.forEach(item => {
            sum += item.price;
        });
        //alert(sum);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div id="${this.id}" class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
class Cart {
    constructor() {
        this.cartHandler();
        this.showCart();        
    }   
    cartHandler() {
        let basket = {}
        let buyBtn = document.querySelectorAll(".buy-btn");
        buyBtn.forEach(item => {
            item.addEventListener("click", event => {                
                let cart = new CartItem().getCartItem(event);               
                
                if (!(cart.title in basket)) {
                    basket[cart.title] = 1;                    
                    this.renderCartList(cart, basket[cart.title], cart.id);                   
                } else {
                    basket[cart.title]++;
                    document.querySelector (`.cart-item[id="${cart.id}"]`).closest(".cart-item").querySelector("span").innerText = basket[cart.title]+"x";
                    document.querySelector (`.cart-item[id="${cart.id}"]`).closest(".cart-item").querySelector("p").innerText = this.cartSum(basket[cart.title], cart.price);
                }
                this.removeFromCart(basket);                
            });
        });
    }
    removeFromCart (basket) {
        let rmvBtn = document.querySelectorAll(".remove");
        rmvBtn.forEach (item =>{
            item.addEventListener("click", event => { 
                let h3 = event.target.closest(".cart-item").querySelector (".cart-title").innerText;               
                event.target.closest(".cart-item").remove();
                delete basket[h3];                                        
            });
        });
    }
    cartSum (quantity, price) {
        let sum = 0;
        return sum = quantity*price;
    }
    renderCartList(card, quant, id) {
        document.querySelector(".cart").insertAdjacentHTML("beforeend", `            
                <div id="${id}" class="cart-item">
                <h3 class="cart-title">${card.title}</h3>
                <span>${quant}x</span>
                <P>${card.price}</P>
                <button class="remove" type="button">X</button>
            </div>`);
    }
    showCart() {
        document.querySelector(".btn-cart").insertAdjacentHTML("afterend", `<div class="cart">                   
        </div>`);
        document.querySelector(".btn-cart").addEventListener("click", event => {            
            event.target.closest("header").querySelector(".cart").classList.toggle("show");
        })
    }
}
class CartItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
        
    }
    getCartItem(event) {
        const productTitle = event.target.closest(".product-item").querySelector("h3").innerText;
        const productPrice = event.target.closest(".product-item").querySelector("p").innerText;
        const productId = event.target.closest(".product-item").getAttribute("id");
        const cartGood = new CartItem(productTitle, productPrice, productId);
        return cartGood;
    }
}

let list = new ProductList();
let cartList = new Cart();






//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);