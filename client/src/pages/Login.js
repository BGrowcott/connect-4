import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";

const Login = () => {
    return (
        <section className="row">
            <div className="col-12 col-md-6">
                <LoginForm />
            </div>
            <div className="col-12 col-md-6">
                <SignupForm />
            </div>
        </section>
    );
};

export default Login;
