import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="app-header-container container">
            <Link to="/">
                <h1>Techni Calendar</h1>
            </Link>
            <Link to="/admin">Admin</Link>
        </div>
    )
}

export default Header;