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
                        setErrorMsg("Invalid email or password");
                        window.alert(errorMsg);
                        setOnline(false);
                    }
                }
            }
        }catch(error){
            console.log(error);
            setErrorMsg("An error occurred during login.");
            window.alert(errorMsg);
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