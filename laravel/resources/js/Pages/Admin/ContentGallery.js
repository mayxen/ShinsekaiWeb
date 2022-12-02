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
import {Alert, FormControl, FormControlLabel, FormGroup, Snackbar, Switch} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ModalGallery from "@/Pages/Admin/ModalGallery";

export default function ContentGallery({data}) {
    const [gallery, setGallery] = useState(data);
    const [galleriesAux, setGalleriesAux] = useState(data);
    const [oneGallery, setOneGallery] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [withTrashedButton, setWithTrashedButton] = useState(false);
    const [eventDelete, setGalleryDelete] = useState({});
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
                        setGalleryDelete(params.row);
                        setOpenAlert(true);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    style={{display: withTrashedButton ? '' : 'none', 'color': 'red'}}
                    onClick={() => {
                        setIsTrueDelete(true);
                        setGalleryDelete(params.row);
                        setOpenAlert(true);
                    }}
                />
            ],
        }
    ];

    const handleEditClick = (id) => {
        setType("Editar");
        const oneGallery = gallery.filter((oneGallery) => oneGallery.id === id);
        setOneGallery(() => {
                return {
                    id: id,
                    title: oneGallery[0].title,
                    resume: oneGallery[0].resume,
                    description: oneGallery[0].description,
                    visible: oneGallery[0].visible,
                    images: oneGallery[0].images,
                    date: oneGallery[0].date,
                }
            }
        );
        setOpen(true);
    }

    const trueDeleteGallery = (id) => {
        axios.delete(`/admin/gallery_true_delete/${id}`)
            .then(res => {
                setGallery((prevUsers) =>
                    prevUsers.filter((oneGallery) => oneGallery.id !== id)
                )
                setGalleryDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const deleteEvent = (id) => {
        axios.delete(`/admin/gallery_delete/${id}`)
            .then(res => {
                setGallery((prevUsers) =>
                    prevUsers.filter((oneGallery) => oneGallery.id !== id)
                )
                setGalleryDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const toggleTrashed = (isWithTrashed) => {
        axios.post("/admin/gallery_trashed/", {'isWithTrashed': isWithTrashed})
            .then(response => {
                setWithTrashedButton(isWithTrashed);
                setGallery(response.data.data);
                setGalleriesAux(response.data.data);
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
            });
    }

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = galleriesAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'name')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setGallery(filteredRows);
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
                                placeholder="Buscar Galería"
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
                                setOneGallery(() => {
                                        return {
                                            id: "",
                                            title: "",
                                            resume: "",
                                            images: [],
                                            description: "",
                                            date: "",
                                            visible: false,
                                        }
                                    }
                                )
                                setOpen(true);
                            }}>
                                Añadir Galería
                            </Button>
                            <ModalGallery setGalleries={setGallery} open={open} setOpen={setOpen} type={type}
                                          oneGallery={oneGallery} setGallery={setOneGallery}
                                          setGalleryAux={setGalleriesAux}
                                          setToastOpen={setToastOpen} setWithTrashedButton={setWithTrashedButton}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {gallery.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay galerías aún
                </Typography>
            }
            {gallery.length > 0 &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={gallery}
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
                        Se ha añadido la galería: {oneGallery.name}
                    </Alert>
                </Snackbar>
            }
            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {`Vas a borrar la galería ${eventDelete.title}`}
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
                            trueDeleteGallery(eventDelete.id)
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
