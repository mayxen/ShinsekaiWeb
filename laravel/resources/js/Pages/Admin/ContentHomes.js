//Icons
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import ModalHomes from "./ModalHomes";
import DialogDelete from "./DialogDelete";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import moment from "moment";

export default function ContentHomes({data, hometypes, homepurchasetypes, cities}) {
    const [homes, setHomes] = useState(data);
    const [homesAux, setHomesAux] = useState(data);
    const [home, setHome] = useState({});
    const [homeTypes, setHomeTypes] = useState(hometypes);
    const [homePurchaseTypes, setHomePurchaseTypes] = useState(homepurchasetypes);
    const [type, setType] = useState("");
    const [open, setOpen] = useState(false);
    const [initialImages, setInitialImages] = useState();
    const [numImagesWhenEdit, setNumImagesWhenEdit] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [disableDeleteButton, setDisableDeleteButton] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const [homeDelete, setHomeDelete] = useState({});
    const [openAlertDeleteOneHome, setOpenAlertDeleteOneHome] = useState(false);

    const currentYear = new Date();

    const handleEditHome = (id) => {
        setType("Editar");
        const home = homes.filter((home) => home.id === id);
        if (home) {
            axios.get(`/admin/get_home_images/${id}`)
                .then(resImages => {
                    setHome(home[0]);
                    setInitialImages(resImages.data);
                    setNumImagesWhenEdit(resImages.data.length);
                    setOpen(true);
                }).catch(e => {
                console.log("FALLO EN GET EDIT", e);
            })
        }
    }

    const deleteHome = (id) => {
        axios.delete(`/admin/home_delete/${id}`)
            .then(res => {
                setHomes((prevProducts) =>
                    prevProducts.filter((product) => product.id !== id)
                )
                setHomeDelete({});
                setOpenAlertDeleteOneHome(false);
            })
            .catch(e => console.log('FALLO EN DELETE HOME', e));
    }

    const handleDeleteHomes = () => {
        axios.post("/admin/homes_delete", selectionModel)
            .then(res => {
                setHomes(res.data.data);
                setSelectionModel([]);
                setDisableDeleteButton(true);
            })
            .catch(e => console.log('FALLO EN POST DELETE HOMES', e))
    }

    const columns = [
        {
            field: 'title',
            headerName: 'Título',
            width: 250,
            headerAlign: 'center',
        },
        {
            field: 'home_type',
            headerName: 'Tipo Vivienda',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'purchase_type',
            headerName: 'Tipo Contrato',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'price',
            headerName: 'Precio',
            headerAlign: 'center',
            type: 'number',
            width: 120,
            align: 'center',
            valueFormatter: (params) => {
                return `${params.value}€`;
            },
        },
        {
            field: 'period_type',
            headerName: 'Perioricidad',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: (params) => {
                if (params.value.length === 2) {
                    return "--";
                } else {
                    return params.value;
                }
            },
        },
        {
            field: 'square_meter',
            headerName: 'Metros cuadrados',
            headerAlign: 'center',
            type: 'number',
            width: 150,
            align: 'center',
            valueFormatter: (params) => {
                return `${params.value}m2`;
            },
        },
        {
            field: 'construction_year',
            headerName: 'Año de construcción',
            width: 170,
            align: 'center',
            valueFormatter: (params) => {
                return moment(params.value).year();
            },
        },
        {
            field: 'address',
            headerName: 'Dirección',
            width: 200,
            headerAlign: 'center',
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
                    onClick={() => handleEditHome(params.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => {
                        setHomeDelete(params.row);
                        setOpenAlertDeleteOneHome(true);
                    }}
                />
            ],
        }
    ];

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = homesAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'title')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setHomes(filteredRows);
    }

    useEffect(() => {
        if (!open) {
            axios.get("/admin/get_homes")
                .then(res => {
                    setHomes(res.data.data);
                })
                .catch(e => {
                    console.log("ERROR EN GET", e);
                });
        }
    }, [open]);

    return (
        <Paper sx={{maxWidth: 1436, height: 720, margin: 'auto'}}>
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
                                placeholder="Buscar casa"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                                onChange={requestSearch}
                            />
                        </Grid>
                        <Grid item>
                            <div>
                                <Button variant="contained"
                                        onClick={() => {
                                            setType("Crear");
                                            setHome(() => {
                                                    return {
                                                        title: "",
                                                        resume: "",
                                                        description: "",
                                                        price: "",
                                                        period_type: "",
                                                        home_type: "",
                                                        home_type_id: 1,
                                                        purchase_type: "",
                                                        home_purchase_type_id: 1,
                                                        square_meter: "",
                                                        construction_year: currentYear,
                                                        garage: false,
                                                        pets: false,
                                                        elevator: false,
                                                        terrace: false,
                                                        garden: false,
                                                        smoker: false,
                                                        furnished: false,
                                                        heating: false,
                                                        rooms: 1,
                                                        bedrooms: 1,
                                                        bathrooms: 1,
                                                        town: "",
                                                        address: "",
                                                        postal_code: "",
                                                        block: "",
                                                        floor: 0,
                                                        door: 0,
                                                        latlng: {lat: 0, lng: 0},
                                                    }
                                                }
                                            )
                                            setOpen(true);
                                        }}>
                                    Añadir Casa
                                </Button>
                                <Badge badgeContent={selectionModel.length} color="primary">
                                    <Button sx={{marginLeft: '10px'}}
                                            variant="contained"
                                            disabled={disableDeleteButton}
                                            color="error"
                                            onClick={() => {
                                                setOpenAlert(true);
                                            }}>
                                        Borrar Casas
                                    </Button>
                                </Badge>
                                <ModalHomes homeTypes={homeTypes}
                                            homePurchaseTypes={homePurchaseTypes}
                                            home={home} setHome={setHome}
                                            setHomes={setHomes}
                                            type={type}
                                            open={open} setOpen={setOpen}
                                            initialImages={initialImages} setInitialImages={setInitialImages}
                                            numImagesWhenEdit={numImagesWhenEdit}
                                            setNumImagesWhenEdit={setNumImagesWhenEdit}
                                            setHomesAux={setHomesAux}
                                            cities={cities}/>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                homes.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay casas aún
                </Typography>
            }
            {
                homes.length > 0 &&
                <div style={{height: "93%", width: '100%'}}>
                    <DataGrid
                        checkboxSelection={true}
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                            if (newSelectionModel.length > 0) {
                                setDisableDeleteButton(false);
                            } else {
                                setDisableDeleteButton(true);
                            }
                        }}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={homes}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        disableSelectionOnClick
                    />
                </div>
            }
            <DialogDelete openAlert={openAlert} setOpenAlert={setOpenAlert} numHomes={selectionModel.length}
                          handleDeleteHomes={handleDeleteHomes}/>

            <Dialog
                open={openAlertDeleteOneHome}
                onClose={() => setOpenAlertDeleteOneHome(false)}
            >
                <DialogTitle>
                    {`Vas a borrar la casa ${homeDelete.title}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAlertDeleteOneHome(false)} autoFocus>
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        deleteHome(homeDelete.id);
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
