console.clear();

function checkLoginStatus() {
    console.log("checkLoginStatus");
    if (localStorage.getItem("token") == null) {
        console.log("token is null");
        return false;
    } else {
        console.log("token is not null");
        return true;
    }
}
var userID=null
if(checkLoginStatus()){
userID=localStorage.getItem("user_id")
}



var subTotal=0
function dynamicCartSection(cartItems){
    if(cartItems.length==0){
    document.getElementById("cartpage").innerHTML=`<p>Your Cart is Empty</p>`
return;}

    var cart=document.getElementById("cartTable")
    var cartRowHTML=` <tr>
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>
  </tr>`
    for(let i=0;i<cartItems.length;i++){
        cartRow=cartItems[i]
        subTotal=subTotal+cartRow.Price*cartRow.Quantity
        cartRowHTML=cartRowHTML+ displayItem(cartRow)
        
    }
    document.getElementById("subTotal").innerHTML=`$${subTotal}`
    document.getElementById("tax").innerHTML=`$${subTotal*0.1}`
    document.getElementById("total").innerHTML=`$${subTotal-subTotal*0.1}`
    cart.innerHTML=cartRowHTML

}

function displayItem(product){
    var name=product.Product_Name
    var price=product.Price
    var image=product.Product_Image.split(",")[0]
    var productid=product.Product_ID
    var quantity=product.Quantity

    var cart= `<tr id=${productid}>
    <td>
      <div class="cart-info">
        <img src=${image} alt="" />
        <div>
          <p>${name}</p>
          <small>Price  ${price}</small>
          <br />
          <a onclick="removeitem(${productid})" href="#">Remove</a>
        </div>
      </div>
    </td>
    <td><input type="number" min="1" value="${quantity}" onchange="updatePrice(this,${price},${productid})" /></td>
    <td id="${productid}-price" class="prices">${price*quantity}</td>
    </tr>
   `
   return cart;
}

function removeitem(productid){
    document.getElementById(`${productid}`).innerHTML=``
    calculateSubTotal(document.getElementsByClassName("prices"))
    if(subTotal==0){
        document.getElementById("cartpage").innerHTML=`<p>Your Cart is Empty</p>`
    }

}
function updatePrice(value,price,productid){
    var cost = parseInt(value.value)*parseInt(price);
    document.getElementById(`${productid}-price`).innerHTML=`${cost}`
    calculateSubTotal(document.getElementsByClassName("prices"))
    
}

function calculateSubTotal(priceArray){
    sum=0
    for(p=0;p<priceArray.length;p++){
    sum=sum+parseInt(priceArray[p].innerHTML)
    }
    subTotal=sum
    document.getElementById("subTotal").innerHTML=`$${sum}`
    document.getElementById("tax").innerHTML=`$${sum*0.10}`
    document.getElementById("total").innerHTML=`$${sum-(sum*0.1)}`

}

//Coupuns

function couponcheck(){
    document.getElementById("coupon-check").innerHTML=`
    <div class="col-12 col">
                  
                  <div class="info-bar" style="padding-top: 10px;">
                      <p><i class="fa fa-info"></i> 
                          Have a coupon? <a onclick="couponform()" href="#">Click here to enter your code</a>
                      </p>
                  </div>
              </div>
    `
}


function couponform(){
    document.getElementById("couponform").innerHTML=`
    <div class="col-6 col coupon" style="padding-right:100px">
                  <form method="get">
                      <input type="text" name="coupon" id="coupon" placeholder="Coupon code">
                      <div class="float-end mt-2 pt-1">
                        <button onClick="submitHandler()" type="button" class="btn-sm">Apply Coupon</button>
                    <button type="button" onclick="cancelhandler()" class="btn-outline btn-sm">Cancel</button>
           </div>
                  </form>
              </div>
    `
}
var discount=50
function cancelhandler(){
    document.getElementById("couponform").innerHTML=``
}
function submitHandler(){
    cancelhandler()
    document.getElementById("discount").innerHTML=`
    <td>Discount</td>
                  <td>-$${discount}</td>
                  `
                  document.getElementById("tax").innerHTML=`$${(subTotal-discount)*0.10}`
                  document.getElementById("total").innerHTML=`$${(subTotal-discount)-((subTotal-discount)*0.1)}`
}

// BACKEND CALL
if(userID!=null){
let cartProducts=[]

couponcheck()
let httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function()
{
    if(this.readyState == 4)
    {
        if(this.status == 200)
        {
             console.log('call successful');
            contentTitle = JSON.parse(this.responseText)
            items=contentTitle.data
            cartProducts=items
            console.log(items)
            
            dynamicCartSection(items)
            
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', `http://localhost:5001/api/v1/cart/${userID}`, true)
httpRequest.send()

}


