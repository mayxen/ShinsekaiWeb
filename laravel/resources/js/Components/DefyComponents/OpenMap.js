import React, {useEffect, useRef} from 'react';

export default function OpenMap({setLatLng, latLng, home, setHome}) {

    const mapContainerRef = useRef(null);
    useEffect(async () => {
        let latlng = [home.lat, home.lng];

        const mapView = L.map(mapContainerRef.current, {
            center: latlng,
            zoom: 16,
        });
        const results = L.layerGroup().addTo(mapView);

        if (latLng) {
            results.addLayer(L.marker(latlng).bindPopup(`<p>Aquí se encuentra el piso: ${latlng.lat}, ${latlng.lng}</p>`).openPopup());
        }

        mapView.zoomControl.setPosition("bottomright");

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiZGVmeWhvbWUiLCJhIjoiY2t6NGI0ZWlkMGEzZTJvcWZxMGJmcmp2cSJ9.JaKF5EWWbzQTOrXkyaBTog",
        ).addTo(mapView);

        if (setLatLng) {
            const searchControl = L.esri.Geocoding.geosearch({
                placeholder: 'Pon la calle de tu casa',
                useMapBounds: false,
                providers: [L.esri.Geocoding.arcgisOnlineProvider({
                    apikey: 'AAPKa93fff2e6c0b4f32814113ae0ac5bd02XMz5DiFCEiGPgLF9AlNPle5NwEJM5tGWcEL3a-x-MrWr5oOs7Gwa96NYjBjHJYT6', // replace with your api key - https://developers.arcgis.com
                    nearby: {
                        lat: -33.8688,
                        lng: 151.2093
                    }
                })]
            }).addTo(mapView);


            mapView.on('click', function (e) {
                setLatLng(e.latlng);
                setHome({
                    ...home,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                });
                results.clearLayers();
                results.addLayer(L.marker(e.latlng).bindPopup("<p>Has guardado la posición</p>").openPopup());
            });

            searchControl.on('results', function (data) {
                results.clearLayers();
                for (var i = data.results.length - 1; i >= 0; i--) {
                    results.addLayer(L.marker(data.results[i].latlng));
                }
                results.clearLayers();
            });
        }

    }, []);

    return (
        <div className="map-box">
            <div id="map" className="map-container " ref={mapContainerRef}></div>
        </div>
    );
}
