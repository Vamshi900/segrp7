const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    // native api call post login 
    var loginReq = new XMLHttpRequest();
    loginReq.open("POST", "http://localhost:5001/api/v1/auth/login", true);
    loginReq.setRequestHeader("Content-Type", "application/json");
    loginReq.send(JSON.stringify({ user: username, password: password }));
    loginReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("login successful");
            // session storage 
            response = JSON.parse(this.responseText);
            // store token, user_id, role in local storage
            localStorage.setItem("token", response.token);
            localStorage.setItem("user_id", response.user_id);
            localStorage.setItem("role", response.role);
            // store token, user_id, role in session storage
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("user_id", response.user_id);
            sessionStorage.setItem("role", response.role);
            // redirect to home page
            window.location.href = "http://localhost:8887/";
        } else if (this.readyState == 4 && this.status == 401) {
            console.log("login failed");
            loginErrorMsg.style.opacity = 1;
        }
    }
    // disable login button
    loginButton.disabled = true;
})