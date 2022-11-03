import React, {useEffect, useState} from 'react';

export default function Tarjeta({data}) {

    return (
        <>
            {data.map((data, i) =>
                <div key={i} className="tarjeta">
                    <p>{data.name}</p>
                    <p>{data.desc}</p>
                    <a href="">
                        <img src="/storage/grupo.jpg" alt={data.name}/>
                    </a>
                </div>
            )}
        </>
    );
}

