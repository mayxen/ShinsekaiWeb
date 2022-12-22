//icons
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';

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
import Button from "@mui/material/Button";
import {Alert, FormControl, FormControlLabel, FormGroup, Snackbar, Switch} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ModalEvent from "@/Pages/Admin/ModalEvent";

export default function ContentEvent({data}) {
    const [events, setEvents] = useState(data);
    const [eventsAux, setEventsAux] = useState(data);
    const [oneEvent, setOneEvent] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [withTrashedButton, setWithTrashedButton] = useState(false);
    const [eventDelete, setEventDelete] = useState({});
    const [isTrueDelete, setIsTrueDelete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'title',
            headerName: 'Titulo',
            width: 150,
            editable: true,
        },
        {
            field: 'eventDate',
            headerName: 'Fecha',
            width: 150,
            editable: true,
        },
        {
            field: 'visible',
            headerName: 'Visible',
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
                        setIsTrueDelete(false);
                        setEventDelete(params.row);
                        setOpenAlert(true);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    style={{display: withTrashedButton ? '' : 'none', 'color': 'red'}}
                    onClick={() => {
                        setIsTrueDelete(true);
                        setEventDelete(params.row);
                        setOpenAlert(true);
                    }}
                />,
                <GridActionsCellItem
                    icon={<RestoreIcon/>}
                    label="restore"
                    style={{display: withTrashedButton ? '' : 'none', 'color': 'red'}}
                    onClick={() => {
                        restoreEvent(params.row.id);
                    }}
                />
            ],
        }
    ];

    const handleEditClick = (id) => {
        setType("Editar");
        const oneNew = events.filter((oneNew) => oneNew.id === id);
        setOneEvent(() => {
                return {
                    id: id,
                    title: oneNew[0].title,
                    resume: oneNew[0].resume,
                    description: oneNew[0].description,
                    visible: oneNew[0].visible,
                    date: oneNew[0].date,
                    image: oneNew[0].image,
                }
            }
        );
        setOpen(true);
    }

    const trueDeleteEvent = (id) => {
        axios.delete(`/admin/event_true_delete/${id}`)
            .then(res => {
                setEvents((prevUsers) =>
                    prevUsers.filter((oneEvent) => oneEvent.id !== id)
                )
                setEventDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const deleteEvent = (id) => {
        axios.delete(`/admin/event_delete/${id}`)
            .then(res => {
                setEvents((prevUsers) =>
                    prevUsers.filter((oneEvent) => oneEvent.id !== id)
                )
                setEventDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const restoreEvent = (id) => {
        axios.delete(`/admin/event_restore/${id}`)
            .then(res => {
                alert("restaurado!");
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const toggleTrashed = (isWithTrashed) => {
        axios.post("/admin/event_trashed/", {'isWithTrashed': isWithTrashed})
            .then(response => {
                setWithTrashedButton(isWithTrashed);
                setEvents(response.data);
                setEventsAux(response.data);
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
            });
    }

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = eventsAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'name')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setEvents(filteredRows);
    }

    return (
        <Paper sx={{maxWidth: 1450, margin: 'auto', overflow: 'hidden'}}>
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
                                placeholder="Buscar eventos"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                                onChange={requestSearch}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl sx={{m: 1, minWidth: 75}}>
                                <FormGroup>
                                    <FormControlLabel
                                        label="Mostrar borrados"
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                checked={withTrashedButton}
                                                value={withTrashedButton}
                                                name="trashed"
                                                onChange={(e) => toggleTrashed(e.target.checked)}
                                            />
                                        }
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => {
                                setType("Crear");
                                setOneEvent(() => {
                                        return {
                                            id: "",
                                            title: "",
                                            resume: "",
                                            image: "",
                                            description: "",
                                            date: "",
                                            visible: false,
                                        }
                                    }
                                )
                                setOpen(true);
                            }}>
                                Añadir evento
                            </Button>
                            <ModalEvent setEvents={setEvents} open={open} setOpen={setOpen} type={type}
                                        oneEvent={oneEvent} setEvent={setOneEvent} setEventAux={setEventsAux}
                                        setToastOpen={setToastOpen} setWithTrashedButton={setWithTrashedButton}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {events.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay eventos aún
                </Typography>
            }
            {events.length > 0 &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={events}
                        getRowClassName={(params) => params.row.deleted_at ? "row_deleted" : params.row.visible ? "" : "row_not_visible"}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
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
                        Se ha añadido el evento: {oneEvent.name}
                    </Alert>
                </Snackbar>
            }
            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {`Vas a borrar el eventos ${eventDelete.title}`}
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
                        if (isTrueDelete)
                            trueDeleteEvent(eventDelete.id)
                        else
                            deleteEvent(eventDelete.id);
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
