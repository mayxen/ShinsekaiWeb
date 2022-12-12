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
import {Alert, FormControl, FormControlLabel, FormGroup, Snackbar, Switch} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ModalNew from "@/Pages/Admin/ModalNew";
import RestoreIcon from "@mui/icons-material/Restore";

export default function ContentNew({data}) {
    const [news, setNews] = useState(data);
    const [newsAux, setNewsAux] = useState(data);
    const [oneNew, setOneNew] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [withTrashedButton, setWithTrashedButton] = useState(false);
    const [newDelete, setNewDelete] = useState({});
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
                        setNewDelete(params.row);
                        setOpenAlert(true);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    style={{display: withTrashedButton ? '' : 'none', 'color': 'red'}}
                    onClick={() => {
                        setIsTrueDelete(true);
                        setNewDelete(params.row);
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

    const restoreEvent = (id) => {
        axios.delete(`/admin/new_restore/${id}`)
            .then(res => {
                alert("restaurado!");
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const handleEditClick = (id) => {
        setType("Editar");
        const oneNew = news.filter((oneNew) => oneNew.id === id);
        setOneNew(() => {
                return {
                    id: id,
                    title: oneNew[0].title,
                    resume: oneNew[0].resume,
                    description: oneNew[0].description,
                    visible: oneNew[0].visible,
                    image: oneNew[0].image,
                }
            }
        );
        setOpen(true);
    }

    const trueDeleteNew = (id) => {
        axios.delete(`/admin/new_true_delete/${id}`)
            .then(res => {
                setNews((prevUsers) =>
                    prevUsers.filter((oneNew) => oneNew.id !== id)
                )
                setNewDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const deleteNew = (id) => {
        axios.delete(`/admin/new_delete/${id}`)
            .then(res => {
                setNews((prevUsers) =>
                    prevUsers.filter((oneNew) => oneNew.id !== id)
                )
                setNewDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const toggleTrashed = (isWithTrashed) => {
        axios.post("/admin/new_trashed/", {'isWithTrashed': isWithTrashed})
            .then(response => {
                setWithTrashedButton(isWithTrashed);
                setNews(response.data);
                setNewsAux(response.data);
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
            });
    }

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = newsAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'name')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setNews(filteredRows);
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
                                placeholder="Buscar noticias"
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
                                setOneNew(() => {
                                        return {
                                            id: "",
                                            title: "",
                                            resume: "",
                                            image: "",
                                            description: "",
                                            visible: false,
                                        }
                                    }
                                )
                                setOpen(true);
                            }}>
                                Añadir noticia
                            </Button>
                            <ModalNew setNews={setNews} open={open} setOpen={setOpen} type={type}
                                      oneNew={oneNew} setNew={setOneNew} setNewAux={setNewsAux}
                                      setToastOpen={setToastOpen} setWithTrashedButton={setWithTrashedButton}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {news.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay noticias aún
                </Typography>
            }
            {news.length > 0 &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={news}
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
                        Se ha añadido la noticia: {oneNew.name}
                    </Alert>
                </Snackbar>
            }
            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {`Vas a borrar la noticia ${newDelete.title}`}
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
                            trueDeleteNew(newDelete.id)
                        else
                            deleteNew(newDelete.id);
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
