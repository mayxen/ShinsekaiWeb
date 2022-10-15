import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import {Divider} from "@mui/material";
import {Paper, TextareaAutosize, TextField} from "@material-ui/core";
import Button from "@mui/material/Button";

export default function CustomerService() {
    return (
        <Web>
            <Head title="Defyhome - Atención al cliente"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Atención al cliente</h1>
            </Divider>
            <Paper className={"customer-service-paper"} elevation={0}>
                <form>
                    <h3>Nombre completo</h3>
                    <TextField className={"customer-service-textfield"} type="text" placeholder={"Su nombre"}/>
                    <h3>Correo</h3>
                    <TextField className={"customer-service-textfield"} type="email" placeholder={"Su correo"}/>
                    <h3>Escriba su mensaje:</h3>
                    {screen.width >= 834 &&
                        <TextareaAutosize
                            minRows={10}
                            maxRows={10}
                            aria-label="maximum height"
                            style={{
                                width: 800, height: 250,
                                minWidth: 800, minHeight: 250,
                                maxWidth: 800, maxHeight: 250
                            }}
                        />
                    }
                    {screen.width < 834 &&
                        <TextareaAutosize
                            minRows={4}
                            maxRows={4}
                            aria-label="maximum height"
                            style={{
                                width: 290, height: 190,
                                minWidth: 290, minHeight: 190,
                                maxWidth: 290, maxHeight: 190
                            }}
                        />
                    }
                </form>
                <Button className={"customer-service-button"} variant={"contained"}>Contactar</Button>
            </Paper>
        </Web>
    );
}
