const products = [
    { id: 1, title: 'Notebook', price: 2000, imgURL: "img/1.png" },
    { id: 2, title: 'Mouse', price: 20, imgURL: "img/2.png" },
    { id: 3, title: 'Keyboard', price: 200, imgURL: "img/3.png" },
    { id: 4, title: 'Gamepad', price: 50, imgURL: "img/4.png" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <div class="img-container">
                    <img src="${product.imgURL}" alt="photo">
                </div>    
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {  
    list.map(item => document.querySelector(".products").insertAdjacentHTML("beforeend", renderProduct(item)));   
};

renderPage(products);
