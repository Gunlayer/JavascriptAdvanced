const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Cart {
    constructor() {
        this.cartList = [];
        this.showCart();
        this.getCartList(this.cartList)
        .then(data=>{
            this.cartList=data.contents;   
            this.renderCart();
            this.calcTotal(".cart-total-price", data.amount);
            this.calcTotal(".cart-total-qnt", data.countGoods);
        })
        
    }
    getCartList() {
        return fetch(`${API}/getBasket.json`)
            .then(string => string.json())            
            .catch(error => console.log(error));
    }
    renderCart(){
        const cartEl = document.querySelector(".cart-total");
        
        this.cartList.forEach(item => {
            const good = new CartItem(item);
            cartEl.insertAdjacentHTML("beforebegin", good.cartItemRender());
            
        });
    }
    calcTotal (className, total){
        document.querySelector(className).innerText = total;
        
    }
    showCart() {
        let cartBtn = document.querySelector(".btn-cart");
        cartBtn.addEventListener("click", event => {
            event.target.closest("header").querySelector(".cart").classList.toggle("show");
        })        
    }

}
class CartItem {
    constructor(cartList) {
        this.id = cartList.id;
        this.title = cartList.product_name;
        this.price = cartList.price;
        this.quantity = cartList.quantity;
    }
    cartItemRender() {
        return `<div class="cart-item" id="c${this.id}">
        <div class="cart-item-flex">
            <h3 class="cart-item-title">${this.title}</h3>
        </div>
        <div class="cart-item-flex">
            <p class="cart-item-quantity">${this.quantity}</p>
            <p class="cart-item-price">${this.price}</p>
        </div>
        <div class="cart-item-flex">
            <button class="remove">X</button>
        </div>
    </div>`        

    }
}

let list = new ProductsList();
let cart = new Cart();

