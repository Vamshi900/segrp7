console.clear()

let id = location.search.split('?')[1]
console.log(id)

let reviewsObject=[]
if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    ob= ob[0];
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.Product_Image

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.Product_Name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.Brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('$ ' + ob.Price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.Product_Name)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)
    // repeated product image 5 times
    let imgArr = [ob.Product_Image,ob.Product_Image,ob.Product_Image,ob.Product_Image,ob.Product_Image]
    let i;
    for(i=0; i<imgArr.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = imgArr[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = imgArr[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
        let order = id+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = id + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("badge").innerHTML = counter
        console.log("Cookie",document.cookie)
//{
//     "message": "Login successful",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRiMnNzc3Nhc3Nzc3NzczBAZ21haWwuY29tIiwicm9sZSI6IjIiLCJpYXQiOjE2NzA1Njc3MDAsImV4cCI6MTY3MDYwMzcwMH0.FrLIcOrP_V0mECFqUWhZ5_ckEh-ugHRKiHJfCS6T7kY",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRiMnNzc3Nhc3Nzc3NzczBAZ21haWwuY29tIiwicm9sZSI6IjIiLCJpYXQiOjE2NzA1Njc3MDAsImV4cCI6MTY3MDY1NDEwMH0.O3FWEAUJaC8ie6PdfR1Mx7EQ1Q50ImgOSH6yXPF_Ycw",
//     "user_id": "b15dd08c-0",
//     "role": "2"
// }

        var value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRiMnNzc3Nhc3Nzc3NzczBAZ21haWwuY29tIiwicm9sZSI6IjIiLCJpYXQiOjE2NzA1Njc3MDAsImV4cCI6MTY3MDYwMzcwMH0.FrLIcOrP_V0mECFqUWhZ5_ckEh-ugHRKiHJfCS6T7kY"
        let addToCartRequest = new XMLHttpRequest()

        
        addToCartRequest.open('POST', 'http://localhost:5001/api/v1/cart/addtocart', true)
        addToCartRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        addToCartRequest.setRequestHeader('Authorization','Bearer ' + value );
        addToCartRequest.send(JSON.stringify({user_id:"b15dd08c-0",product_id:id,quantity:1}));
{
    addToCartRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('ADDED TO CART!!');
            let response = JSON.parse(this.responseText)
            {
                console.log(response);
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}


    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}

function reviewContentDetails(ob) {
    
    
    var reviews=document.getElementById("reviews")
    var reviewsHTML=``
    if(ob.length==0){ //need to change
    reviewsHTML=`<h2> No Reviews Found</h2>`
    return;}
    reviewsHTML=`<h2 class="text-center">Reviews</h2>
    <div class="card">
    </div>`;
        //console.log("LOGGING OB BEFORE FOR",ob.length)
    for(i=0;i<ob.length;i++){
        //console.log("Second DEBUG",reviewsHTML)
        review=ob[i]
        if(review.Is_Reply=="FALSE"){
           // console.log(renderReview(review))
            reviewsHTML=reviewsHTML+ renderReview(review)
        }
    }

    //console.log("Final htmls",reviewsHTML)
    reviews.innerHTML=reviewsHTML

    for(k=0;k<ob.length;k++){
        review=ob[k]
        if(review.Is_Reply=="TRUE"){
            const replytoReviewID=review.replyToReviewID
            var reviewElement=document.getElementById(replytoReviewID)
            reviewElement.getElementsByClassName("weirdReply")[0].style.display="none"
            console.log("HTML CHILD NODE",reviewElement.getElementsByClassName("weirdReply"))
            reviewElement.innerHTML+=renderReplies(review)

        }
    }

}

function renderReview(obj) {
    //console.log("INSIDE RENDER FUNCTion")
    var rating=obj.Rating
    var userID=obj.User_ID
    var reviewText=obj.Review_or_Reply
    var reviewID=obj.ID
    var userName=""


    let userHttpRequest = new XMLHttpRequest()
{
    userHttpRequest.onreadystatechange = function()
    {   
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let userDetails = JSON.parse(this.responseText)
            {
                console.log(userDetails);
                userName=userDetails[0].User_Name;
               // console.log("USERNAME",userName)
            }
        }
        else
        {
            console.log('not connected user!');
        }
    }
}


    userHttpRequest.open('GET', 'http://localhost:5001/api/v1/users/'+userID, true)
userHttpRequest.send() 



    var ratingStar=``
    for( j=0;j<rating;j++){
        ratingStar+=`<span class="float-right"><i class="text-warning fa fa-star"></i></span>`
    }
    var review = `<div class="card">
    <div class="card-body" id = "${reviewID}">
        <div class="row">
            
            <div class="col-md-12">
                
                    <strong>${userID}</strong></a>
                     ${ratingStar}
            
            <div class="clearfix"></div>
                <p>${reviewText}</p>
                <p class="replyButton">
                    <a onclick="renderReplyBox(${reviewID})" class="weirdReply float-right btn btn-outline-primary ml-2"> <i class="fa fa-reply"></i> Reply</a>
            </p>
            
            </div>
            <div id="${reviewID}-1"></div>
        </div> <!--1st iteration-->
    </div>
    
<div>`

    return review;
}
//input reply
function renderReplyBox(reviewID){
    document.getElementById(reviewID+"-1").innerHTML=`
    <div class="card-body">
   <div class="row">
   <div class="col-3"></div>
   <div class="col-9">
   <form name="replyform-${reviewID}">
           <textarea name="replytext" class="form-control" id="textAreaExample" rows="4" style="background: #fff;"></textarea>
           <div class="float-end mt-2 pt-1">
               <button type="button" onClick="submitReply(${reviewID})" class="btn btn-success btn-sm">Post reply</button>
               <button type="button" onclick="cancelReply(${reviewID})" class="btn btn-outline-success btn-sm">Cancel</button>
           </div>
    </form>
        
   </div>
 
</div>
`
}

function cancelReply(reviewID){
    var replyBox=document.getElementById(reviewID+"-1")
    replyBox.innerHTML=""
}

function submitReply(reviewID){
    var reply=document[`replyform-${reviewID}`].replytext.value

    var new_reply={
        "User_ID": "20008",
        "Product_ID": id,
        "Rating": 0,
        "Review_or_Reply": reply,
        "ID": reviewID+"-1",
        "Is_Reply": "TRUE",
        "replyToReviewID": reviewID
    }
    console.log("NEw REPLY",reviewsObject)

    document.getElementById(reviewID).innerHTML+=renderReplies(new_reply)
    cancelReply(reviewID)


    var reviewElement=document.getElementById(reviewID)
    reviewElement.getElementsByClassName("weirdReply")[0].style.display="none"


    console.log("Reply and its id",reply,reviewID)
}

//replies 
function renderReplies(obj) {
    var userID=obj.User_ID
    var replyText=obj.Review_or_Reply
    var replyID=obj.ID
    var reply = `
    
    <div class="card-inner card">
        <div class="card-body">
            <div class="row">
               
                <div class="col-md-12">
                    <strong>${userID}</strong></a></p>
                    <p>${replyText}</p>
                </div>
            </div>
        </div>
        
    </div>
    
    `
    return reply
}


function renderReviewBox(){
   var reviewBox= document.getElementById("reviewBox")
   reviewBox.innerHTML= `
   <div class="card-body">
   <div class="row">
   <form name="ratingform">
           <div class="star-rating">
               <div class="star-rating__wrap">
                 <input class="star-rating__input" id="star-rating-5" type="radio" name="rating" value="5">
                 <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-5" title="5 out of 5 stars"></label>
                 <input class="star-rating__input" id="star-rating-4" type="radio" name="rating" value="4">
                 <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-4" title="4 out of 5 stars"></label>
                 <input class="star-rating__input" id="star-rating-3" type="radio" name="rating" value="3">
                 <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-3" title="3 out of 5 stars"></label>
                 <input class="star-rating__input" id="star-rating-2" type="radio" name="rating" value="2">
                 <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-2" title="2 out of 5 stars"></label>
                 <input class="star-rating__input" id="star-rating-1" type="radio" name="rating" value="1">
                 <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-1" title="1 out of 5 stars"></label>
               </div>
           </div>
       
           <textarea name="reviewtext" class="form-control" id="textAreaExample" rows="4" style="background: #fff;"></textarea>
           <div class="float-end mt-2 pt-1">
               <button type="button" onClick="submitReview()" class="btn btn-success btn-sm">Post review</button>
               <button type="button" onclick="cancelHandler()" class="btn btn-outline-success btn-sm">Cancel</button>
           </div>
    </form>
       
   </div>
</div>


`
}



function submitReview(){
    var rating=document.ratingform.rating.value
    var review=document.ratingform.reviewtext.value
        
        
    var review={
        "User_ID": "10006",
        "Product_ID": id,
        "Rating": rating,
        "Review_or_Reply":review,
        "ID": Math.floor((Math.random*100000))+'',
        "Is_Reply": "FALSE",
        "replyToReviewID": ""
    }
    document.getElementById("reviews").innerHTML+=renderReview(review)
    cancelHandler()
    //console.log("Posting the review",rating,review)
}
function cancelHandler(){
    var reviewBox= document.getElementById("reviewBox")
   reviewBox.innerHTML= ""
}

// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

let reviewHttpRequest = new XMLHttpRequest()
{
    reviewHttpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let reviewDetails = JSON.parse(this.responseText)
            {
                console.log(reviewDetails.data);
                reviewsObject=reviewDetails.data;
                reviewContentDetails(reviewDetails.data)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}



httpRequest.open('GET', 'http://localhost:5001/api/v1/products/'+id, true)
httpRequest.send()  

reviewHttpRequest.open('GET', 'http://localhost:5001/api/v1/reviews/allreviews/'+id, true)
reviewHttpRequest.send() 