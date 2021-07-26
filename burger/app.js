"use strict"
class Food {
    constructor() {
        this.img = "img/big.png"
        this.hamburger = [
            { id: "h11", title: "big burger", price: 100, calorie: 40 },
            { id: "h12", title: "burger", price: 50, calorie: 20 },

        ];
        this.renderHamburger();
        this.renderTotal();
        this.init();
    }
    renderHamburger() {
        this.hamburger.forEach(item => {
            document.querySelector(".card-flex").insertAdjacentHTML("beforeend", `
            <div class="card" id="${item.id}">
                <div class="img-container">
                    <img src="${this.img}" alt="photo">
                </div>
                <div class="description">
                    <h3 class="burger-title">${item.title}</h3>
                    <p class="burger-calorie">${item.calorie} <span>Cal</span> </p>
                </div>
                <p class="burger-price">&#8381 <span>${item.price}</span></p>
                <div class="topping-container">
                    <h4>TOPPING:</h4>
                    
                </div>
                <div class="total-box">
                    <h2>TOTAL:</h2>
                    <div class="cal-box"><span>&#8381</span><p class="total-price" id="tp${item.id}"> ${item.price}</p></div>
                    <div class="cal-box"><p class="total-calorie" id="tc${item.id}">${item.calorie}  </p><span> Cal</span></div>
                </div>
            </div>
            `);
        });

    }
    renderToping(groupId) {
        const tpg = new Toping();
        let resultStr = ``;
        tpg.toping.forEach(item => {
            resultStr += `
            <div class="topping-flex">
                <div>
                    <input type="checkbox" id="${groupId}${item.id}" group-id="${groupId}">
                    <label for="${groupId}${item.id}">${item.title}</label>
                </div>
                <div class="cal-box">
                    <p class="topping-calorie" id="${groupId}${item.id}">${item.calorie}  </p><span> Cal</span>
                </div>
            </div>
            <div class="price-flex">
                <span>&#8381</span><p class="topping-price${groupId}${item.id}"> ${item.price}</p>
            </div>    
            `;
        });
        return resultStr;
    }
    renderTotal() {
        let tpgEl = document.querySelectorAll(".topping-container");
        tpgEl.forEach(item => {
            let butgerId = item.closest(".card").getAttribute("id")
            item.insertAdjacentHTML("beforeend", this.renderToping(butgerId))
        })
    }

    init() {
        let inputEl = document.querySelectorAll(`input`);
        
        inputEl.forEach(item => {
            item.addEventListener("input", event => {

                let id = event.target.getAttribute("id");
                let topingPrice = +document.querySelector(`.topping-price${id}`).innerText;
                let topingCal = +document.querySelector(`.topping-calorie[id ="${id}"]`).innerText;                
                let burgerId = event.target.closest(".card").getAttribute("id");
                let totalPriceEl = +event.target.closest(".card").querySelector(`#tp${burgerId}`).innerText;
                let totalCalEl = +event.target.closest(".card").querySelector(`#tc${burgerId}`).innerText;                
                
                if (event.target.checked) {
                    event.target.closest(".card").querySelector(`#tp${burgerId}`).innerText = totalPriceEl + topingPrice;
                    event.target.closest(".card").querySelector(`#tc${burgerId}`).innerText = totalCalEl + topingCal;
                    
                } else {
                    event.target.closest(".card").querySelector(`#tp${burgerId}`).innerText = totalPriceEl - topingPrice;
                    event.target.closest(".card").querySelector(`#tc${burgerId}`).innerText = totalCalEl - topingCal;
                }
            });
        });
    }  
}

class Toping {
    constructor() {
        this.toping = [
            { id: "t21", title: "cheese", price: 10, calorie: 20 },
            { id: "t22", title: "salad", price: 20, calorie: 50 },
            { id: "t23", title: "french fries", price: 15, calorie: 10 },
            { id: "t24", title: "flavoring", price: 15, calorie: 0 },
            { id: "t25", title: "mayonnaise", price: 20, calorie: 20 }
        ];

    }
}
let food = new Food();