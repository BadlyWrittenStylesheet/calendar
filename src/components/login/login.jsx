import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./login.scss";

const Login = () => {
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form[0].value;
        const pin = form[1].value;

        if (name === "admin" && pin === "2137") {
            window.sessionStorage.setItem("logged", true);
            navigate("/admin/dashboard");
        }

        console.log("submit");
    }

    useEffect(() => {
        const logged = window.sessionStorage.getItem("logged");

        if (logged) window.location.href = "/admin/dashboard";
    }, []);

    return(
        <div className="app-login-container">
            <div className="container">
                <h2>Admin</h2>
                <form className="form" onSubmit={submit}>
                    <input type="text" name="user" placeholder="Name" />
                    <input type="password" name="pin" placeholder="Pin" />
                    <button type="submit">Login</button>
            </form>
            </div>
        </div>
    )
}

export default Login;
