import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import {Divider} from "@mui/material";

export default function About() {

    return (
        <Web>
            <Head title="Defyhome - Quiénes somos"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Sobre nosotros</h1></Divider>
            <div className={"about"}>
                <div style={{width: "50%"}} className="mapouter">
                    <div className="gmap_canvas">
                        <p>
                            <b>Defyhome es el portal inmobiliario líder en su sector y cuenta con cientos de inmuebles
                                de
                                primera y segunda mano y viviendas de alquiler. Fue fundada en 2022 para ayudar a
                                encontrar un hogar a todas aquellas personas que lo requieran a través de una web actual
                                y
                                moderna.</b>
                        </p>
                        <p>
                            <b>Además de en España, Defyhome tiene presencia en otros países más de Europa y América
                                Latina. La plataforma recibe un promedio de cientos de miles de visitas cada
                                mes.</b>
                        </p>
                    </div>
                </div>
            </div>
        </Web>
    );
}
