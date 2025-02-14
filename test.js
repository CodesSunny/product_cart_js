let cartItems = document.querySelector(".cart-items");

function hideCart(){
    let cart = document.querySelector(".cart");
    cart.style.transform = "translateX(150%)";
}


function addToCart(productTitle,productPrice){ 
    let cart = document.querySelector(".cart");
    cart.style.transform = "translateX(0)";

    //nodelist of product names
    let cartItemTitle = cartItems.querySelectorAll(".cart-item-title");  
   
    //convert names nodelist into array to iterate
    let cartItemsList = Array.from(cartItemTitle);   

    // Check if the product is already in the cart
    let isPresent = cartItemsList.some(item => item.textContent === productTitle);   //boolean
    
    if(!isPresent){    
        
        //  create cart item
        let cartItem = document.createElement("li");
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
        <span class="cart-item-title">${productTitle}</span>
        <span class="cart-item-price">${productPrice}</span>
        <div class="cart-item-qty">
            <button onclick='decreaseCount(this)' class="qty-btn">-</button>
            <span class="qty">1</span>
            <button onclick='increaseCount(this)' class="qty-btn">+</button>
        </div>
        `   
        cartItems.appendChild(cartItem);
    }else{
        alert('item already present in cart');
    }
    getTotalPrice();
    }


function getTotalPrice(){
        //nodelist of product price
        let cartItemPrice = cartItems.querySelectorAll(".cart-item-price");  

        //convert price nodelist into array to iterate
        let cartPriceList = Array.from(cartItemPrice);
        let totalCartPrice = document.querySelector("#total-price");      
        
        let sum =0;
        for (price of cartPriceList){
            let priceValue = Number(price.textContent.split('$')[1]);
            sum += priceValue;
            totalCartPrice.textContent = sum; 
            totalCartPrice.textContent = "$" + totalCartPrice.textContent;            
        }       
        getFinalPrice(sum );
    }


    // increase quantity
function increaseCount(button){
        let quantityElement = button.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);    
        let priceElement = button.parentElement.previousElementSibling;
        let price = parseFloat(priceElement.textContent.split('$')[1]);
        let unitprice;
        
        if(quantity < 5){
            quantity++;
            quantityElement.textContent = quantity; 

            // get unit price
            if (quantity > 1){
                unitprice = price / (quantity - 1);
            }else{
                unitprice = price;
            }
                // update product price in cart
            priceElement.textContent = "$" + quantity*unitprice; 
            getTotalPrice();                  
        }   else{
            alert("Max 5 items");
            // ensure unitprice based on current price
            unitprice = price / quantity;
        }
    }


    // decrease quantity
function decreaseCount(button){
        let quantityElement = button.nextElementSibling;    
        let quantity = parseInt(quantityElement.textContent);
        let priceElement = button.parentElement.previousElementSibling;
        let price = parseFloat(priceElement.textContent.split('$')[1]);
        let unitprice;

        if(quantity > 1){
            quantity--;
            quantityElement.textContent = quantity;
            // get unit price
            unitprice = price / (quantity + 1);
                // update product price in cart
            priceElement.textContent = "$" + quantity*unitprice; 
            getTotalPrice();                 
        }   else{
            alert("can't be zero");
        }
        }

        // final price calculation
function getFinalPrice(sumTotalPrice){
            const deliveryCharge = document.getElementById('delivery-charge');
            const deliveryChargeValue = Number(deliveryCharge.textContent.split('$')[1]);           
            const finalPrice = document.getElementById('final-price');
            let finalPriceValue = 0;
            finalPriceValue = sumTotalPrice + deliveryChargeValue;
            finalPrice.textContent = '$' + finalPriceValue;
            getNetPrice(finalPriceValue);
        }

        // net price calculation
function getNetPrice(finalPriceValue){
        const netPrice = document.getElementById('net-price');      
        if(coupon){

            // if coupon code matched apply 10% discount
            const discountedPrice = finalPriceValue*0.9;
            
            netPrice.textContent = '$' + discountedPrice.toFixed(2);
        }else{
            netPrice.textContent = '$' + finalPriceValue.toFixed(2);
        }       
        buyItems(Number(netPrice.textContent.split('$')[1]));
    } 

    // read coupon code
    let coupon = false;
function applyCoupon(){
        const couponInput = document.querySelector('.coupon-input');
        const {value} = couponInput;
        const couponCode = document.querySelector('.coupon-code').textContent.split(':')[1];
        // validate coupon code
        if(value.replaceAll(" ","") === couponCode.replaceAll(" ","")){          
            coupon = true;
            alert('congrats');
            getNetPrice();
        }else{
            coupon = false;
            alert('retry'); 
        } 

        // Update net price based on coupon status
        const finalPriceValue = Number(document.getElementById('final-price').textContent.split('$')[1]);
        getNetPrice(finalPriceValue); 
    } 

function buyItems(payableAmount){
    console.log(payableAmount);
    

}