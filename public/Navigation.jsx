import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../providers/cartContext";
import { ShoppingCart } from "lucide-react";
import './Navigation.css';

function Navigation() {
    const { cart } = useContext(CartContext);

    return (
        <nav className="navbar">
            <div className="navgroup">
                <Link className="navbar-brand" to="/">Mebius</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                </div>
            </div>
            <div className="cart-section">
                <div>
                    <Link to="/cart" className="cart-link">
                        <p className="cart-count">{cart.reduce((acc, el) => acc + el.count, 0)}</p>
                        <div className="cart-icon">
                            <ShoppingCart />
                            Cart
                        </div>
                    </Link>
                </div>
                <p></p>
            </div>
        </nav>
    );
}

export default Navigation;
