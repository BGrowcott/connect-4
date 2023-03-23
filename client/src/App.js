import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalState";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import ExampleModal from "./components/modals/ExampleModal";
import Login from "./pages/Login";
import MyGames from "./pages/MyGames";
import AuthService from "./utils/AuthService";

function App() {
    return (
        <Router>
            <GlobalProvider>
                <Header />
                <main className="container-lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mygames" element={AuthService.loggedIn() ? <MyGames /> : <Login/>} />
                        <Route path="/mygames/:id" element={<Game />} />
                    </Routes>
                </main>
                <Footer />
                <ExampleModal />
            </GlobalProvider>
        </Router>
    );
}

export default App;
