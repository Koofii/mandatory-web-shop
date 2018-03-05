let products = [{
        pname: "Gopfather",
        id: "tshirt",
        price: 20,
        desc: "THE GOPFATHER design by uprising Slav brand WESLAV by Boris",
        url: "https://cdn.shopify.com/s/files/1/1438/5606/products/gopfather_grande.jpg?v=1512061192",
        reviews: []
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

let productDiv = $("#products");
let cartList = {};

$("#logo").hide();
$("#checkout").hide();
$("#cartHtml").hide();

$("#link-logo").click(function(){
    $("#logo").show(500);
});

$("#hide-logo").click(function(){
    $("#logo").hide(500);
});

$("#checkoutPage").click(function(){
    $("#products").hide();
    $("#checkout").show();
    $("#cartHtml").show();
    emptyOverlay()
});

$("#pPage").click(function(){
    $("#checkout").hide();
    $("#products").show();
    $("#cartHtml").hide();
    emptyOverlay();
});
$( "#checkoutForm" ).submit(function( event ) {
    event.preventDefault();
    if (validate()){
        //Submit form
        console.log(event);
    }
});

products.forEach(function(element){
    productDiv.append(createProduct(element)); 
});
//event listener för varje knapp
$("button").on("click", addToCart)
// funktion för att skapa produkt
function createProduct(prod){

    productDiv.append($('<div data-value=' + prod.id + ' class="produkt">').append("<div>" + prod.pname + "</div>")
    .append("<div>" + prod.price + " slavcoins</div>").append("<div>" + prod.desc + "</div>")
    .append('<img src=' + prod.url + '>').append('<button>Add to cart</button>'));

};
// validera fält
function validateField(node){
    if (node.value === ""){
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
        $("#outputForm").html(validera + " is not a number")
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
// Update number cart
function updateNumber(){
    let nr = countKeys(cartList);
    function countKeys(obj){
        return Object.keys(obj)
        .reduce(function(sum, key){
            return sum + parseInt(obj[key]);
        },0 );
    }
    let cartTotal = $("#cartTotal").html(nr);
    
};
// Addera till cart
function addToCart(e){
    e.stopPropagation();
    if($(this).parent().attr("data-value") in cartList){
        cartList[$(this).parent().attr("data-value")] += 1;
    } else {
    cartList[$(this).parent().attr("data-value")] = 1;
    }
    console.log($(this).parent().attr("data-value"));
    console.log(e);
    console.log(cartList);
    update();
};
// update function
function update(){
    //Nina-funktion
    let list = findProduct(cartList, products);
    $("#cartHtml").html(list);
    updateNumber();
    Array.from($(".add"))
    .forEach(item => item.addEventListener("click", function(){
        let id = this.parentElement.getAttribute("data-value");
        
        cartList[id] += 1;

        update()
    }));
    Array.from($(".remove"))
    .forEach(item => item.addEventListener("click", function(){
        let id = this.parentElement.getAttribute("data-value");
        
        if(cartList[id] > 1){
            cartList[id] -= 1;
        } else{
            delete cartList[id]
        }
        update()
    }));
}
function findProduct (cart, products){
    let items = Object.keys(cart).map(key =>
    products.find(product => product.id === key));

    return itemsHtml = items.map(items =>{
        return `
        <div data-value="${items.id}" ><span> ${items.pname} Amount:  ${cart[items.id]} </span><a class="add" href="#">+</a><a class="remove" href="#">-</a></div>
        `
    }).join(" ");
};

$("#products").on("click", ".produkt", showProduct)

let starsHtml = `
    <div class="infosection">
        <div class="stars" id="test">
          <span data-active="true" data-rating-id="1">&#9733;</span>
          <span data-rating-id="2">&#9733;</span>
          <span data-rating-id="3">&#9733;</span>
          <span data-rating-id="4">&#9733;</span>
          <span data-rating-id="5">&#9733;</span>
        </div>
    </div>
`
// Detta är en funktion för att kopiera layouten av en produkt för att sedan visa den targetatde och dölja de andra
function showProduct(){
    console.log(this);
    let overlay = $("#overlay");
    let id = $(this).attr("data-value");
    let copyProduct = $(this).clone();
    $("#products").hide();
    overlay.append(copyProduct)
    
    overlay.append('<div id="reviewsHeader">REVIEWS OF THIS PRODUCT</div>')
    .append('<div class="reviews"><div>')
    .append(starsHtml)
    .append('<form id="formReview"><p>Name:</p> <input id="inputUser"></input><p>Comment: </p><textarea id="inputContent"></textarea><input id ="submitReview" name="submit" type="submit" value="submit"></form>')
    
    $(".stars").on("click", "span", function(e){
        let star = $(e.target);
        let rating = parseInt(star.attr("data-rating-id"));
        star.parent().attr("data-rating-id", rating);
        
    });
    reviews[id].forEach(function(element){
        $(".reviews").append(writeReviews(element));
    });

    $("#submitReview").click(function(e){
        e.preventDefault();
        let user = $("#inputUser").val();
        let comment = $("#inputContent").val();
        let userRating = $("#test").attr("data-rating-id");      

        console.log(user, comment);
        reviews[id].push({User: user, Content: comment, rating: userRating});
        $(".reviews").append('<div class="user">' + user + '<div>').append('<div class="content">' + comment + '<div>');
        console.log(reviews);
    });
    $("#overlay div button").on("click", addToCart);
    starFunction(id);
};
let starFunction = function(id){
    let stars = [
        $("[data-rating-id='1']"),
        $("[data-rating-id='2']"),
        $("[data-rating-id='3']"),
        $("[data-rating-id='4']"),
        $("[data-rating-id='5']")
    ];

    function changeStarRating(rating){
        $(".filled").removeClass("filled");
        for(let i=1; i<=rating; i++){
            stars[i-1].addClass("filled");
        }
    }
    $(".stars").on("click", "span", function(e){
        let star = $(e.target);
        let rating = parseInt(star.attr("data-rating-id"));
        changeStarRating(rating);
        // reviews[id].push({User: "", Content: "", Rating: rating});
        console.log(reviews);
        console.log(rating);
    });
};
// function för att skriva reviews
function writeReviews(rev){
    $(".reviews").append('<div class="user">' + rev.User + '<div>')
    .append('<div class="content">' + rev.Content + '<div>')
};

function emptyOverlay(){
    $("#overlay").empty();
};
// Sparade reviews
let reviews = {
    tshirt: [
        {User: "Koof", Content: "Very nice products", rating: 3},
        {User: "Dmitri", Content: "AChi like this god hut", rating: 3}
    ],
    hat: [
        {User: "Koof", Content: "Very nice products", rating: 3},
        {User: "Dmitri", Content: "AChi like this god hut", rating: 3}
    ],
    pants: [
        {User: "Koof", Content: "Very nice products", rating: 3},
        {User: "Dmitri", Content: "AChi like this god hut", rating: 3}
    ],
    "tshirt-two": [
        {User: "David", Content: "Nice product", rating: 3},
        {User: "TrueGop", Content: "Veri nice", rating: 3}
    ],
    hoodie: [
        {User: "Robert", Content: "Achi am real gopnik, i approve", rating: 3},
        {User: "Simon", Content: "I want to become gopnik", rating: 3}
    ]
};

