import "./App.css";
import UnauthorizedRoutes from "./routes/Unauthorized-Routes";
import AuthorizedRoutes from "./routes/Authorized-Routes";
import firebase_service from "./services/firebase";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    select_authorized,
    set_authorized,
    set_unauthorized
} from "./features/auth/auth-slice";

function App () {
    const dispatch = useDispatch();
    const [loading, set_loading] = useState(true);
    const authorized = useSelector(select_authorized);
    console.log(authorized);
    const auth_state_listener = function () {

        firebase_service.auth.onAuthStateChanged(async function (user) {
            console.log(user);
            if (!user) {
                set_loading(false);
                return dispatch(set_unauthorized());

            }
            set_loading(false);
            const token = await firebase_service.auth.currentUser.getIdToken(true);
            return dispatch(set_authorized(token));

        });

    };

    useEffect(function () {
        auth_state_listener();

    }, [auth_state_listener]);

    return (
        <div className="App bg-black" style={{ padding: 16 }}>
            {loading ? (
                <p>Loading...</p>
            ) : authorized ? (
                <AuthorizedRoutes />
            ) : (
                <UnauthorizedRoutes />
            )}
        </div>
    );


}

export default App;
