import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalState";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Example from "./pages/example";
import ExampleModal from "./components/modals/exampleModal";
import Login from "./pages/login";

function App() {
    return (
        <Router>
            <GlobalProvider>
                <Header />
                <main className="container-lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/example" element={<Example />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
                <Footer />
                <ExampleModal />
            </GlobalProvider>
        </Router>
    );
}

export default App;
