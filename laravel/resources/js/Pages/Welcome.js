import React from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import HomeCard from "@/Components/DefyComponents/HomeCard";
import SearchHome from "@/Components/DefyComponents/SearchHome";

export default function Welcome(props) {
    const {data, setData, post} = useForm({
        homeType: "",
        purchaseType: -1,
        location: '',
    });

    return (
        <Web>
            <Head title="Bienvenido a Defyhome"/>
            <SearchHome
                cities={props.cities}
                data={data}
                setData={setData}
                post={post}
                purchaseTypeList={props.purchaseTypeList}
                homeTypeList={props.homeTypeList}
            />
            <div className="container">
                {/*esto es lo que hay que poner con el data.map*/}
                <div className="dataWelcome">
                    <h2>Ultimas casas en compra</h2>
                    <div className="homeCards">
                        {props.dataHomeComprar.data.map((home, i) =>
                            <HomeCard key={i} home={home}/>
                        )}
                    </div>
                    <h2>Ultimas casas en alquiler</h2>
                    <div className="homeCards">
                        {props.dataHomeAlquiler.data.map((home, i) =>
                            <HomeCard key={i} home={home}/>
                        )}
                    </div>
                    <h2>Ultimas casas en compartir</h2>
                    <div className="homeCards">
                        {props.dataHomeCompartir.data.map((home, i) =>
                            <HomeCard key={i} home={home}/>
                        )}
                    </div>
                </div>
            </div>
        </Web>
    );
}
