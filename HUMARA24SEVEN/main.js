let carts = document.querySelectorAll(".add-cart");  //will access the .add-cart elements by index.

let products = [
    {
        name : "Amul Pasteurised Butter 100g",
        tag : "amulbutter",
        price : 46,
        qty : 0
    },
    {
        name : "Havmor Chocolate Chips Brick 200g",
        tag : "havmorchocochips",
        price : 95,
        qty : 0
    },
    {
        name : "Haldirams Dal Makhani 300gm",
        tag : "frozendalmakhani",
        price : 110,
        qty : 0
    },
    {
        name : "Fortune Soya Chunks 225g",
        tag : "fortunechunks",
        price : 47,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    },
    {
        name : "Amul Butter 100g",
        price : 46,
        qty : 0
    }
]

for(let i = 0; i < carts.length; i++)
{
    carts[i].addEventListener('click' , ()=>{
            cartNumbers(products[i]);
            totalCost(products[i]);
        })
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers'); //localstorage to save key-value pairs in a web browser with no expiration date.
    if(productNumbers)
    {
        document.querySelector('.navbar span').textContent = productNumbers;  //display the count aside cart icon
    }
}

function cartNumbers(productName)
{
    // console.log("Product Added is = ", productName);
    let productNumbers = localStorage.getItem('cartNumbers'); 
    // console.log(productItems);
    // console.log(typeof productItems);
    productNumbers = parseInt(productNumbers);
    // console.log(typeof productItems);


    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);  //add one each time product is added to cart
        document.querySelector('.navbar span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);   //if nothing in cart
        document.querySelector('.navbar span').textContent = 1;
    }

    setItems(productName);  //getting names of the added products
}
function setItems(productName)
{
    // console.log("Inside SetItems Function.....");
    // console.log("Product : ", productName);
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    // console.log("My Cart Items Are : ", cartItems);

    if(cartItems!=null)   //if cartItems is not empty or is greater than 0
    {
        if(cartItems[productName.name] == undefined)        //when different products are added in cart
        {
            cartItems = {
                ...cartItems,                               //way to represent many different items in cartItems key-value array.
                [productName.name]:productName                 //product name : [name, tag, price, qty]
            }
        }
        // console.log(productName.name + "  productName - > " , productName);
        cartItems[productName.name].qty += 1;   //same like -> cartItems['Amul Butter 100g'].qty += 1;
    }
    else            //is empty
    {
        productName.qty = 1; //1 quantity added 
        cartItems = { 
            [productName.name]: productName
        }    
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));    //bcz we need to pass it as a JSON object not as JS.
}

function totalCost(productName)
{
    // console.log("Product Price is : ", productName.price);
    // console.log("Product Price is : ", typeof productName.price);
    
    let cartCost = localStorage.getItem('totalCost');
    // cartCost = parseInt(cartCost);           //if cartCost in string form but it is already in integer form
    // console.log("My cart Cost : ", cartCost); 
    // console.log("My cart Cost type: ", typeof cartCost); 

    if(cartCost != null)
    {
        localStorage.setItem("totalCost", parseInt(cartCost) + productName.price); //total cost keep updating as product is adding
    }
    else
    {
        localStorage.setItem("totalCost", productName.price); 
    }
}

function displayCart()          //will display elements added in cart
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    // console.log(cartItems);
    if(cartItems && cartContainer)
    {
        cartContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            cartContainer.innerHTML += `
            <ion-icon name="trash-outline" id="binIcon"></ion-icon>
            <div class="product">
                <img src="images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="product-price"> ${item.price}</div>
            <div class="product-qty"> 
                <ion-icon  name="remove-circle-outline" onClick="${item.qty - 1}"></ion-icon> 
                <span>${item.qty}</span>
                <ion-icon name="add-circle-outline" onClick="${item.qty + 1}"></ion-icon>
            </div>
            <div class="product-total">
                &#8377;${item.qty * item.price}.00
            </div>
            ` 
            // console.log(item.qty);
        });

        cartContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Grand Total
                </h4>
                <h4 class="basketTotal">
                    &#8377;${cartCost}.00
                </h4>
            </div>
            <div class="buynow">
                <button><a href="shippingDetails.html">BUY NOW!</a></button>
            </div>
        `
    }
}

onLoadCartNumbers();     //after refresh/reload cart number to be visible according to productNumbers
displayCart();