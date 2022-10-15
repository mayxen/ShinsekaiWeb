import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import {useState} from "react";
import axios from "axios";
import ModalHomeTypes from "@/Pages/Admin/ModalHomeTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Alert, Snackbar} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export default function ContentHomeTypes({data}) {
    const [categories, setCategories] = useState(data);
    const [categoriesAux, setCategoriesAux] = useState(data);
    const [category, setCategory] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [homeTypeDelete, setHomeTypeDelete] = useState({});
    const [openAlert, setOpenAlert] = useState(false);

    const filterValue = [
        {name: 'type', operator: 'startsWith', type: 'string', value: 'B'},
    ]

    const columns = [
        {
            field: 'type',
            headerName: 'Tipo',
            width: 150,
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
                        setHomeTypeDelete(params.row);
                        setOpenAlert(true);
                    }}
                />
            ],
        }
    ];

    const handleEditClick = (id) => {
        setType("Editar");
        const categoria = categories.filter((categoria) => categoria.id === id);
        setCategory(() => {
                return {
                    id: id,
                    type: categoria[0].type,
                }
            }
        );
        setOpen(true);
    }

    const deleteCategory = (id) => {
        axios.delete(`/admin/home_type_delete/${id}`)
            .then(res => {
                setCategories((prevCategorias) =>
                    prevCategorias.filter((categoria) => categoria.id !== id)
                )
                setHomeTypeDelete({});
                setOpenAlert(false);
            })
            .catch(e => console.log('FALLO EN DELETE', e));
    }

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(searchValue.target.value, 'i');
        const filteredRows = categoriesAux.filter((row) => {
            return Object.keys(row).some((field) => {
                if (row[field] && (field === 'type')) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setCategories(filteredRows);
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
                                placeholder="Buscar por tipo de casa"
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
                                <Button variant="contained" onClick={() => {
                                    setType("Crear");
                                    setOpen(true);
                                    setCategory(() => {
                                            return {
                                                type: "",
                                            }
                                        }
                                    )
                                }}>
                                    Añadir Tipo de casa
                                </Button>
                                <ModalHomeTypes setCategories={setCategories} open={open} setOpen={setOpen} type={type}
                                                category={category} setCategory={setCategory}
                                                setToastOpen={setToastOpen} setCategoriesAux={setCategoriesAux}/>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                categories.length <= 0 &&
                <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                    No hay Tipos de casa aún
                </Typography>
            }
            {
                categories.length > 0 &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        disableColumnMenu={true}
                        rows={categories}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        defaultFilterValue={filterValue}
                    />
                </div>
            }
            {
                toastOpen &&
                <Snackbar open={toastOpen} autoHideDuration={5000}
                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                          onClose={() =>
                              setToastOpen(false)}
                >
                    <Alert severity="success" sx={{width: '100%'}}
                           onClose={() => setToastOpen(false)}
                    >
                        Se ha añadido el tipo de casa: {category.type}
                    </Alert>
                </Snackbar>
            }
            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {`Vas a borrar el tipo de casa ${homeTypeDelete.type}`}
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
                        deleteCategory(homeTypeDelete.id);
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
