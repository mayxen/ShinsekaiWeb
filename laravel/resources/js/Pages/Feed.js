import React, {useState} from 'react';
import Web from "@/Layouts/Web";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Tarjeta from "@/Components/ShinComponents/Tarjeta";
import {Head} from "@inertiajs/inertia-react";

export default function Feed({title, data}) {

    return (
        <Web>
            <Head title={"Shinsekai - " + title}/>
            <div className="container feed">
                <h4 className="titleFeed">{title}</h4>

                <div className="tarjetas">
                    {data.map((data, i) =>
                        <Tarjeta key={i} data={data}/>
                    )}
                </div>
            </div>
        </Web>
    );
}
