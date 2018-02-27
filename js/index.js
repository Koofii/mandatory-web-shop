let products = [{
        pname: "Gopfather",
        id: "tshirt",
        price: 20,
        desc: "THE GOPFATHER design by uprising Slav brand WESLAV by Boris",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/gopfather_grande.jpg?v=1512061192"
    },

    {   
        pname: "HANDMADE USHANKA",
        id: "hat",
        price: 29,
        desc: "THIRD EDITION WESLAV USHANKA! LIMITED!",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_1119_grande.jpg?v=1500552123"
    },

    {
        pname: "WESLAV Squatpants",
        id: "pants",
        price: 30,
        desc: "Top quality for your Slav needs.",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_3878_2_grande.jpg?v=1507814547"
    },
    {
        pname:"И is for ИДИ НАХУЙ",
        id: "tshirt-two",
        price: 20,
        desc: "Blyatiful!",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_1180_fdbfb2ad-ef95-4746-9687-c1d909bf0e41_grande.jpg?v=1508833808"
    },
    {
        pname: "Squatnik Suit Hoodie",
        id: "hoodie",
        price: 55,
        desc: "FIRST EVER FULLY CUSTOMIZED WESLAV SQUATNIK SUIT",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_4606_grande.jpg?v=1517611798"
    }
];

let productDiv = document.getElementById("products");

let cartList = {};

products.forEach(function(element){
    productDiv.appendChild(
        createProduct(element)
    );
})
// funktion för att skapa div
function createDiv(cls, text){
    let div = document.createElement("div");
    div.setAttribute("class", cls);
    div.innerText = text;
    return div;
};

// funktion för skapa bild
function createImage (urlImage){
    let img = document.createElement("img");
    img.setAttribute("src", urlImage);
    return img;
};

// function för att skapa button till varje produkt.
function createButton (id){
    let btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.innerText = "Add to cart";
    btn.addEventListener("click", addToCart);
    
    return btn;
};

// funktion för att skapa produkt
function createProduct(product){
    let div = createDiv("produkt", null);
    div.appendChild(createDiv("title", product.pname));
    div.appendChild(createDiv("Price", product.price + " slav coins"));
    div.appendChild(createDiv("Desc", product.desc));
    div.appendChild(createImage(product.url));
    div.appendChild(createButton(product.id));

    return div;
};

function findProduct (cart, products){
    let items = Object.keys(cart).map(key =>
    products.find(product => product.id === key));

    return itemsHtml = items.map(items =>{
        return `
        <div data-value="${items.id}" ><span> ${items.pname} Amount:  ${cart[items.id]} </span><a class="add" href="#">+</a><a class="remove" href="#">-</a></div>
        `
    }).join(" ");
}

// validera fält
function validateField(node){
    if (node.value == ""){
        node.style.border = "2px solid red";
        return false;
    } else {
        node.style.border = "2px solid black";
        return true;
    }
};

function validateNumber(validera){
    let x = document.forms["myForm"][validera].value;
    if (isNaN(x)){
        document.getElementById("outputForm").innerHTML = validera + " is not a number"

    }
}; 
// validation of form
function validate(){
    validateField(document.myForm.FirstName);
    validateField(document.myForm.LastName);
    validateField(document.myForm.Email);
    validateField(document.myForm.StreetAdress);
    validateField(document.myForm.ZipCode);
    validateNumber("ZipCode");
    validateNumber("Phone" );
    validateField(document.myForm.City);
};
// Update number cart
function updateNumber(){
    let nr = countKeys(cartList);
    function countKeys(obj){
        return Object.keys(obj)
        .reduce(function(sum, key){
            return sum + parseInt(obj[key]);
        },0 );
    }
    let cartTotal = document.getElementById("cartTotal").innerHTML = nr;
}
// Addera till cart
function addToCart(){
    if(this.id in cartList){
        cartList[this.id] += 1;
    } else {
    cartList[this.id] = 1;
    }
    console.log(cartList);
    update();
};
// Update function
function update(){
    //Nina-funktion
    let list = findProduct(cartList, products);
    document.getElementById("cartHtml").innerHTML = list;
    updateNumber();
    Array.from(document.getElementsByClassName("add"))
    .forEach(item => item.addEventListener("click", function(){
        console.log(this.parentElement);
        let id = this.parentElement.getAttribute("data-value");
        
        cartList[id] += 1;

        update()
    }));
    Array.from(document.getElementsByClassName("remove"))
    .forEach(item => item.addEventListener("click", function(){
        console.log(this.parentElement);
        let id = this.parentElement.getAttribute("data-value");
        
        if(cartList[id] > 1){
            cartList[id] -= 1;
        } else{
            delete cartList[id]
        }

        update()
    }));
}

$("#logo").hide()
$("#link-logo").click(function(){
    $("#logo").show(500);
})
$("#hide-logo").click(function(){
    $("#logo").hide(500);
})

// $("#checkoutPage").click(function(){
//     $("#products").hide(500);
//     $("#checkout").show(500);
// });
// $("#pPage").click(function(){
//     $("#checkout").hide(500);
//     $("#products").show(500);
// });



// För att switcha mellan "sidorna"
document.getElementById("checkout").style.display = "none";
document.getElementById("cartHtml").style.display = "none";


document.getElementById("pPage").addEventListener("click", event =>{
    document.getElementById("checkout").style.display = "none";
    document.getElementById("products").style.display = "block";
    document.getElementById("cartHtml").style.display = "none";
});

document.getElementById("checkoutPage").addEventListener("click", event =>{
    document.getElementById("products").style.display = "none";
    document.getElementById("checkout").style.display = "flex";
    document.getElementById("cartHtml").style.display = "block";
});

// submit even där vi validatear
document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
    if (validate()){
        //Submit form
        console.log(e);
    }
});


