import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import React from "react";
import {Head} from "@inertiajs/inertia-react";
import Web from "@/Layouts/Web";
import {Divider} from "@mui/material";

export default function Contact() {

    return (
        <Web>
            <Head title="Contacto"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Contáctanos</h1></Divider>
            <div className={"about"}>
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe width="500" height="400" id="gmap_canvas"
                                src="https://maps.google.com/maps?q=Local63/64,CentroAtlantico,PuertodelCarmen,Tias,35510=&output=embed"
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                    </div>
                </div>
                <div className={"about-data"}>
                    <h2>Información de contacto</h2>
                    <p>Arrecife de Lanzarote, Las Palmas de Gran Canaria. España</p>
                    <p>Local 63/64, Centro Atlantico, Puerto del Carmen, Tias, 35510</p>
                    <p><PhoneIcon/>+34 900 233 157</p>
                    <p><EmailIcon/>defyhome@defyhome.com</p>
                </div>
            </div>
        </Web>
    )
}
