import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

const LoginForm = () => {
    const emptyForm = {
        email: "",
        password: "",
    };
    const [formState, setFormState] = useState(emptyForm);

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetchWithJWT("/api/user/login", {
                method: "POST",
                body: JSON.stringify(formState),
            });
            const data = await response.json();
            AuthService.login(data);
        } catch (error) {
            console.log(error);
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
                <label className="form-label" htmlFor="email">
                    Email:
                </label>
                <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={handleFormInput}
                    value={formState ? formState.email : ""}
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
                <button type="submit" className="mt-2 btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
