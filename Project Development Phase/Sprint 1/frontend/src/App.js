import "./App.css";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import { ProtectedRoute } from "./Components/Utils/ProtectedRoute";
import { useEffect } from "react";
import { isUserLoggedIn } from "./helpers";
import RenderIf from "./Components/Utils/RenderIf";
import { observer } from "mobx-react-lite";
import { WifiProtectedSetupSharp } from "@mui/icons-material";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("location = ", location.pathname);
        console.log(["/login", "/register"].indexOf(location.pathname) === -1);

        console.log(isUserLoggedIn());
        if (isUserLoggedIn()) {
            if (["/login", "/signup"].indexOf(location.pathname) === -1) {
                navigate(location.pathname);
            } else {
                navigate("/");
            }
        }
    }, []);
    return (
        <div className="App" style={{ height: "100vh" }}>
            <Routes>
                <Route
                    path="/login"
                    element={
                        // <RenderIf condition={!isUserLoggedIn()} otherwise={<Navigate to="/" />}>
                        <Login />
                        // </RenderIf>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        // <RenderIf condition={!isUserLoggedIn()} otherwise={<Navigate to="/" />}>
                        <Signup />
                        // </RenderIf>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    {/* <Route path="profile" element={<ProtectedRoute children={<Profile />} />}></Route> */}
                    <Route path="profile" element={<Profile />}></Route>
                    <Route path="prediction" element={<div>Prediction</div>}></Route>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </div>
    );
}

export default observer(App);
