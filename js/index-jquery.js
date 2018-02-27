$("#logo").hide();
$("#cartHtml").hide();
$("#link-logo").click(function(){
    $("#logo").show(500);
});

$("#hide-logo").click(function(){
    $("#logo").hide(500);
});

// $("#checkoutPage").click(function(){
//     $("#products").hide();
//     $("#checkout").show();
//     $("#cartHtml").show()
// });
// $("#pPage").click(function(){
//     $("#checkout").hide();
//     $("#products").show();
//     $("#cartHtml").hide()
// });
// $( "#checkoutForm" ).submit(function( event ) {
//     event.preventDefault();
//     if (validate()){
//         //Submit form
//         console.log(event);
//     }
// });
// products.forEach(function(element){
//     productDiv.append(createProduct(element)); 
// });

// function createProduct(prod){
//     let name = prod.pname;
//     let price = prod.price;
//     let desc = prod.desc;
//     let url = prod.url;   
//     let id = prod.id;

//     productDiv.append($('<div class="produkt">').append("<div>" + name + "</div>").append("<div>" + price + "</div>").append("<div>" + desc + "</div>").append('<img src=' + url + '>').append('<button id=' + id + '>Add to cart</button'));
// }