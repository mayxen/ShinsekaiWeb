// Icons
import HotelSharpIcon from "@mui/icons-material/HotelSharp"; // Habitaciones
import BathtubSharpIcon from "@mui/icons-material/BathtubSharp"; // Baños
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp"; // Metros cuadrados
import GarageIcon from '@mui/icons-material/Garage'; // Garaje
import ElevatorIcon from '@mui/icons-material/Elevator'; // Ascensor
import PetsIcon from '@mui/icons-material/Pets'; // Mascotas
import YardIcon from '@mui/icons-material/Yard'; // Jardín
import DeckIcon from '@mui/icons-material/Deck'; // Terraza
import WeekendIcon from '@mui/icons-material/Weekend'; // Amueblado
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms'; // Yes Smoke
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'; // No smoke
import FireplaceIcon from '@mui/icons-material/Fireplace'; // Calefacción


import React, {useState} from 'react';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import {Checkbox, Divider, FormControlLabel, MenuItem, Select, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {useSnackbar} from 'notistack';
import {Navigation, Pagination, Scrollbar} from 'swiper';
import DOMPurify from 'dompurify';
// Import Swiper styles
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function HomeAlternative(props) {

    const {auth} = usePage().props;
    const {data, setData, post, errors, reset} = useForm({
        formChoice: -1,
        name: auth.user?.name || "",
        email: auth.user?.email || "",
        phone_number: auth.user?.phone_number || "",
        newsletter: false,
        terms: false,
        home: props.home,
    });

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    function submit(e) {
        e.preventDefault();
        if (data.formChoice < 0) {
            // enqueueSnackbar("Selecciona qué necesitas del vendedor antes de enviar", {
            //     variant: "warning",
            //     autoHideDuration: 3000
            // })
            enqueueSnackbar("El propietario se pondrá en contacto con usted pronto", {
                variant: "success",
                autoHideDuration: 3000
            })
        } else {
            axios.post(route('notify-owner'), data)
                .then(res => {
                    enqueueSnackbar("El propietario se pondrá en contacto con usted pronto", {
                        variant: "success",
                        autoHideDuration: 3000
                    });
                })
                .catch(e =>
                    enqueueSnackbar("El propietario se pondrá en contacto con usted pronto", {
                        variant: "success",
                        autoHideDuration: 3000
                    })
                )
        }
    }

    const [formChoices, setFormChoice] = useState(props.contactReasonList);

    return (
        <Web>
            <Head title={`Defyhome - Búsqueda de ${props.type}`}/>
            <div className={"container home"}>
                <div className={"swiperImages"}>
                    <Swiper modules={[Navigation, Pagination, Scrollbar]}
                            spaceBetween={25}
                            slidesPerView={1}
                            navigation
                            pagination={{clickable: true, "dynamicBullets": true}}
                            scrollbar={{draggable: true}}
                            className="swiperHome"
                    >
                        {props.home.images.map((image, i) =>
                            <SwiperSlide key={i} className="swiperContainer">
                                <img src={'/storage/' + image.url}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className={"homeBody"}>
                    <div className={"data"}>
                        <div className={"price"}>
                            <p>{props.home.title + '  -  ' + props.home.price + '€'}</p>
                        </div>
                        <div>
                            <p className="iconsHome">
                                {props.home.garage &&
                                    <Tooltip title={"Tiene garaje"}>
                                        <span><GarageIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.pets &&
                                    <Tooltip title={"Permite mascotas"}>
                                        <span><PetsIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.elevator &&
                                    <Tooltip title={"Tiene ascensor"}>
                                        <span><ElevatorIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.terrace &&
                                    <Tooltip title={"Tiene terraza"}>
                                        <span><DeckIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.garden &&
                                    <Tooltip title={"Tiene jardín"}>
                                        <span><YardIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.furnished &&
                                    <Tooltip title={"Está amueblado"}>
                                        <span><WeekendIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.smoker
                                    ?
                                    <Tooltip title={"Se permite fumar"}>
                                        <span><SmokingRoomsIcon/></span>
                                    </Tooltip>
                                    :
                                    <Tooltip title={"No se permite fumar"}>
                                        <span><SmokeFreeIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.heating &&
                                    <Tooltip title={"Tiene calefacción"}>
                                        <span><FireplaceIcon/></span>
                                    </Tooltip>
                                }
                                {props.home.bathrooms &&
                                    <Tooltip title={"Baños " + props.home.bathrooms}>
                                        <span><BathtubSharpIcon/>{props.home.bathrooms}</span>
                                    </Tooltip>
                                }
                                {props.home.rooms &&
                                    <Tooltip title={"Habitaciones " + props.home.rooms}>
                                        <span><HotelSharpIcon/>{props.home.bedrooms}</span>
                                    </Tooltip>
                                }
                                {props.home.square_meter &&
                                    <Tooltip title={"Metros cuadrados " + props.home.square_meter}>
                                        <span><ApartmentSharpIcon/>{props.home.square_meter}m<sup>2</sup></span>
                                    </Tooltip>
                                }
                            </p>
                        </div>
                        <div className={"description"}>
                            <div className="content setBlueColor"
                                 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.home.description)}}/>
                        </div>
                    </div>
                    <div className={"contactForm"}>
                        <div className="setSticky">
                            <h2>¡Contacta con el anunciante!</h2>
                            <form className="formContactHome" onSubmit={submit} autocomplete="off">
                                <TextField
                                    className={"contactForm-textInput"}
                                    placeholder={"Nombre"}
                                    name="name"
                                    type={'text'}
                                    fullWidth
                                    required
                                    value={data.name}
                                    onChange={onHandleChange}
                                />
                                <TextField
                                    className={"contactForm-textInput"}
                                    placeholder={"Email"}
                                    name="email"
                                    type={'email'}
                                    fullWidth
                                    required
                                    value={data.email}
                                    onChange={onHandleChange}
                                />
                                <TextField
                                    className={"contactForm-textInput"}
                                    placeholder={"Telefono"}
                                    name="phone_number"
                                    required
                                    type={'tel'}
                                    fullWidth
                                    value={data.phone_number}
                                    onChange={onHandleChange}
                                />
                                <Select
                                    margin="dense"
                                    name="formChoice"
                                    fullWidth
                                    value={data.formChoice}
                                    onChange={onHandleChange}
                                    required
                                >
                                    <MenuItem value={-1}>¿Que necesitas del vendedor?</MenuItem>
                                    <Divider/>
                                    {formChoices.map((choice, i) =>
                                        <MenuItem key={i} value={i}>{choice}</MenuItem>
                                    )}
                                </Select>
                                <FormControlLabel label="Quiero recibir ofertas similares" control={
                                    <Checkbox
                                        name="newsletter"
                                        checked={data.newsletter}
                                        onChange={onHandleChange}
                                        required
                                    />
                                }/>
                                <FormControlLabel
                                    label="Acepto las condiciones básicas de Protección de Datos"
                                    control={
                                        <Checkbox
                                            name="terms"
                                            checked={data.terms}
                                            onChange={onHandleChange}
                                            required
                                        />
                                    }/>
                                <Button type="submit" fullWidth variant={"contained"}>Contactar</Button>
                            </form>
                        </div>
                    </div>
                </div>
                {/*<div>otras ofertas similares</div>*/}
            </div>
        </Web>

    )
        ;
}
