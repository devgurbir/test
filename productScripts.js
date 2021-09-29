// Global Cart
if( localStorage.getItem('cart') ){
    var cart = JSON.parse(localStorage.getItem('cart'))
}
else{
    var cart = [];
}


function Product(name, price, url){
    this.name =  name;
    this.price = price;
    this.url = url;
}


// Show all products on products.html
function showProducts(){
    var products = JSON.parse(localStorage.getItem('products'))
    var parentContainer = document.querySelector('div.container')

    products.forEach(function(el){
        var productDiv = document.createElement('div');

        //Product Name
        var productName = document.createElement('p');
        productName.innerHTML = "Product Name: <span class='productName'>" + el['name'] + "</span>";
        productDiv.appendChild(productName);

        //Product Price
        var productPrice = document.createElement('p');
        productPrice.innerHTML = "Price: $ <span class='productPrice'>" + el['price'] + "</span>";
        productDiv.appendChild(productPrice);

        //Product URL
        var productImage = document.createElement('p');
        productImage.innerHTML = "See image at: <span class='productImage'>" + el['url'] + "</span>";
        productDiv.appendChild(productImage);

        //Add To Cart Button
        var addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "Add To Cart";
        addToCartBtn.setAttribute('class', 'add-to-cart');
        productDiv.appendChild(addToCartBtn);

        parentContainer.appendChild(productDiv);
    })
}

// Add product to cart
function addToCart(){
    var productDiv = this.parentNode;
    var productDetails = productDiv.querySelectorAll('span');
    var productName = productDetails[0].textContent;
    var productPrice = Number(productDetails[1].textContent);
    var productImage = productDetails[2].textContent;

    if( !productAlreadyInCart(productName) ){
        var product = new Product(productName, productPrice, productImage);
        cart.push(product);
        console.log('added to cart')
        // Set cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    else{
        alert('product already in cart')
    }   
}

//Check if product is already in cart
function productAlreadyInCart(productName){
    var cartProducts = JSON.parse(localStorage.getItem('cart'));
    if(!cartProducts){
        // console.log('Empty Cart');
        return;
    }

    var status = false;

    cartProducts.forEach(function(el){
        // console.log(productName, el['name']);
        if(productName == el['name']){
            status = true;
        }
        else{
            
        }
    })
    
    return status
}

// Show products in cart on cart.html
function showCart(){
    var parentContainer = document.querySelector('div.container')
    var totalItems = 0;
    var totalPrice = 0;
    if(localStorage.getItem('cart')){
        var cart = JSON.parse(localStorage.getItem('cart'))
    }
    else{
        var msg = document.createElement('p');
        msg.textContent = 'Sorry, cart is empty';
        parentContainer.appendChild(msg)
        var totalItemsSpan = document.querySelector('span.total-items')
    var totalItemsPrice = document.querySelector('span.total-price')

    totalItemsSpan.textContent = totalItems;
    totalItemsPrice.textContent = totalPrice;
        return;
    } 
    

    cart.forEach(function(el){
        var productDiv = document.createElement('div');

        //Product Name
        var productName = document.createElement('p');
        productName.innerHTML = "Product Name: <span class='productName'>" + el['name'] + "</span>";
        productDiv.appendChild(productName);

        //Product Price
        var productPrice = document.createElement('p');
        productPrice.innerHTML = "Price: $ <span class='productPrice'>" + el['price'] + "</span>";
        productDiv.appendChild(productPrice);
        // --- add to total price
        totalItems++;
        totalPrice += Number(el['price']);

        //Product URL
        var productImage = document.createElement('p');
        productImage.innerHTML = "See image at: <span class='productImage'>" + el['url'] + "</span>";
        productDiv.appendChild(productImage);

        //Add To Cart Button
        var addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "Add To Cart";
        addToCartBtn.setAttribute('class', 'add-to-cart');
        productDiv.appendChild(addToCartBtn);

        parentContainer.appendChild(productDiv);
    })

    var totalItemsSpan = document.querySelector('span.total-items')
    var totalItemsPrice = document.querySelector('span.total-price')

    totalItemsSpan.textContent = totalItems;
    totalItemsPrice.textContent = totalPrice;

}

function discount(){
    const discountCode = document.querySelector('div.discount>input[name="discount"').value;
    if(discountCode == 'masai30'){
        var totalItemsPrice = document.querySelector('span.total-price')
        var totalPrice = Number(totalItemsPrice.textContent);
        alert('Yay! Discount applied')
        totalItemsPrice.textContent = totalPrice - (totalPrice * 0.30);
    }
    else{
        alert('Sorry, this discount coupon does not exist')
    }
}



window.addEventListener('load', function(){
    if(window.location.href == 'file:///H:/Masai/unit3/coding/localStorage-assignment/products.html'){
        showProducts();
    }

    if(window.location.href == 'file:///H:/Masai/unit3/coding/localStorage-assignment/cart.html'){
        showCart();
        const discountBtn = document.querySelector('.discountBtn');
        discountBtn.addEventListener('click', discount);

    }

    var addToCartBtns = document.querySelectorAll('.add-to-cart')
    addToCartBtns.forEach(function(el){
        el.addEventListener('click', addToCart)
    })
})