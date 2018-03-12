let productDiv = $("#products");
let cartList = {};
fetch("http://demo.edument.se/api/products")
let products;
let reviews;
// För att hämta reviews
fetch("http://demo.edument.se/api/reviews")
    .then(response => response.json())
    .then(data => reviews = data)

// För att hämta products
fetch("http://demo.edument.se/api/products")
    .then(response => response.json())
    .then(data => products = data)
    .then(function(){
        products.forEach(function(element){
            productDiv.append(createProduct(element)); 
        });
        $("button").on("click", addToCart)
    });
    
$("#checkout").hide();
$("#cartHtml").hide();

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
$( "#checkoutForm" ).submit(function(event) {
    event.preventDefault();
    let firstName = $('[name="FirstName"]').val();
    let lastName = $('[name="LastName"]').val();
    let email = $('[name="Email"]').val();
    let Phone = $('[name="Phone"]').val();
    let streetAddress = $('[name="StreetAddress"]').val();
    let zipCode = $('[name="ZipCode"]').val();
    let city = $('[name="City"]').val();
    let comment = $('[name="Comment"]').val();

    const required = ["FirstName", "LastName", "Email", "StreetAddress", "ZipCode", "City"];
    const requiredFields = Array.from($("input")).filter(x => required.indexOf(x.name) >= 0);

    if (!validate()){
        requiredFields.forEach(x => validateField(x));
    } else {
        //submit form!
    };

    function validate(){
        return requiredFields.every(x => validateField(x));
    };
    let orderL = collectOrder();
    let order = {
        "Firstname": firstName,
        "LastName": lastName,
        "Email": email,
        "Phone": Phone,
        "StreetAddress": streetAddress,
        "ZipCode": zipCode,
        "City": city,
        "Comment": comment,
        "OrderItems": orderL
    }
    
    fetch("http://demo.edument.se/api/orders", {
            method: 'POST',
            body: JSON.stringify(order),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
    });

});
function collectOrder(){
    let orderList = []
    $("#cartHtml div").each(function(index){
        let productId = Number($(this).attr("data-value"));
        let numberProduct = cartList[productId];
        let nameProduct = $(this).children("span:nth-child(1)").text()
        let price = Number(products[productId-1].Price);
        orderList.push({"Id": productId,"Name": nameProduct,"Quantity": numberProduct,"Price": price});
    });
    return orderList;
};
// funktion för att skapa produkt
function createProduct(prod){

    productDiv.append($('<div data-value=' + prod.Id + ' class="produkt">').append("<div>" + prod.Name + "</div>")
    .append("<div>" + prod.Price + " slavcoins</div>").append("<div>" + prod.Description + "</div>")
    .append('<img src=' + prod.Image + '>').append('<button>Add to cart</button>'));

};
// validera fält
function validateField(node){
    if (node.value === ""){
        node.style.border = "2px solid red";
        return false;
    } else {
        node.style.border = "1px solid black";
        return true;
    }
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
    products.find(product => product.Id === Number(key)));
    return itemsHtml = items.map(items =>{
        return `
        <div data-value="${items.Id}"><span> ${items.Name}</span><span> Amount:</span> </span><span id="product${items.Id}">${cart[items.Id]}</span><a class="add" href="#">+</a><a class="remove" href="#">-</a></div>
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
    let reviewList = reviews.filter(reviews => reviews.ProductID ===  Number(id));
    reviewList.forEach(function(element){
        $(".reviews").append(writeReviews(element));
    });

    $("#submitReview").click(function(e){
        e.preventDefault();
        let user = $("#inputUser").val();
        let comment = $("#inputContent").val();
        let userRating = $("#test").attr("data-rating-id");      

        
        fetch("http://demo.edument.se/api/reviews", {
            method: 'POST',
            body: JSON.stringify({ProductID: id, Name: user, Comment: comment, Rating: userRating}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        $(".reviews").append('<div class="user">' + user + '<div>').append('<div class="content">' + comment + '<div>');
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
    });
};
// function för att skriva reviews
function writeReviews(rev){
    $(".reviews").append('<div class="user">' + rev.Name + '<div>')
    .append('<div class="content">' + rev.Comment + '<div>')
};
function emptyOverlay(){
    $("#overlay").empty();
};