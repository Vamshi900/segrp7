const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");
const logout_btn = document.getElementById("logout-btn");

// enable login button if tojen is not present
// else enable logout button
function toggleLoginEnabled() {
    console.log("toggleLoginEnabled");
    if (localStorage.getItem("token") == null) {
        console.log("token is null");
        
        login_btn.disabled = false;
        signup_btn.disabled = false;
        // make them invisible
        signup_btn.style.display = "block";
        login_btn.style.display = "block";
        logout_btn.style.display = "none";
    } else {
        console.log("token is not null");
        login_btn.disabled = true;
        signup_btn.disabled = true;
        logout_btn.disabled = false;
        // make them visible
        signup_btn.style.display = "none";
        login_btn.style.display = "none";
        logout_btn.style.display = "block";
    }
    
}