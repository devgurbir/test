if( localStorage.getItem('products') ){
    var products = JSON.parse(localStorage.getItem('products'))
}
else{
    var products = [];
}

function createProduct(){
    var productName = document.querySelector('input[name="productName"]').value;
    var productPrice = document.querySelector('input[name="productPrice"]').value;
    var productImage = document.querySelector('input[name="productImage"]').value;
    var product = new Product(productName, productPrice, productImage)
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products))
    document.querySelector('input[name="productName"]').value = '';
    var productPrice = document.querySelector('input[name="productPrice"]').value = '';
    var productImage = document.querySelector('input[name="productImage"]').value = '';
}

function Product(name, price, url){
    this.name =  name;
    this.price = price;
    this.url = url;
}

window.addEventListener('load', function(){
    const createBtn = document.querySelector('button.createBtn');
    createBtn.addEventListener('click', createProduct)
})