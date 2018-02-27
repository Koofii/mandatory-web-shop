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

let productDiv = $("#products");
$("#logo").hide();

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
    $("#cartHtml").show()
});

$("#pPage").click(function(){
    $("#checkout").hide();
    $("#products").show();
    $("#cartHtml").hide()
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

function createProduct(prod){
    let name = prod.pname;
    let price = prod.price;
    let desc = prod.desc;
    let url = prod.url;   
    let id = prod.id;

    productDiv.append($('<div class="produkt">').append("<div>" + name + "</div>")
    .append("<div>" + price + "</div>").append("<div>" + desc + "</div>")
    .append('<img src=' + url + '>').append('<button id=' + id + '>Add to cart</button'));
}