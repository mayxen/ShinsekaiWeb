import React, {useEffect, useState} from 'react';
import Tarjeta from "@/Components/ShinComponents/Tarjeta";

export default function Panel({elements}) {
    const cardName = ["Galería", "Noticias", "Eventos"];
    const cardName2 = ["gallery", "news", "events"];
    return (
        <>
            {elements.map((data, i) =>
                <div key={i} className="tarjetas">
                    <div className="panel">
                        <p className="rotate">{cardName[i]}</p>
                        {data.data !== undefined
                            ?
                            data.data.map((data, j) =>
                                <Tarjeta key={j} type={cardName2[i]} data={data}/>)
                            :
                            data.map((data, j) =>
                                <Tarjeta key={j} type={cardName2[i]} data={data}/>)
                        }
                    </div>
                </div>
            )}
        </>
    );
}

