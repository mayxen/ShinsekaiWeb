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

export default function ModalNew({
                                     setNews,
                                     open,
                                     setOpen,
                                     type,
                                     oneNew,
                                     setNew,
                                     setNewAux,
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
            setNew({
                ...oneNew,
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

    const createNew = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("new", JSON.stringify(oneNew));
        axios.post("/admin/new_add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setNew(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        description: "",
                        visible: false,
                        image: "",
                    }
                });
                setNews(response.data);
                setNewAux(response.data);
                setWithTrashedButton(false);
                displayToast();
                handleClose();
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
                checkErrorOriginAndGiveFeedback(e);
            });
    };

    const updateNew = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("new", JSON.stringify(oneNew));
        formData.append("_method", "put");

        axios.post(`/admin/new_update/${oneNew.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setNew(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        description: "",
                        image: "",
                        visible: false,
                    }
                });
                setNews(response.data);
                setNewAux(response.data);
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
            <DialogTitle>{type === "Editar" ? "Editar una noticia" : "Añadir una noticia"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca la noticia
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
                            value={oneNew.title}
                            onChange={(e) => {
                                setNew({
                                    ...oneNew,
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
                            value={oneNew.resume}
                            onChange={(e) => {
                                setNew({
                                    ...oneNew,
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
                            src={imageLocal ? oneNew.image : oneNew.image ? "/storage/" + oneNew.image : ""}
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
                    data={oneNew.description}
                    onChange={(event, editor) => {
                        setNew({
                            ...oneNew,
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
                                            checked={oneNew.visible}
                                            value={oneNew.visible}
                                            name="Visible"
                                            onChange={(e) => {
                                                setNew({
                                                    ...oneNew,
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
                <Button variant="contained" onClick={type === "Editar" ? updateNew : createNew}>
                    {type === "Editar" ? "Editar noticia" : "Añadir noticia"}</Button>
            </DialogActions>
        </Dialog>
    );
}
