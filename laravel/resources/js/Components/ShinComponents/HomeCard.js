//icons
import CallIcon from '@mui/icons-material/Call';
import HotelSharpIcon from '@mui/icons-material/HotelSharp';
import BathtubSharpIcon from '@mui/icons-material/BathtubSharp';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {Tooltip} from "@mui/material";

export default function HomeCard({home}) {

    const [telephone, setTelephone] = useState('');

    useEffect(() => {
        var numberDigits = ('' + home.phoneNumber).replace(/\D/g, '');
        var finded = numberDigits.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
        if (finded) {
            setTelephone('(+' + finded[1] + ') ' + finded[2] + ' ' + finded[3] + ' ' + finded[4]);
        } else {
            finded = numberDigits.match(/^(\d{3})(\d{3})(\d{3})$/);
            if (finded) {
                setTelephone(finded[1] + ' ' + finded[2] + ' ' + finded[3]);
            }
        }

    }, []);

    return (
        <div className="defyCard">
            <div className="imageContainer">
                <a href={route("home", home.id)}>
                    <img src={'/storage/' + home.images[0]?.url}
                         alt={`El mejor ${home.home_type} para ${home.purchase_type} en ${home.town} solo en Defyhome`}/>
                </a>
            </div>
            <div>
                <p className="title">
                    {home.title}
                </p>
                <p className="price">
                    {home.price + "€"}
                </p>
                <p className="resume">
                    {home.resume}
                </p>
                <div className="iconsCard">
                    <Tooltip
                        title={"Habitaciones " + home.rooms}><span><HotelSharpIcon/>{home.rooms}</span></Tooltip>
                    <Tooltip
                        title={"Baños " + home.bathrooms}><span><BathtubSharpIcon/>{home.bathrooms}</span></Tooltip>
                    <Tooltip
                        title={"Metros cuadrados " + home.square_meter}><span><ApartmentSharpIcon/>{home.square_meter}m<sup>2</sup></span></Tooltip>

                </div>
            </div>
            <div className="buttonsLefyCard">
                <Button href={route("home", home.id)}><PanoramaFishEyeIcon color="inherit"
                                                                           sx={{display: 'block'}}/>Ver {home.home_type}
                </Button>
                {home.phoneNumber &&
                    <Button href={'tel:' + home.phoneNumber}>
                        <CallIcon color="inherit" sx={{display: 'block'}}/>
                        {telephone}
                    </Button>
                }
            </div>
        </div>
    );
}

