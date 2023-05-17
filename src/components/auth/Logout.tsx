import { Link } from "react-router-dom";
import { logout } from "../../ducks/auth";
import { useAppDispatch } from "../../ducks/hooks";

export const Logout = () => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <Link className="logout" to="#" onClick={onLogout}>
            <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </Link>
    );
}
