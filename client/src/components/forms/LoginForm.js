import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

const LoginForm = () => {
    const emptyForm = {
        username: "",
        password: "",
    };
    const [formState, setFormState] = useState(emptyForm);
    const [errorMessage, setErrorMessage] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetchWithJWT("/api/user/login", {
                method: "POST",
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (response.status !== 200) {
                throw data;
            }

            AuthService.login(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    function handleFormInput(event) {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={submitForm} className="form">
                <label className="form-label" htmlFor="username">
                    Username:
                </label>
                <input
                    className="form-control"
                    type="username"
                    name="username"
                    onChange={handleFormInput}
                    value={formState ? formState.username : ""}
                ></input>
                <label className="form-label" htmlFor="password">
                    Password:
                </label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={handleFormInput}
                    value={formState ? formState.password : ""}
                ></input>
                <button type="submit" className="mt-2 btn btn-primary">
                    Login
                </button>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
};

export default LoginForm;
