/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AuthUser from "../utils/AuthUser";
import { useNavigate } from "react-router-dom";

// Component

import Menu from "./Menu";
function DashboardTemplate({ children }) {
    const { user, logout } = new AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) logout();
    }, []);

    useEffect(() => {
        if (!user) navigate("/");
    }, []);
    return (
        <div className="max-w-sm mx-auto min-h-screen scroll bg-dark">
            {children}
            <Menu />
        </div>
    );
}

export default DashboardTemplate;
