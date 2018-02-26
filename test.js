let products = [
{   
    pname: "HANDMADE USHANKA",
    id: "hat",
   
},
{
    pname: "WESLAV Squatpants",
    id: "pants",
    
    
}];


let cartList = {
    "pants": 4,
    "hat": 10
};

let list = findProduct(cartList, products);

function findProduct (cart, products){
    let items = Object.keys(cart).map(key =>
    products.find(product => product.id === key));
    
        console.log(cartList);
    return itemsHtml = items.map(items =>{
        return `
        <div data-value="${items.id}" ><a href="#">+</a><span> ${items.pname} ${cart[items.id]} </span><a href="#">-</a></div>
        `
        

    }).join(" ");
}
document.getElementById("cartHtml").innerHTML = list;
