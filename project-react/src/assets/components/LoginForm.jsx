import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm(){
    const EmailId = useId();
    const PasswordId = useId();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [online, setOnline] = useState(false);
    const navigate = useNavigate();
// handles the submission of the login form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        try{
            const response = await fetch(`http://localhost:5000/users?email=${email}`);
            if(response.ok){
                const data = await response.json();
                
                if(data.length > 0){
                    // User found, verify password manually
                    if (data[0].password === password) {
                        window.alert("Login successful!");
                        setOnline(true);
                        // Navigate to the ProductForm subroute
                        navigate("/admin/product-form");
                    } else {
                        const msg = "Invalid email or password";
                        setErrorMsg(msg);
                        window.alert(msg);
                        setOnline(false);
                    }
                } else {
                    const msg = "No user found with that email";
                    setErrorMsg(msg);
                    window.alert(msg);
                }
            }
        }catch(error){
            console.log(error);
            const msg = "An error occurred during login.";
            setErrorMsg(msg);
            window.alert(msg);
        }
    }

    if (online) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
            <label htmlFor={EmailId}>Email</label>
            <input type="text" id={EmailId} name="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor={PasswordId}>Password</label>
            <input type="password" id= {PasswordId} name="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="submit">Login</button>
            <p>use email: vincent@dev & password: 12345678</p>
            <p>For LOGIN</p>
        </form>
    );
}