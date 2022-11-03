import React, {useState} from 'react';
import Web from "@/Layouts/Web";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Panel from "@/Components/ShinComponents/Panel";

export default function Home({homeElements}) {

    return (
        <Web>
            <Panel data={homeElements}/>
        </Web>
    );
}
