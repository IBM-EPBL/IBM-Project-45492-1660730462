import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../helpers";

export const ProtectedRoute = ({ children }) => {
    if (!isUserLoggedIn()) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};
