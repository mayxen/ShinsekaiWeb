import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import styled from "@emotion/styled";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {Divider} from "@mui/material";

export default function FAQ({children}) {
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({theme}) => ({
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: "5px",
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
            {...props}
        />
    ))(({theme}) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    return (
        <Web>
            <Head title="Defyhome - FAQ"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Preguntas más frecuentes</h1>
            </Divider>
            <div className={"container faq-Accordion"}>
                <h2 className={"about-title"}> F.A.Q. (Frequently Asked Questions)</h2>
                <Accordion sx={{mt: 2}}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <h2>¿Qué es Defyhome y cómo funciona?</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Defyhome es una directorio de viviendas para vender o comprar/alquilar. Para poder empezar a
                            utilizar Defyhome basta con registrarte
                            a Google o creando una cuenta en Defyhome.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h2>Alquilar, comprar o vender de forma segura</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Tips para una compra/alquiler de forma segura:
                        </p>
                        <p>
                            ⚠️ No envíes dinero por adelantado, ni como “señal”, “entrada”, “reserva” ni cualquier otra
                            razón, sin haber visitado el inmueble.
                        </p>
                        <p>
                            ⚠️ Desconfía si el precio de un anuncio es muy inferior al precio de mercado.
                        </p>
                        <p>
                            ⚠️ Desconfía de anunciantes que no pueden hablar por teléfono por cualquier excusa.
                        </p>
                        <p>
                            ⚠️ Desconfía de anunciantes que te envíen enlaces sospechosos.
                        </p>
                        <p>
                            ⚠️ Recuerda que Defyhome no interviene como intermediario en la transacción de compraventa o
                            alquiler, sólo somos una plataforma de encuentro entre oferta y demanda. Nunca te pediremos
                            tu contraseña, número de cuenta bancaria, transferencias ni pagos por servicios que tú no
                            hayas solicitado en nuestra web.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <h2>¿Cómo puedo buscar viviendas en Defyhome?</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Para buscar en Defyhome debes acceder a la página principal. Y seleccionar:
                        </p>
                        <ul>
                            <li><b>Tipo de transacción ( Compra / Alquiler / Compartir )</b></li>
                            <li><b>Tipo de inmueble ( Vivienda / Local / Garaje / Trastero / Ático ...)</b></li>
                            <li><b>Ciudad</b></li>
                        </ul>
                        <p>Ahora podrás usar el buscador aplicando los filtros por precio, m2, nº de habitaciones...</p>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={"container faq-Accordion"}>
                <Accordion>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <h2>¿Cómo puedo modificar mis datos?</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Para modificar su perfil y sus datos, tales como su nombre de usuario, email, contraseña y
                            teléfono, lo podrá encontrar en la parte superior derecha de la web, accediendo a la opción
                            "Mi perfil".
                            También puede acceder directamente en este enlace:
                            &nbsp;<Link href={"/profile"}>Mi perfil</Link>
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                        <h2>El anunciante no responde a mis mensajes</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Defyhome no interviene en el proceso de comunicación entre anunciante y posible comprador.
                            Si el anunciante no te ha respondido, es posible que todavía no haya leído tu mensaje.
                            Si has contactado con un inmueble, el propietario recibe directamente tu mensaje para que
                            podáis mantener una comunicación ágil y fluída.
                        </p>
                        <p>
                            Otra opción que dispones es contactar telefónicamente con el anunciante, a través del número
                            de teléfono que verás en el anuncio.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                        <h2>He perdido mi contraseña ¿cómo la recupero?</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Si ha perdido su clave puede recuperarla a través de nuestro sistema de recuperación
                            de contraseñas. Le mandaremos lo antes posible un enlace a su nueva clave al correo
                            con el que se registró en Defyhome para que pueda cambiarla.
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Web>
    );
}
