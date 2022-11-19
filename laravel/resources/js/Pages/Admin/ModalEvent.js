//Icons
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import * as React from 'react';
import {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {Avatar, FormControl, FormControlLabel, FormGroup, Switch} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ModalEvent({
                                     setEvents,
                                     open,
                                     setOpen,
                                     type,
                                     oneEvent,
                                     setEvent,
                                     setEventAux,
                                     setToastOpen,
                                     setWithTrashedButton
                                 }) {

    const [titleHelperText, setTitleHelperText] = useState("");
    const [imageLocal, setImageLocal] = useState(false);
    const [resumeHelperText, setResumeHelperText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [filename, setFilename] = useState({
        visible: true,
        text: ""
    });

    const handleClose = () => {
        setTitleHelperText("");
        setResumeHelperText("");
        setOpen(false);
        setImageLocal(false);
    };

    const displayToast = () => {
        setToastOpen(true);
    };

    function checkErrorOriginAndGiveFeedback(e) {
        if (typeof e.response.data !== 'undefined') {
            if (typeof e.response.data.errors.title !== 'undefined') {
                setTitleHelperText(e.response.data.errors.title[0]);
            }
            if (typeof e.response.data.errors.resume !== 'undefined') {
                setResumeHelperText(e.response.data.errors.resume[0]);
            }
        }
    }

    const handleFileSelect = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            setEvent({
                ...oneEvent,
                image: reader.result
            })
        }
        setImageLocal(true);
        reader.readAsDataURL(event.target.files[0]);
        setSelectedFile(event.target.files[0])
        setFilename({
            visible: false,
            text: event.target.files[0].name
        })
    }

    const createEvent = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("localEvent", JSON.stringify(oneEvent));
        axios.post("/admin/event_add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setEvent(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        description: "",
                        visible: false,
                        image: "",
                    }
                });
                setEvents(response.data);
                setEventAux(response.data);
                setWithTrashedButton(false);
                displayToast();
                handleClose();
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
                checkErrorOriginAndGiveFeedback(e);
            });
    };

    const updateEvent = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("localEvent", JSON.stringify(oneEvent));

        axios.post(`/admin/event_update/${oneEvent.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setEvent(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        description: "",
                        image: "",
                        visible: false,
                    }
                });
                setEvents(response.data);
                setEventAux(response.data);
                setWithTrashedButton(false);
                handleClose();
            })
            .catch(e => {
                console.log("ERROR EN PUT", e)
                checkErrorOriginAndGiveFeedback(e);
            });
    };

    return (
        <Dialog PaperProps={{sx: {width: "100%", height: "100%", maxWidth: "1250px"}}} open={open}
                onClose={() => handleClose()}>
            <DialogTitle>{type === "Editar" ? "Editar un evento" : "Añadir un evento"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca el evento
                </DialogContentText>
                <Grid container
                      direction="row"
                      alignItems="center"
                      spacing={2}>
                    <Grid item xl={6}>
                        {/*title*/}
                        <TextField
                            margin="dense"
                            name="title"
                            error={titleHelperText !== ""}
                            label="Titulo"
                            type="text"
                            fullWidth
                            helperText={titleHelperText}
                            variant="standard"
                            value={oneEvent.title}
                            onChange={(e) => {
                                setEvent({
                                    ...oneEvent,
                                    title: e.target.value
                                });
                            }}
                        />

                        {/*resume*/}
                        <TextField
                            margin="dense"
                            name="resume"
                            error={resumeHelperText !== ""}
                            label="Descripción corta"
                            type="text"
                            autoComplete="off"
                            fullWidth
                            helperText={resumeHelperText}
                            variant="standard"
                            value={oneEvent.resume}
                            onChange={(e) => {
                                setEvent({
                                    ...oneEvent,
                                    resume: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xl={3}>
                        <input type="file" id="filePicker" hidden
                               onChange={handleFileSelect}/>
                        <Avatar
                            alt="No Image"
                            src={imageLocal ? oneEvent.image : oneEvent.image ? "/storage/" + oneEvent.image : ""}
                            sx={{width: 200, height: 200, left: "16vw"}}
                        />
                        <div className="fileName" hidden={filename.visible}>{filename.text}</div>
                        <Button
                            variant="contained"
                            endIcon={<DriveFolderUploadIcon/>}
                            sx={{left: "18vw", marginTop: 2}}
                            onClick={() => document.getElementById('filePicker').click()}
                        >
                            Subir imagen
                        </Button>
                    </Grid>
                </Grid>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                        height: '500px',
                    }}
                    data={oneEvent.description}
                    onChange={(event, editor) => {
                        setEvent({
                            ...oneEvent,
                            description: editor.getData()
                        });
                    }}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "height",
                                "500px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                />
                <fieldset>
                    <legend>Extras</legend>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center">
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Visible"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={oneEvent.visible}
                                            value={oneEvent.visible}
                                            name="Visible"
                                            onChange={(e) => {
                                                setEvent({
                                                    ...oneEvent,
                                                    visible: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </fieldset>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button variant="contained" onClick={type === "Editar" ? updateEvent : createEvent}>
                    {type === "Editar" ? "Editar evento" : "Añadir evento"}</Button>
            </DialogActions>
        </Dialog>
    );
}
