import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import {Divider} from "@mui/material";

export default function About() {

    return (
        <Web>
            <Head title="Shinsekai - Quiénes somos"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Sobre nosotros</h1></Divider>
            <div className={"about"}>
                <div style={{width: "50%"}} className="mapouter">
                    <div className="gmap_canvas">
                        <p>
                            <b>Aqui un texto sobre lo guay que es shin</b>
                        </p>
                        <p>
                            <b>Weeeeeeeeeeeeeeeeeeeeeeeee</b>
                        </p>
                    </div>
                </div>
            </div>
        </Web>
    );
}
