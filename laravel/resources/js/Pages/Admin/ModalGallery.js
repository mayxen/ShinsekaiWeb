//Icons
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import * as React from 'react';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {Avatar, FormControl, FormControlLabel, FormGroup, InputLabel, Switch} from "@mui/material";
import Grid from "@mui/material/Grid";
import AdminImg from "@/Components/ShinComponents/AdminImg";
import {DatePicker} from "@mui/lab";

export default function ModalGallery({
                                         setGalleries,
                                         open,
                                         setOpen,
                                         type,
                                         oneGallery,
                                         setGallery,
                                         setGalleryAux,
                                         setToastOpen,
                                         setWithTrashedButton
                                     }) {

    const [titleHelperText, setTitleHelperText] = useState("");
    const [imageLocal, setImageLocal] = useState(false);
    const [resumeHelperText, setResumeHelperText] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);
    const [filename, setFilename] = useState({
        visible: true,
        text: ""
    });


    useEffect(() => {
        if (selectedFiles.length < 1) return;

        const imageUrls = [];
        selectedFiles.forEach(image => imageUrls.push(URL.createObjectURL(image)));
        setSelectedFilesUrl(imageUrls);
    }, [selectedFiles]);

    const handleClose = () => {
        setTitleHelperText("");
        setResumeHelperText("");
        setOpen(false);
        setImageLocal(false);
        setSelectedFiles([]);
        setSelectedFilesUrl([]);
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
        setImageLocal(true);
        setSelectedFiles([...event.target.files])
    }

    const createGallery = () => {
        const formData = new FormData();
        selectedFiles.forEach((e, i) => {
            formData.append("file" + i, e);
        })
        formData.append("Gallery", JSON.stringify(oneGallery));
        axios.post("/admin/gallery_add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setGallery(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        description: "",
                        date: "",
                        visible: false,
                        images: [],
                    }
                });
                setGalleries(response.data.data);
                setGalleryAux(response.data.data);
                setWithTrashedButton(false);
                displayToast();
                handleClose();
            })
            .catch(e => {
                console.log("ERROR EN POST", e);
                checkErrorOriginAndGiveFeedback(e);
            });
    };

    const updateGallery = () => {
        const formData = new FormData();
        formData.append("files", selectedFiles);
        formData.append("Gallery", JSON.stringify(oneGallery));

        axios.post(`/admin/gallery_update/${oneGallery.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                setGallery(() => {
                    return {
                        id: "",
                        title: "",
                        resume: "",
                        date: "",
                        description: "",
                        images: [],
                        visible: false,
                    }
                });
                setGalleries(response.data.data);
                setGalleryAux(response.data.data);
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
            <DialogTitle>{type === "Editar" ? "Editar una galería" : "Añadir una galería"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca la galería
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
                            value={oneGallery.title}
                            onChange={(e) => {
                                setGallery({
                                    ...oneGallery,
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
                            value={oneGallery.resume}
                            onChange={(e) => {
                                setGallery({
                                    ...oneGallery,
                                    resume: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <InputLabel>Fecha del evento</InputLabel>
                        <DatePicker
                            views={['year', "month", "day"]}
                            id="date"
                            value={oneGallery.date}
                            onChange={(newValue) => {
                                setGallery({
                                    ...oneGallery,
                                    date: newValue.format('YYYY/MM/DD')
                                });
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                        />
                    </Grid>
                </Grid>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                        height: '500px',
                    }}
                    data={oneGallery.description}
                    onChange={(event, editor) => {
                        setGallery({
                            ...oneGallery,
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
                                            checked={oneGallery.visible}
                                            value={oneGallery.visible}
                                            name="Visible"
                                            onChange={(e) => {
                                                setGallery({
                                                    ...oneGallery,
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
                <Button
                    variant="contained"
                    endIcon={<DriveFolderUploadIcon/>}
                    sx={{marginTop: 2}}
                    onClick={() => document.getElementById('filePicker').click()}
                >
                    Subir imagenes
                </Button>
                <fieldset>
                    <legend>Imagenes</legend>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center">
                        {selectedFilesUrl && selectedFilesUrl.map((e, i) =>
                            <AdminImg key={i} img={e} isLocalImages={true}/>)}
                        {oneGallery.images && oneGallery.images.map((image, i) =>
                            <AdminImg key={i} img={"/storage/" + image.url} id={image.id} isLocalImages={false} setGallery={setGallery}/>)}
                    </Grid>
                </fieldset>
                <input type="file" id="filePicker" hidden multiple
                       onChange={handleFileSelect}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button variant="contained" onClick={type === "Editar" ? updateGallery : createGallery}>
                    {type === "Editar" ? "Editar galería" : "Añadir galería"}</Button>
            </DialogActions>
        </Dialog>
    );
}
