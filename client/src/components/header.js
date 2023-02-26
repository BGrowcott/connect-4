import { Link } from "react-router-dom";
import { SHOW_MODAL_EXAMPLE } from "../utils/actions";
import AuthService from "../utils/AuthService";
import { useGlobalContext } from "../utils/GlobalState";

const Header = () => {
    const [state, dispatch] = useGlobalContext();

    function toggleModalExample() {
        dispatch({ type: SHOW_MODAL_EXAMPLE });
    }

    return (
        <header className="bg-dark text-white p-2">
            <nav className="d-flex align-items-center justify-content-between">
                <Link className="text-white text-decoration-none" to={"/"}>
                    <h1>Home</h1>
                </Link>
                <div className="d-flex align-items-center">
                    <Link
                        className="text-white text-decoration-none mx-2"
                        to={"/example"}
                    >
                        Example Page
                    </Link>
                    {AuthService.loggedIn() ? (
                        <button
                            onClick={AuthService.logout}
                            className="btn btn-secondary btn-sm"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            className="text-white text-decoration-none mx-2"
                            to={"/login"}
                        >
                            Login
                        </Link>
                    )}
                    <button
                        className="btn btn-light btn-sm mx-2"
                        onClick={toggleModalExample}
                    >
                        Open Modal
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
