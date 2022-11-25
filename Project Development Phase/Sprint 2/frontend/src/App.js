import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import OauthPage from "./Components/Auth/Oauth";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Prediction from "./Components/Prediction";
import PredictionHistory from "./Components/PredictionHistory";
import Settings from "./Components/Settings";
import { ProtectedRoute } from "./Components/Utils/ProtectedRoute";
import { isUserLoggedIn } from "./helpers";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("location = ", location.pathname);
        console.log(["/login", "/register"].indexOf(location.pathname) === -1);

        console.log(isUserLoggedIn());
        if (isUserLoggedIn()) {
            if (["/login", "/signup", '/oauth/redirect'].indexOf(location.pathname) === -1) {
                navigate(location.pathname);
            } else {
                navigate("/");
            }
        }
    }, []
    );
    return (
        <div className="App">
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
                    path="/oauth/redirect"
                    element={
                        <OauthPage />
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
                    <Route path="prediction" element={<Prediction />}></Route>
                    <Route path="history" element={<PredictionHistory />}></Route>
                    <Route path="/home" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </div>
    );
}

export default observer(App);
