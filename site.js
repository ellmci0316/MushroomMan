let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {id: 1, image: "Champinjon.jpg",name: "Champinjoner", price: 10},
    {id: 2, image: "Kantareller.png",name: "Kantareller", price: 28},
    {id: 3, image: "Karljohan.webp",name: "Karljohansvampar", price: 36},
    {id: 4, image: "Ostronskivling.jpg",name: "Ostronskivling", price: 21},
    {id: 4, image: "Tryffel.jpeg",name: "Tryffel", price: 1100},
    {id: 5, image: "Shiitake.webp",name: "Shiitake", price: 29},
    {id: 6, image: "Enoki.jpg",name: "Enoki", price: 8},
    {id: 7, image: "Portabello.jpg",name: "Portabello", price: 14},
    {id: 8, image: "Shimeji.avif",name: "Shimeji", price: 13},
    {id: 9, image: "Kejsarhatt.jpg",name: "Kejsarhatt", price: 33},
    {id: 10, image: "Citronlemskivling.jpg",name: "Citronslemskivling", price: 38},
    {id: 11, image: "Olivvaxskivling.jpg",name: "Olivvaxskivling", price: 44},
    {id: 12, image: "Fotsvamp.jpg", name: "Fotsvamp", price: 0}
];
let listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        list.appendChild(newDiv);
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/images/${value.image}"/>
            <div class"title">${value.name}</div>
            <div class"price">${value.price.toLocaleString()}kr/100g</div>
            <button class="btn btn-warning" onclick="addToCart(${key})">Lägg till i Varukorg</button>
        `;
    })
}
initApp();
function addToCart(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;
        listCards[key].price = listCards[key].quantity * products[key].price;
    }
    reloadCart();
}
function reloadCart(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + (value.price * value.quantity);
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"></div>
                <div>${value.name}</div>
                <div>${value.quantity}</div>
                <div>
                <button class="btn btn-danger"onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button class="btn btn-success" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity <= 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCart();
}