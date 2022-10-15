import * as React from 'react';
import {useRef, useState} from "react";
import axios from "axios";
import "react-upload-gallery/dist/style.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Autocomplete,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Switch
} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {DatePicker} from "@mui/lab";
import moment from "moment";
import OpenMap from "@/Components/DefyComponents/OpenMap";

export default function ModalHomes({
                                       homeTypes,
                                       homePurchaseTypes,
                                       home,
                                       setHome,
                                       setHomes,
                                       type,
                                       open,
                                       setOpen,
                                       initialImages,
                                       setInitialImages,
                                       numImagesWhenEdit,
                                       setNumImagesWhenEdit,
                                       setHomesAux,
                                       cities,
                                   }) {
    const [imagesUID, setImagesUID] = useState([]);
    const [RUGVisible, setRUGVisible] = useState(false);
    const homeID = useRef(0);
    const homeCreateBeforeAddImages = useRef(false);
    const homeCreateFirstTime = useRef(false);
    const [openAlert, setOpenAlert] = useState(false);
    const cancelarCasa = useRef(false);
    const [resumeCountWords, setResumeCountWords] = useState(0);
    const [latLng, setLatLng] = useState({
        lat: 0,
        lng: 0,
    });
    const currentYear = new Date();
    const abecedarioArray = "abcdefghijklmnñopqrstuvwxyz".toUpperCase().split('');

    // Gestionar el cerrado del modal
    const handleClose = () => {
        if (type === "Editar") {
            // Si estamos editando una casa...
            if (numImagesWhenEdit === 0) {
                setOpenAlert(true);
            } else {
                setNumImagesWhenEdit(0);
                setInitialImages();
                setOpen(false);
                setImagesUID([]);
                cancelarCasa.current = false;
                homeID.current = 0;
            }
        } else if (homeCreateBeforeAddImages.current) {
            // Si cerramos el modal teniendo una casa creada pero aún SIN imágenes, quiere decir que cancelamos la inserción de la nueva casa, así que debemos eliminarla ya que se ha creado previamente para poder insertarle las imágenes posteriormente (Para obtener su ID)
            axios.delete(`/admin/home_delete/${homeID.current}`)
                .then(res => {
                    setHomes((prevHomes) =>
                        prevHomes.filter((home) => homeID.current !== home.id)
                    )
                })
                .catch(e => console.log('FALLO EN DELETE', e))
            homeCreateBeforeAddImages.current = false;
            cancelarCasa.current = false;
            homeID.current = 0;
            setRUGVisible(false);
            setOpen(false);
            setImagesUID([]);
        } else {
            // Si no hemos hecho nada o ya tenemos la casa creada con imágenes adjuntas, se cierra el modal de manera normal
            setRUGVisible(false);
            setOpen(false);
            setInitialImages();
            setImagesUID([]);
            homeCreateBeforeAddImages.current = false;
            cancelarCasa.current = false;
            homeID.current = 0;
        }
        setResumeCountWords(0);
    };

    // Gestionar la creación de la casa
    const createHome = () => {
        if (homeCreateFirstTime.current) {
            // La casa actual ha sido marcada como que tendrá imágenes, entonces se crea y se devuelve la misma casa para controlar si posteriormente se cancelará (Y borrarla) o se le adjuntarán imágenes (usando su ID)
            //no uso el setHome porque necesito un cambio rápido
            home.latlng = latLng;
            axios.post("/admin/store_home_before_add_images", home)
                .then(res => {
                    homeID.current = res.data.id;
                    homeCreateFirstTime.current = false;
                })
                .catch(e => {
                    console.log("FALLO EN POST CREATE", e)
                })
        } else if (imagesUID.length > 0) {
            // Si la casa ya está creada, se comprueba que tenga al menos 1 imagen antes de subirse. En caso afirmativo, se cierra el modal
            setRUGVisible(false);
            setOpen(false);
            setResumeCountWords(0);
            setInitialImages();
            setImagesUID([]);
            homeCreateBeforeAddImages.current = false;
            cancelarCasa.current = false;
            homeID.current = 0;
        } else {
            // En caso negativo, se avisa al usuario
            setOpenAlert(true);
        }
    };

    const updateHome = () => {
        axios.put(`/admin/home_update/${home.id}`, home)
            .then(res => {
                setHomes(res.data.data);
                setHomesAux(res.data.data);
            })
            .catch(e => {
                console.log("FALLO EN POST UPDATE", e)
            })
        handleClose();
    };

    const handleDeleteImage = (image) => {
        const uidImage = image.uid; // UID de la imagen a borrar
        const imageToDelete = imagesUID.filter(imageUID => imageUID.uid === uidImage) // Buscar el UID de la imagen a borrar de entre todas las que hay subidas para el producto
        if (type === "Crear") {
            axios.delete(`/admin/delete_home_images/${imageToDelete[0].id}`)
                .then(res => {
                    // Eliminar el UID de la imagen de la lista de UID's de imágenes subidas para la casa
                    setImagesUID(() =>
                        imagesUID.filter((imageUID) => imageUID.id !== imageToDelete[0].id)
                    );
                })
                .catch(e => {
                    console.log("FALLO EN DELETE IMAGE AL CREAR UNA CASA", e)
                })
        } else {
            if (imageToDelete.length > 0) {
                axios.delete(`/admin/delete_home_images/${imageToDelete[0].id}`)
                    .then(res => {
                        // Eliminar el UID de la imagen de la lista de UID's de imágenes subidas para la casa
                        setImagesUID(() =>
                            imagesUID.filter((imageUID) => imageUID.id !== imageToDelete[0].id)
                        );
                        // Reducir el número de imágenes
                        const newNumImages = numImagesWhenEdit - 1;
                        setNumImagesWhenEdit(newNumImages);
                    })
                    .catch(e => {
                        console.log("FALLO EN DELETE IMAGE AÑADIDA NUEVA AL EDITAR UN PRODUCTO", e)
                    })
            } else {
                axios.delete(`/admin/delete_home_images/${image.id}`)
                    .then(res => {
                        const newNumImages = numImagesWhenEdit - 1;
                        setNumImagesWhenEdit(newNumImages);
                    })
                    .catch(e => {
                        console.log("FALLO EN DELETE IMAGE YA INSERTADA AL EDITAR UNA CASA", e)
                    })
            }
        }
    }

    return (
        <Dialog
            PaperProps={{sx: {width: "100%", height: "100%"}}}
            fullWidth
            open={open}
            onClose={() => handleClose()}
            disableEscapeKeyDown={true}
            onBackdropClick={() => {
                cancelarCasa.current = true;
                handleClose();
            }}>
            <DialogTitle>{type === "Editar" ? "Editar una casa" : "Crear una casa"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduzca los datos de la casa
                </DialogContentText>
                {/*TÍTULO*/}
                <TextField
                    required
                    margin="dense"
                    name="title"
                    label="Título"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={home.title}
                    onChange={(e) => {
                        setHome({
                            ...home,
                            title: e.target.value
                        });
                    }}
                />
                <br/><br/>
                {/*DESCRIPCION*/}
                <DialogContentText sx={{paddingBottom: '5px'}}>
                    Descripción
                </DialogContentText>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                        height: '500px'
                    }}
                    data={home.description}
                    onChange={(event, editor) => {
                        setHome({
                            ...home,
                            description: editor.getData()
                        });
                    }}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                />
                <Grid container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      spacing={2}>
                    <Grid item md={12}>
                        {/*Resumen*/}
                        <TextField
                            required
                            margin="dense"
                            name="resumen"
                            label="Resumen"
                            type="text"
                            helperText={`${resumeCountWords}/100`}
                            inputProps={{
                                maxLength: 100,
                            }}
                            multiline
                            fullWidth
                            variant="standard"
                            value={home.resume}
                            onChange={(e) => {
                                setResumeCountWords(e.target.value.length);
                                setHome({
                                    ...home,
                                    resume: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <br/>
                    <Grid item md={6}>
                        {/*Ciudad*/}
                        <Autocomplete
                            autoComplete
                            required
                            id="town-select"
                            value={home.town}
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    setHome({
                                        ...home,
                                        town: newValue
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    setHome({
                                        ...home,
                                        town: newValue.inputValue
                                    });
                                } else {
                                    setHome({
                                        ...home,
                                        town: newValue
                                    });
                                }
                            }}
                            options={cities}
                            getOptionLabel={option => option}
                            renderInput={params => <TextField {...params} label="Ciudad"/>
                            }/>
                    </Grid>
                    <Grid item>
                        {/*Código postal*/}
                        <TextField
                            required
                            margin="dense"
                            sx={{width: 150}}
                            name="postal_code"
                            label="Código postal"
                            type="text"
                            placeholder="35500"
                            variant="standard"
                            value={home.postal_code}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    postal_code: e.target.value.replace(/[^0-9]/g, '')
                                });
                            }}
                        />
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}>
                    <Grid item>
                        {/*Bloque*/}
                        <TextField
                            margin="dense"
                            name="block"
                            label="Bloque"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={home?.block || ""}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    block: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item md={3}>
                        {/*Piso*/}
                        <InputLabel id="home-select">Piso</InputLabel>
                        <Select
                            required
                            labelId="home-select"
                            id="home-select"
                            displayEmpty
                            fullWidth
                            value={home.floor}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    floor: e.target.value
                                });
                            }}
                        >
                            <MenuItem value={0}>
                                Sin piso
                            </MenuItem>
                            {Array.from({length: 30}, (_, i) => i + 1).map((number, index) => (
                                <MenuItem key={index} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item md={3}>
                        {/*Puerta*/}
                        <InputLabel id="door">Puerta</InputLabel>
                        <Select
                            required
                            labelId="door"
                            id="door-select"
                            displayEmpty
                            fullWidth
                            value={home.door}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    door: e.target.value
                                });
                            }}
                        >
                            <MenuItem value={0}>
                                Sin puerta
                            </MenuItem>
                            {abecedarioArray.map((number, index) => (
                                <MenuItem key={index} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item md={12}>
                        {/*Dirección*/}
                        <TextField
                            required
                            margin="dense"
                            name="address"
                            label="Dirección"
                            placeholder="Avenida Rafael Cabrera"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={home.address}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    address: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <OpenMap setLatLng={setLatLng} latLng={latLng} home={home} setHome={setHome}/>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}>
                    <Grid item md={3}>
                        {/*Tipos de casas*/}
                        <InputLabel id="home_types">Tipos de casa</InputLabel>
                        <Select
                            required
                            fullWidth
                            displayEmpty
                            labelId="home_types"
                            id="home_types-select"
                            value={home.home_type_id}
                            onChange={e =>
                                setHome({
                                    ...home,
                                    home_type_id: e.target.value,
                                })
                            }
                        >
                            {
                                homeTypes.map(category =>
                                    <MenuItem key={category.id} value={category.id}>{category.type}</MenuItem>
                                )
                            }
                        </Select>
                    </Grid>
                    <Grid item md={3}>
                        {/*Tipo de contrato*/}
                        <InputLabel id="purchase_type">Tipo de contrato</InputLabel>
                        <Select
                            required
                            fullWidth
                            displayEmpty
                            labelId="purchase_type"
                            id="purchase_type-select"
                            value={home.home_purchase_type_id}
                            onChange={e =>
                                setHome({
                                    ...home,
                                    home_purchase_type_id: e.target.value,
                                })
                            }
                        >
                            {
                                homePurchaseTypes.map(purchaseType =>
                                    <MenuItem key={purchaseType.id}
                                              value={purchaseType.id}>{purchaseType.type}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item>
                        {/*Año de construcción*/}
                        <InputLabel id="construction_year">Año de construcción</InputLabel>
                        <DatePicker
                            views={['year']}
                            id="construction_year"
                            value={home.construction_year}
                            maxDate={moment(currentYear)}
                            onChange={(newValue) => {
                                setHome({
                                    ...home,
                                    construction_year: newValue
                                });
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      spacing={2}>
                    <Grid item md={3}>
                        {/*Precio*/}
                        <TextField
                            required
                            margin="dense"
                            name="price"
                            label="Precio"
                            type="text"
                            placeholder="145.000"
                            variant="standard"
                            value={home.price}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    price: e.target.value.replace(/[^0-9]/g, '')
                                });
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                            }}
                        />
                    </Grid>
                    {
                        home.home_purchase_type_id !== 1 &&
                        <Grid item md={4}>
                            {/*Perioricidad del pago*/}
                            <InputLabel id="period_type">Perioricidad del pago</InputLabel>
                            <Select
                                required
                                fullWidth
                                displayEmpty
                                labelId="period_type"
                                id="period_type-select"
                                value={home.period_type}
                                onChange={e =>
                                    setHome({
                                        ...home,
                                        period_type: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value="dia">Dia</MenuItem>
                                <MenuItem value="semana">Semana</MenuItem>
                                <MenuItem value="mes">Mes</MenuItem>

                            </Select>
                        </Grid>
                    }
                    <Grid item md={4}>
                        {/*Metros cuadrados*/}
                        <TextField
                            required
                            margin="dense"
                            name="square_meters"
                            label="Metros cuadrados"
                            type="number"
                            size="small"
                            placeholder="12"
                            variant="standard"
                            value={home.square_meter}
                            onChange={(e) => {
                                const newValue = Math.min(Math.max(e.target.value, 0))
                                setHome({
                                    ...home,
                                    square_meter: newValue
                                });
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}>
                    <Grid item md={3}>
                        {/*Habitaciones*/}
                        <InputLabel id="rooms-select">Habitaciones</InputLabel>
                        <Select
                            required
                            labelId="rooms-select"
                            id="rooms-select"
                            fullWidth
                            displayEmpty
                            value={home.rooms}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    rooms: e.target.value
                                });
                            }}
                        >
                            {Array.from({length: 10}, (_, i) => i + 1).map((number, index) => (
                                <MenuItem key={index} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item md={3}>
                        {/*Dormitorios*/}
                        <InputLabel id="bedrooms-select">Dormitorios</InputLabel>
                        <Select
                            required
                            labelId="bedrooms-select"
                            id="bedrooms-select"
                            fullWidth
                            displayEmpty
                            value={home.bedrooms}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    bedrooms: e.target.value
                                });
                            }}
                        >
                            {Array.from({length: 10}, (_, i) => i + 1).map((number, index) => (
                                <MenuItem key={index} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item md={2}>
                        {/*Baños*/}
                        <InputLabel id="bathrooms-select">Baños</InputLabel>
                        <Select
                            required
                            labelId="bathrooms-select"
                            id="bathrooms-select"
                            fullWidth
                            displayEmpty
                            value={home.bathrooms}
                            onChange={(e) => {
                                setHome({
                                    ...home,
                                    bathrooms: e.target.value
                                });
                            }}
                        >
                            {Array.from({length: 10}, (_, i) => i + 1).map((number, index) => (
                                <MenuItem key={index} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br/>
                {/* ######################################### EXTRAS ############################################# */}
                <fieldset>
                    <legend>Extras</legend>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center">
                        {/*Garaje*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Garaje"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.garage}
                                            value={home.garage}
                                            name="garage"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    garage: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Mascotas*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Mascotas"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.pets}
                                            value={home.pets}
                                            name="pets"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    pets: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Ascensor*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Ascensor"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.elevator}
                                            value={home.elevator}
                                            name="elevator"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    elevator: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Terraza*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Terraza"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.terrace}
                                            value={home.terrace}
                                            name="terrace"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    terrace: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Calefacción*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Calefacción"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.heating}
                                            value={home.heating}
                                            name="heating"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    heating: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Fumador*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Fumador"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.smoker}
                                            value={home.smoker}
                                            name="smoker"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    smoker: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Amueblado*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Amueblado"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.furnished}
                                            value={home.furnished}
                                            name="furnished"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    furnished: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                        {/*Jardín*/}
                        <FormControl sx={{m: 1, minWidth: 75}}>
                            <FormGroup>
                                <FormControlLabel
                                    label="Jardín"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={home.garden}
                                            value={home.garden}
                                            name="garden"
                                            onChange={(e) => {
                                                setHome({
                                                    ...home,
                                                    garden: e.target.checked
                                                });
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </fieldset>

                {/*IMÁGENES*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    cancelarCasa.current = true;
                    handleClose();
                }}>Cancelar</Button>
                {type === "Crear" && !RUGVisible ?
                    <Button variant="contained"
                            disabled={!(home.title && home.resume && home.description && home.home_purchase_type_id && home.home_type_id && home.price && home.construction_year && home.rooms && home.bathrooms && home.bedrooms)}
                            onClick={() => {
                                setRUGVisible(true);
                                homeCreateBeforeAddImages.current = true;
                                homeCreateFirstTime.current = true;
                                createHome();
                            }}>Upload Images</Button>
                    : null}
                <Button variant="contained"
                        onClick={type === "Editar" ? updateHome : createHome}>{type === "Editar" ? "Editar casa" : "Añadir casa"}</Button>
            </DialogActions>

            <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
            >
                <DialogTitle>
                    {"Faltan imágenes de la casa"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para crear o editar una casa es necesario que tenga como mínimo 1 imagen.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAlert(false)}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
}
