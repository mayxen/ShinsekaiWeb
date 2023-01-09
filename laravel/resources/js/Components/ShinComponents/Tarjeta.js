import React, {useEffect, useState} from 'react';

export default function Tarjeta({data, type}) {
    return (
        <div className="tarjeta">
            <p>{data.title}</p>
            <p>{data.resume}</p>
            <a href={`/search/${type}/${data.id}`}>
                <img src={data.images ? "/storage/" + data.images[0].url : "/storage/" + data.image} alt={data.image}/>
            </a>

        </div>
    );
}

