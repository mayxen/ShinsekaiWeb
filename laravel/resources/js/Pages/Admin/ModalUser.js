//Icons
import CheckIcon from '@mui/icons-material/Check';

import * as React from 'react';
import {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';

export default function ModalUser({setUsers, open, setOpen, type, user, setUser, setUsersAux, setToastOpen}) {
    const [Adminselected, setAdminselected] = useState(false);
    const [Galleryselected, setGalleryselected] = useState(false);
    const [Eventselected, setEventselected] = useState(false);
    const [Newselected, setNewselected] = useState(false);
    const [userNameHelperText, setUserNameHelperText] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [userEmailHelperText, setUserEmailHelperText] = useState("");
    const [userEmailError, setUserEmailError] = useState(false);
    const [userPasswordHelperText, setUserPasswordHelperText] = useState("");
    const [userPasswordError, setUserPasswordError] = useState(false);
    const handleClose = () => {
        setUserNameHelperText("");
        setUserEmailHelperText("");
        setUserNameError(false);
        setUserEmailError(false);
        setOpen(false);
    };

    const displayToast = () => {
        setToastOpen(true);
    };

    function userNameIsEmpty() {
        if (user.name.length === 0) {
            setUserNameError(true);
            setUserNameHelperText("El campo nombre de usuario es imprescindible");
            return true;
        }
        setUserNameError(false);
        setUserNameHelperText("");
        return false;
    }

    function emailIsEmpty() {
        if (user.email.length === 0) {
            setUserEmailError(true);
            setUserEmailHelperText("El campo email de usuario es imprescindible");
            return true;
        }
        setUserEmailError(false);
        setUserEmailHelperText("");
        return false;
    }

    function passwordIsEmpty() {
        if (user.password === undefined) {
            setUserPasswordError(true);
            setUserPasswordHelperText("El campo contraseña es imprescindible");
            return true;
        }
        setUserPasswordError(false);
        setUserPasswordHelperText("");
        return false;
    }

    function validateUser() {
        if (userNameIsEmpty()) return false;
        if (emailIsEmpty()) return false;
        return !passwordIsEmpty();
    }

    function checkErrorOriginAndGiveFeedback(e) {
        if (typeof e.response.data !== 'undefined') {
            if (typeof e.response.data.errors.name !== 'undefined') {
                setUserNameHelperText(e.response.data.errors.name[0]);
                setUserNameError(true);
            }
            if (typeof e.response.data.errors.email !== 'undefined') {
                setUserEmailHelperText(e.response.data.errors.email[0]);
                setUserEmailError(true);
            }
        }
    }

    const createUser = () => {
        if (validateUser()) {
            axios.post("/admin/user_add", user)
                .then(response => {
                    setUser(() => {
                        return {
                            name: "",
                            email: "",
                            password: "",
                            isAdmin: false,
                            isGallery: false,
                            isEvent: false,
                            isNew: false,
                        }
                    });
                    setUsers(response.data);
                    setUsersAux(response.data);
                    displayToast();
                    handleClose();
                })
                .catch(e => {
                    console.log("ERROR EN POST", e);
                    checkErrorOriginAndGiveFeedback(e);
                });
        }
    };

    const updateUser = () => {
        if (validateUser()) {
            axios.put(`/admin/user_update/${user.id}`, user)
                .then(response => {
                    setUser(() => {
                        return {
                            name: "",
                            email: "",
                            password: "",
                            isAdmin: false,
                            isGallery: false,
                            isEvent: false,
                            isNew: false,
                        }
                    });
                    setUsers(response.data);
                    setUsersAux(response.data);
                    handleClose();
                })
                .catch(e => {
                    console.log("ERROR EN PUT", e)
                    checkErrorOriginAndGiveFeedback(e);
                });
        }
    };

    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>{type === "Editar" ? "Editar un usuario" : "Añadir un usuario"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca los datos del Usuario
                </DialogContentText>

                {/*nombre*/}
                <TextField
                    margin="dense"
                    name="name"
                    error={userNameError}
                    label="Nombre"
                    placeholder="Thomas Richard"
                    type="text"
                    fullWidth
                    helperText={userNameHelperText}
                    variant="standard"
                    value={user.name}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            name: e.target.value
                        });
                    }}
                />

                {/*email*/}
                <TextField
                    margin="dense"
                    name="email"
                    error={userEmailError}
                    label="Email"
                    placeholder="example@xmail.com"
                    type="email"
                    autoComplete="off"
                    fullWidth
                    helperText={userEmailHelperText}
                    variant="standard"
                    value={user.email}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            email: e.target.value
                        });
                    }}
                />

                {/*password*/}
                <TextField
                    margin="dense"
                    name="password"
                    error={userPasswordError}
                    label="Nueva Contraseña"
                    type="password"
                    fullWidth
                    autoComplete="new-password"
                    helperText={userPasswordHelperText}
                    variant="standard"
                    value={user.password}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            password: e.target.value
                        });
                    }}
                />

                {/*isAdmin*/}
                <ToggleButton
                    value="check"
                    selected={user.isAdmin}
                    onChange={() => {
                        setAdminselected(!Adminselected);
                        setUser({
                            ...user,
                            isAdmin: !Adminselected
                        });
                    }}
                >
                    <CheckIcon/>
                    Admin
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={user.isGallery}
                    onChange={() => {
                        setGalleryselected(!Galleryselected);
                        setUser({
                            ...user,
                            isGallery: !Galleryselected
                        });
                    }}
                >
                    <CheckIcon/>
                    Editar Galeria
                </ToggleButton>

                <ToggleButton
                    value="check"
                    selected={user.isEvent}
                    onChange={() => {
                        setEventselected(!Eventselected);
                        setUser({
                            ...user,
                            isEvent: !Eventselected
                        });
                    }}
                >
                    <CheckIcon/>
                    Editar Eventos
                </ToggleButton>

                <ToggleButton
                    value="check"
                    selected={user.isNew}
                    onChange={() => {
                        setNewselected(!Newselected);
                        setUser({
                            ...user,
                            isNew: !Newselected
                        });
                    }}
                >
                    <CheckIcon/>
                    Editar Noticias
                </ToggleButton>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button variant="contained" onClick={type === "Editar" ? updateUser : createUser}>
                    {type === "Editar" ? "Editar Usuario" : "Añadir Usuario"}</Button>
            </DialogActions>
        </Dialog>
    );
}
