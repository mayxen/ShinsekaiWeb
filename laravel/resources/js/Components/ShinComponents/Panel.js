import React, {useEffect, useState} from 'react';
import Tarjeta from "@/Components/ShinComponents/Tarjeta";

export default function Panel({data}) {

    return (
        <>
            {data.map((data, i) =>
                <div key={i} className="tarjetas">
                    <div className="panel">
                        <p className="rotate">{data.name}</p>
                        {data.data.map((data, i) =>
                            <Tarjeta key={i} type={data.name} data={data}/>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

