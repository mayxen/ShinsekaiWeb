import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export default function DialogDelete({openAlert, setOpenAlert, numHomes, handleDeleteHomes}) {
    return (
        <Dialog
            open={openAlert}
            onClose={() => setOpenAlert(false)}
        >
            <DialogTitle>
                {`Vas a borrar ${numHomes} casas`}
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
                    handleDeleteHomes();
                    setOpenAlert(false);
                }}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
