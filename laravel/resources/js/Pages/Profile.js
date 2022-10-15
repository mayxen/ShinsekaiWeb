//icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React from "react";
import axios from "axios";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useSnackbar} from 'notistack';
import Web from "@/Layouts/Web";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

export default function Profile() {
    const {data, setData} = useForm({
        'oldPassword': '',
        'newPassword': '',
        'confirmNewPassword': '',
        'name': '',
        'email': '',
        'phoneNumber': '',
    });
    const {auth} = usePage().props;

    const MIN_USERNAME_LENGTH = 3;
    const MAX_USERNAME_LENGTH = 20;

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    function submitPassword() {
        axios.put(route('update-profile', auth.user.id), {
            'oldPassword': data.oldPassword,
            'newPassword': data.newPassword,
            'confirmNewPassword': data.confirmNewPassword,
        })
            .then(res => {
                if (res.data.errors) {
                    enqueueSnackbar(res.data.errors, {
                        variant: "warning",
                        autoHideDuration: 3000
                    })
                } else {
                    enqueueSnackbar("Contraseña actualizada correctamente", {
                        variant: "success",
                        autoHideDuration: 3000
                    });
                    setData(data.oldPassword, "");
                    setData(data.newPassword, "");
                    setData("confirmNewPassword", "");
                }
            })
            .catch(e => {
                    enqueueSnackbar("Ha habido un error al actualizar la contraseña", {
                        variant: "warning",
                        autoHideDuration: 3000
                    })
                }
            )
    }

    function submitName() {
        axios.put(route('update-profile', auth.user.id), {
            'name': data.name,
        })
            .then(res => {
                if (res.data.errors) {
                    enqueueSnackbar(res.data.errors, {
                        variant: "warning",
                        autoHideDuration: 3000
                    })
                } else {
                    enqueueSnackbar("Se ha actualizado correctamente el nombre de usuario", {
                        variant: "success",
                        autoHideDuration: 3000
                    });
                    setData("name", "");
                }
            })
            .catch(e =>
                enqueueSnackbar("Ha habido un error al actualizar el nombre de usuario", {
                    variant: "warning",
                    autoHideDuration: 3000
                })
            )
    }

    function submitEmail() {
        axios.put(route('update-profile', auth.user.id), {
            'email': data.email,
        })
            .then(res => {
                if (res.data.errors) {
                    enqueueSnackbar(res.data.errors, {
                        variant: "warning",
                        autoHideDuration: 3000
                    })
                } else {
                    enqueueSnackbar("Se ha actualizado correctamente el email", {
                        variant: "success",
                        autoHideDuration: 3000
                    });
                    setData("email", "");
                }
            })
            .catch(e =>
                enqueueSnackbar("Ha habido un error al actualizar el email", {
                    variant: "warning",
                    autoHideDuration: 3000
                })
            )
    }

    function submitPhoneNumber() {
        axios.put(route('update-profile', auth.user.id), {
            'phoneNumber': data.phoneNumber,
        })
            .then(res => {
                if (res.data.errors) {
                    enqueueSnackbar(res.data.errors, {
                        variant: "warning",
                        autoHideDuration: 3000
                    })
                } else {
                    enqueueSnackbar("Teléfono actualizado correctamente", {
                        variant: "success",
                        autoHideDuration: 3000
                    });
                    setData("phoneNumber", "");
                }
            })
            .catch(e =>
                enqueueSnackbar("Ha habido un error al actualizar el teléfono", {
                    variant: "warning",
                    autoHideDuration: 3000
                })
            )
    }

    // Validar nueva contraseña
    function validatePassword() {
        if (data.newPassword.length > 3 && data.confirmNewPassword.length > 3) {
            if (data.newPassword === data.confirmNewPassword) {
                submitPassword();
            } else {
                enqueueSnackbar("Las nuevas contraseñas no coinciden", {
                    variant: "warning",
                    autoHideDuration: 3000
                })
            }
        } else {
            enqueueSnackbar("Escriba una contraseña de más de 3 caracteres", {
                variant: "warning",
                autoHideDuration: 3000
            })
        }
    }

    // Validar nombre de usuario
    function validateName() {
        if (data.name.length >= MIN_USERNAME_LENGTH && data.name.length <= MAX_USERNAME_LENGTH) {
            submitName();
        } else {
            enqueueSnackbar("Escriba un nombre de usuario de entre 3 y 20 caracteres", {
                variant: "warning",
                autoHideDuration: 3000
            })
        }
    }

    function validateEmail() {
        if (data.email.length >= 6) {
            submitEmail();
        } else {
            enqueueSnackbar("Escriba un email válido", {
                variant: "warning",
                autoHideDuration: 3000
            })
        }
    }

    function validatePhone() {
        let regex = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
        if (regex.test(data.phoneNumber)) {
            submitPhoneNumber();
        } else {
            enqueueSnackbar("Escriba un teléfono válido", {
                variant: "warning",
                autoHideDuration: 3000
            })
        }
    }

    return (
        <Web className={"profileUserPage"}>
            <Head title="Defyhome - Perfil de usuario"/>
            <Divider className={"about-title"} sx={{width: "80%"}} variant="middle"><h1>Perfil de usuario</h1></Divider>
            <div className={'containerModal'}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span><b>Contraseña</b></span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack>
                            {/*Contraseña actual*/}
                            <TextField
                                margin="dense"
                                name="oldPassword"
                                label="Contraseña actual"
                                value={data.oldPassword}
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />

                            {/*Nueva contraseña*/}
                            <TextField
                                margin="dense"
                                name="newPassword"
                                label="Nueva contraseña"
                                value={data.newPassword}
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />

                            {/*Confirmar nueva contraseña*/}
                            <TextField
                                margin="dense"
                                name="confirmNewPassword"
                                label="Confirmar nueva contraseña"
                                value={data.confirmNewPassword}
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />
                            <Button className="change-password-button" variant="contained"
                                    onClick={validatePassword}> Cambiar contraseña</Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span><b>Nombre</b></span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack>
                            {/*Nombre actual*/}
                            <TextField
                                margin="dense"
                                name="name"
                                label="Nombre"
                                value={data.name}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />
                            <Button className="change-password-button" variant="contained"
                                    onClick={validateName}> Cambiar nombre</Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span><b>Email</b></span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack>
                            {/*Email actual*/}
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email"
                                value={data.email}
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />

                            <Button className="change-password-button" variant="contained"
                                    onClick={validateEmail}> Cambiar email</Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span><b>Teléfono</b></span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack>
                            {/*Teléfono actual*/}
                            <TextField
                                margin="dense"
                                name="phoneNumber"
                                label="Teléfono"
                                value={data.phoneNumber}
                                type="tel"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />

                            <Button className="change-password-button" variant="contained"
                                    onClick={validatePhone}> Cambiar teléfono</Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Web>
    );
}

