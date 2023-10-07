// "use strict";

let product = document.querySelectorAll('.product');
let preview = document.querySelectorAll('.preview');
let productsPreview = document.querySelector(".products-preview");
let closes = document.querySelectorAll(".fa-times");
let cartCloses = document.querySelectorAll(".cart-box");
let closeOpenLeft = document.querySelector(".closeOpenLeft");
let cartBox = document.querySelector(".cartBox");
let shopping = document.querySelector(".fa-bag-shopping");


for(let i = 0; i < product.length; i++) {
    product[i].onclick = () => {
        productsPreview.style.display = "flex";
        for(let j = 0; j < preview.length; j++) {
            if(i == j){
                preview[j].classList.add("active");
            }
        }
    }
}

for(let i = 0; i < closes.length; i++) {
    closes[i].onclick = () => {
        preview[i].classList.remove("active");
        productsPreview.style.display = "none";
    }
}


// open 
shopping.onclick = () => {
    cartBox.classList.add("active");
}

// close 
closeOpenLeft.onclick = () => {
    cartBox.classList.remove("active");
}


ready()
function ready() {
    let cartRemove = document.querySelectorAll(".fa-trash");
    let cartQuantity = document.querySelectorAll(".cart-quantity");
    let addCart = document.querySelectorAll(".cart");
    for(let i = 0; i < cartRemove.length; i++){
        cartRemove[i].addEventListener("click", cartRemoveItems);
    }
    for(let i = 0; i < cartQuantity.length; i++){
        cartQuantity[i].addEventListener("change", cartQuantityChanged);
    }
    for(let i = 0; i < addCart.length; i++){
        addCart[i].addEventListener("click", addToCart);
    }
}

function addToCart(e) {
    let button = e.target;
    let shoppingCart = button.parentElement.parentElement;
    let image = shoppingCart.querySelectorAll(".image")[0].src;
    let title = shoppingCart.querySelectorAll(".preview_title")[0].textContent;
    let price = shoppingCart.querySelectorAll(".price")[0].textContent;
    addToCartItems(image, title, price);
    updatetotal()
}

function addToCartItems(image, title, price){
    let cartProductTitle = document.querySelectorAll(".cart-product-title")
    let cartBox = document.createElement("div");
    let cartContent = document.querySelector(".cart-content");
    cartBox.classList.add("cart-box");
    for(let i = 0; i < cartProductTitle.length; i++){
        if(cartProductTitle[i].textContent == title){
            alert("Already added to card this product❗")
            return
        }
    }
    cartBox.innerHTML = `
    <img src="${image}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash"></i>`;
    cartContent.append(cartBox);
    cartBox.querySelectorAll(".fa-trash")[0].addEventListener("click", cartRemoveItems);
    cartBox.querySelectorAll(".cart-quantity")[0].addEventListener("change", cartQuantityChanged);
}

function cartQuantityChanged(e){
    let input = e.target;
    if(isNaN(input.value) || input.value < 1){
        input.value = 1;
    }
    updatetotal()
}

function cartRemoveItems(e) {
    let target = e.target;
    target.parentElement.remove();
    updatetotal()
}

function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box")
    let total = 0
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName("cart-price")[0]
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("total-price")[0].innerText = "$" + total
    let btnCard = document.querySelector(".btn-buy")
    btnCard.addEventListener("click", buttonClickItem)
}


function buttonClickItem() {
    alert("Your order has been sent✔")

}