import React, {useEffect, useState} from 'react';
import Web from "@/Layouts/Web";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Panel from "@/Components/ShinComponents/Panel";
import {Head} from "@inertiajs/inertia-react";

export default function Home({homeElements}) {

    return (
        <Web>
            <Head title="Shinsekai - Home"/>
            <Panel elements={homeElements}/>
        </Web>
    );
}
