import { NavLink } from "react-router-dom";

export default function NavBar(){
    return (
       <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
                <NavLink to="/admin">Admin</NavLink>
            </li>
        </ul>
       </nav>   
    );
}   