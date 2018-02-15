let products = [{
        pname: "Gopfather",
        price: 20,
        desc: "THE GOPFATHER design by uprising Slav brand WESLAV by Boris",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/gopfather_grande.jpg?v=1512061192"
    },

    {   
        pname: "HANDMADE USHANKA",
        price: 29,
        desc: "THIRD EDITION WESLAV USHANKA! LIMITED!",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_1119_grande.jpg?v=1500552123"
    },

    {
        pname: "WESLAV Squatpants",
        price: 30,
        desc: "Top quality for your Slav needs.",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_3878_2_grande.jpg?v=1507814547"
    },
    {
        pname:"И is for ИДИ НАХУЙ",
        price: 20,
        desc: "Blyatiful!",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_1180_fdbfb2ad-ef95-4746-9687-c1d909bf0e41_grande.jpg?v=1508833808"
    },
    {
        pname: "Squatnik Suit Hoodie",
        price: 55,
        desc: "FIRST EVER FULLY CUSTOMIZED WESLAV SQUATNIK SUIT",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/IMG_4606_grande.jpg?v=1517611798"
    }
]

let prod = {
    pname: "Gopfather",
    price: 20,
    desc: "THE GOPFATHER design by uprising Slav brand WESLAV by Boris",
    url: "https://cdn.shopify.com/s/files/1/1438/5606/products/gopfather_grande.jpg?v=1512061192"
};


let productDiv = document.getElementById("products");

products.forEach(function(element){
    productDiv.appendChild(
        createProduct(element)
    );
});


function createDiv(cls, text){
    let div = document.createElement("div");
    div.setAttribute("class", cls);
    div.innerText = text;
    return div;
}
function createImage (urlImage){
    let img = document.createElement("img");
    img.setAttribute("src", urlImage);
    return img;
}

function createProduct(product){
    let div = createDiv("produkt", null);
    div.appendChild(createDiv("title", product.pname));
    div.appendChild(createDiv("Price", product.price + " slav coins"));
    div.appendChild(createDiv("Desc", product.desc));
    div.appendChild(createImage(product.url));
    
    

    return div;
}

document.getElementById("checkout").style.display = "none";

document.getElementById("pPage").addEventListener("click", event =>{
    document.getElementById("checkout").style.display = "none";
    document.getElementById("products").style.display = "block";
});

document.getElementById("checkoutPage").addEventListener("click", event =>{
    document.getElementById("products").style.display = "none";
    document.getElementById("checkout").style.display = "flex";
});


document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
    if (validate()){
        //Submit form
    }
})
function validate(){
    if (document.myForm.FirstName.value == ""){
        document.myForm.FirstName.style.border = "2px solid red";
        return false;
    }
    if (document.myForm.LastName.value == ""){
        document.myForm.LastName.style.border = "2px solid red";
        return false;
    }
    if (document.myForm.Email.value == ""){
        document.myForm.Email.style.border = "2px solid red";
        return false;
    }
    if (document.myForm.StreetAdress.value == ""){
        document.myForm.StreetAdress.style.border = "2px solid red";
        return false;
    }
    if (document.myForm.ZipCode.value == ""){
        document.myForm.ZipCode.style.border = "2px solid red";
        return false;
    }
    if (document.myForm.City.value == ""){
        document.myForm.City.style.border = "2px solid red";
        return false;
    }
    else{
        document.myForm.FirstName.style.border = "1px solid black"
        return true;
    }
}