const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");
const logout_btn = document.getElementById("logout-btn");
const cart_btn= document.getElementById('cart-btn')

// enable login button if tojen is not present
// else enable logout button
function toggleLoginEnabled() {
    console.log("toggleLoginEnabled");
    if (localStorage.getItem("token") == null) {
        console.log("token is null");
        cart_btn.disabled = true
        login_btn.disabled = false;
        signup_btn.disabled = false;
        // make them invisible
        signup_btn.style.display = "block";
        login_btn.style.display = "block";
        logout_btn.style.display = "none";
        cart_btn.style.display = "none";
    } else {
        console.log("token is not null");
        login_btn.disabled = true;
        signup_btn.disabled = true;
        logout_btn.disabled = false;
        cart_btn.disabled = false

        // make them visible
        signup_btn.style.display = "none";
        login_btn.style.display = "none";
        logout_btn.style.display = "block";
        cart_btn.style.display = "block";
    }
    
}

// check user login status
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