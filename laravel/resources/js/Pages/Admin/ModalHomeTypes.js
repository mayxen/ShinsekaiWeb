import * as React from 'react';
import {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalHomeTypes({
                                           setCategories,
                                           open,
                                           setOpen,
                                           type,
                                           category,
                                           setCategory,
                                           setToastOpen,
                                           setCategoriesAux
                                       }) {
    const [categoryNameError, setCategoryNameError] = useState(false);
    const [categoryNameHelperText, setCategoryNameHelperText] = useState("");

    const handleClose = () => {
        setCategoryNameError(false);
        setCategoryNameHelperText("");
        setOpen(false);
    };

    const displayToast = () => {
        setToastOpen(true);
    };

    function validateCategory() {
        if (category.type.length < 1) {
            setCategoryNameError(true);
            setCategoryNameHelperText("El campo nombre de tipo de casa es imprescindible");
            return false;
        } else {
            setCategoryNameError(false);
            setCategoryNameHelperText("");
            return true;
        }
    }

    const createCategory = () => {
        if (validateCategory()) {
            axios.post("/admin/home_type_add", category)
                .then(response => {
                    setCategories(response.data);
                    setCategoriesAux(response.data);
                    displayToast();
                    handleClose();
                })
                .catch(e => {
                    console.log("ERROR EN POST", e);
                    setCategoryNameHelperText(e.response.data.errors.type[0] + " " + category.type);
                    setCategoryNameError(true);
                });
        }
    };

    const updateCategory = () => {
        if (validateCategory()) {
            axios.put(`/admin/home_type_update/${category.id}`, category)
                .then(response => {
                    setCategories(response.data);
                    setCategoriesAux(response.data);
                    handleClose();
                })
                .catch(e => {
                    console.log("ERROR EN PUT", e)
                    setCategoryNameHelperText(e.response.data.errors.type[0]);
                });
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{type === "Editar" ? "Editar un tipo de casa" : "Añadir un tipo de casa"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca los datos del tipo de casa
                </DialogContentText>
                <TextField
                    error={categoryNameError}
                    margin="dense"
                    name="type"
                    label="Tipo de casa"
                    type="text"
                    helperText={categoryNameHelperText}
                    fullWidth
                    variant="standard"
                    placeholder="Ejemplo: Ático"
                    value={category.type}
                    onChange={(e) => {
                        setCategory({
                            ...category,
                            type: e.target.value
                        });
                    }}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={type === "Editar" ? updateCategory : createCategory}>
                    {type === "Editar" ? "Editar Categoría" : "Añadir Categoría"}</Button>
            </DialogActions>
        </Dialog>
    );
}
