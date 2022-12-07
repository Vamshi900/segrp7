const Form = (props)=>{
  
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    
    const emailRef = React.useRef(null);
    const emailErrorRef = React.useRef(null);
    const passRef = React.useRef(null);
    const passErrorRef = React.useRef(null);
    
    
    const validateEmail = ()=>{
      let email = emailRef.current.value;
        if(email == '' || email == ' '){
          emailErrorRef.current.innerText = "Email cannot be empty!";    
         emailRef.current.style.borderColor = "red";
        }
        
        else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
           emailErrorRef.current.innerText = '';
            emailRef.current.style.borderColor = "dodgerBlue"; 
        }
        
        else{
          emailErrorRef.current.innerText = 'Please enter a valid email'; 
          emailRef.current.style.borderColor = "red"; 
        }
    }
    
    const validatePassword = ()=>{
      let password = passRef.current.value;
      if(password.length == 0 || password == '' || password == ' '){
          passErrorRef.current.innerText = 'Password cannot be empty!';
          passRef.current.style.borderColor = "red"; 
      }
      
      else if(password.length < 8 || password.length > 15){
          passErrorRef.current.innerText = 'Password should be 8 to 15 characters!';
          passRef.current.style.borderColor = "red";  
      }
      
      else{
        passErrorRef.current.innerText = '';
        passRef.current.style.borderColor = "dodgerBlue";  
      }
    }
    
    return(
    <div id="form">
        <h3>{props.title}</h3>
        <div class="field-wrap">  
          <input type="text" id="email" ref={emailRef} onBlur={(ev)=>{setEmail(event.target.value); validateEmail();}} name="email" autofocus required />
          <label for="email">Email</label>
          <p id="email-error" className="error" ref={emailErrorRef}></p>
        </div>
        
        <div class="field-wrap">
          <input type="password" ref={passRef} onBlur={(ev)=>{setPassword(ev.target.value); validatePassword();}} id="password" name="password" required />
          <label for="password">Password</label>
          <p id="password-error" className="error" ref={passErrorRef}></p>
        </div>
        <div class="text-center">
        <button type="submit">Log In</button>
          
        </div>
    </div>
    )
  }
  
  ReactDOM.render(<Form title="Login to continue ..." />, document.getElementById('root'));