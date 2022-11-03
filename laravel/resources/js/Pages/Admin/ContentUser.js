//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import ModalUser from "./ModalUser";
import {Alert, Snackbar} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export default function ContentUser({data}) {
    const [users, setUsers] = useState(data);
    const [usersAux, setUsersAux] = useState(data);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [userDelete, setUserDelete] = useState({});
    const [openAlert, setOpenAlert] = useState(false);

    const columns = [
        {
            field: 'name',
            headerName: 'Nombre',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'isAdmin',
            headerName: 'Administrador',
            width: 150,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'isNew',
            headerName: 'Editar Noticias',
            width: 150,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'isGallery',
            headerName: 'Editar Galeria',
            width: 150,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'isEvent',
            headerName: 'Editar eventos',
            width: 150,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Edit"
                    onClick={() => handleEditClick(params.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => {
                        setUserDelete(params.row);
                        setOpenAlert(true);
                    }}
                />
            ],
        }
    ];

    const handleEditClick = (id) => {
        setType("Editar");
        const user = users.filter((user) => user.id === id);
        setUser(() => {
                return {
                    id: id,
                    name: user[0].name,
                    email: user[0].email,
                    password: "",
                    isAdmin: user[0].isAdmin,
                    isNew: user[0].isNew,
                    isGallery: user[0].isGallery,
                    isEvent: user[0].isEvent,
                }
            }
        );
        setOpen(true);
    }

    const deleteUser = (id) => {
        axios.delete(`/admin/user_delete/${id}`)
            .then(res => {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
                )
                setUserDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = usersAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'name')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setUsers(filteredRows);
    }

    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{display: 'block'}}/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Buscar usuarios"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                                onChange={requestSearch}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => {
                                setType("Crear");
                                setUser(() => {
                                        return {
                                            name: "",
                                            email: "",
                                            password: "",
                                            isAdmin: false,
                                            isGallery: false,
                                            isNew: false,
                                            isEvent: false,
                                        }
                                    }
                                )
                                setOpen(true);
                            }}>
                                Añadir Usuario
                            </Button>
                            <ModalUser setUsers={setUsers} open={open} setOpen={setOpen} type={type}
                                       user={user} setUser={setUser} setUsersAux={setUsersAux}
                                       setToastOpen={setToastOpen}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {users.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay usuarios aún
                </Typography>
            }
            {users.length > 0 &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={users}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            }
            {toastOpen &&
                <Snackbar open={toastOpen} autoHideDuration={5000}
                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                          onClose={() =>
                              setToastOpen(false)}
                >
                    <Alert severity="success" sx={{width: '100%'}}
                           onClose={() => setToastOpen(false)}
                    >
                        Se ha añadido el usuario: {user.name}
                    </Alert>
                </Snackbar>
            }
            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {`Vas a borrar el usuario ${userDelete.name}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAlert(false)} autoFocus>
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        deleteUser(userDelete.id);
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
