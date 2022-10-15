import React, {useEffect, useState} from 'react';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {Breadcrumbs} from "@mui/material";
import {Link} from "@inertiajs/inertia-react";

export default function Breadcrumb() {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        setBreadcrumbs([
            <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
                Inicio
            </Link>,
            <Link
                className={"active-breadcrumb"}
                underline="hover"
                key="2"
                color="inherit"
                href={window.location.pathname.substr(window.location.pathname.lastIndexOf('/'))}
                onClick={handleClick}
            >
            Búsqueda
            </Link>,
        ]);
    }, []);


    function handleClick() {

    }

    return (
        <Breadcrumbs
            className={"breadcrumb"}
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}
