import { Link } from "react-router-dom";
import { FormEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../ducks/hooks";
import { login as loginAction } from '../../ducks/auth'

export const Login = () => {
    const err = useAppSelector(store => store.auth.error);
    const dispatch = useAppDispatch();

    const onLogin: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (!form) {
            return;
        }

        const formData = new FormData(form);

        const login = formData.get('login');
        const password = formData.get('password');

        if (!login || !password) {
            return;
        }

        dispatch(loginAction({
            login: login.toString(),
            password: password.toString()
        }))
    }
    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Contacts</h1>
                <form className="auth__form" onSubmit={onLogin}>
                    <label htmlFor="login" />
                    <input type="text" placeholder="Login" id="login" name="login" />
                    <label htmlFor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                    />
                    <button type="submit">Log In</button>
                    <p className="errors">{err}</p>
                </form>
            </div>
        </div>
    );
}
