import React, {useEffect, useState} from 'react';

export default function Tarjeta({data, type}) {

    return (
        <div className="tarjeta">
            <p>{data.name}</p>
            <p>{data.desc}</p>
            <a href="">
                <img src="/storage/grupo.jpg" alt={data.name}/>
            </a>
            {/*<Link href={route("feeds", 'events')}>*/}
            {/*    <img src="/storage/grupo.jpg" alt={data.name}/>*/}
            {/*</Link>*/}
        </div>
    );
}

