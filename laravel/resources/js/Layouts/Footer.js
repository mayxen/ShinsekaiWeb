import CopyrightIcon from '@mui/icons-material/Copyright';

import React, {useEffect} from 'react';
import {Link, ListItem} from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Footer() {

    useEffect(() => {
        document.getElementById("cookieconsent").style.display = "block";

        window.cookieconsent.initialise({
            container: document.getElementById("cookieconsent"),
            onPopupClose: function () {
                document.getElementById("cookieconsent").style.display = "none";
            },
            onInitialise: function (status) {
                if (status === "dismiss" || status === "deny" || status === "allow")
                    document.getElementById("cookieconsent").style.display = "none";
            },
            content: {
                message: 'Esta web emplea el uso de cookies para mejorar su experiencia.',
                dismiss: 'De acuerdo',
                allow: 'Permitir cookies',
                deny: 'Rechazar',
                showLink: 'false',
                link: 'Más información',
                href: 'https://www.defyhome.com/defyhome-cookies',
                close: '&#x274c;',
                policy: 'Cookie Policy',
                target: '_blank',
            },
            cookie: {
                name: "defyhome_cookies",
            },
            type: "opt-out",
        })
    }, []);

    return (
        <>
            <div id="cookieconsent"/>
            <div className={'footer containerModal'}>
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
                        <div>
                            <p className={"footer-columnHead"}>Soporte</p>
                            <ListItem><Link href={"/frequently-asked-questions"}>Preguntas frecuentes</Link></ListItem>
                            <ListItem><Link href={"/defyhome-customer-service"}>Atención al cliente</Link></ListItem>
                            <ListItem><Link href={"/"}/></ListItem>
                        </div>
                        <div>
                            <p className={"footer-columnHead"}>Legal</p>
                            <ListItem><Link href={"/defyhome-privacy-policy"}>Política Privacidad</Link></ListItem>
                            <ListItem><Link href={"/defyhome-cookies"}>Cookies</Link></ListItem>
                        </div>
                        <div>

                        </div>
                    </div>
                    <Divider className={"footer-divider"}/>
                    <div className={'secondary-Section-Footer'}>
                        <div className={'navigation-footer'}>
                            <ListItem><Link href={"/"}>Home</Link></ListItem>
                            <ListItem><Link href={"/about"}>About</Link></ListItem>
                            <ListItem><Link href={"/search"}>Viviendas</Link></ListItem>
                            <ListItem><Link href={"/defyhome-privacy-policy"}>Privacidad</Link></ListItem>
                            <ListItem><Link href={"/contact"}>Contacto</Link></ListItem>
                        </div>
                        <div className={'footer-copyright-message-div'}>
                            <p className={'footer-copyright-message'}>Copyright © 2021 Defyhome </p>
                            <p className={'footer-copyright-message'}>© of their respective owners</p>
                        </div>
                        <div className={'social-links'}>

                        </div>
                        <div className={"icon"}>
                            DEFY
                            <CopyrightIcon/>
                            HOME
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
