import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../ducks/hooks";

interface IProtectedRoutesProps {
    auth?: boolean
}

export const ProtectedRoutes = ({ auth = false }: IProtectedRoutesProps) => {
    const authenticated = useAppSelector(store => store.auth.authenticated);
    console.log("Authenticated", authenticated)
    if (authenticated === undefined) {
        return null;
    }

    return (
        authenticated === auth ? <Outlet /> : <Navigate to={auth ? '/' : '/home'} />
    );
}
