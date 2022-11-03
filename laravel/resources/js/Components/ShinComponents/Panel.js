import React, {useEffect, useState} from 'react';
import Tarjeta from "@/Components/ShinComponents/Tarjeta";

export default function Panel({data}) {

    return (
        <>
            {data.map((data, i) =>
                <div key={i} className="tarjetas">
                    <div className="panel">
                        <p className="rotate">{data.name}</p>
                        <Tarjeta data={data.data}/>
                    </div>
                </div>
            )}
        </>
    );
}

