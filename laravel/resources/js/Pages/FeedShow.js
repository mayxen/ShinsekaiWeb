import React, {useState} from 'react';
import Web from "@/Layouts/Web";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Head} from "@inertiajs/inertia-react";

export default function FeedShow({title}) {

    return (
        <Web>
            <Head title={"Shinsekai - " + title}/>
            <div className="container feedShow">
                <h4 className="titleFeed">{title}123</h4>

            </div>
        </Web>
    );
}
