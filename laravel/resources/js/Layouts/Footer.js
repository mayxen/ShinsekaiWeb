import CopyrightIcon from '@mui/icons-material/Copyright';

import React, {useEffect} from 'react';
import {Link, ListItem} from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Footer() {

    return (
        <>
            <div className={'footer'}>
                <div className={'footer-sections-container'}>
                    <div className={'main-Section-Footer'}>
                        <div className={'logo'}>
                            <img src="/storage/logo.png" alt="Logo Defyhome"/>
                        </div>
                        <div>
                            <p className={"footer-columnHead"}>Contacto</p>
                            <ListItem><Link href={"/contact"}>Contactar</Link></ListItem>
                            <ListItem><Link href={"/about"}>Quiénes somos</Link></ListItem>
                            <ListItem><Link href={"/"}/></ListItem>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
