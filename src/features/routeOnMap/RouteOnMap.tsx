import {useAppSelector} from "../../app/hooks";
import {selectSelectedBill} from "../bills/billsSlice";
import {store} from "../../app/store";
import L from "leaflet";
import {useEffect, useRef, useState} from "react";

export const RouteOnMap = () => {
    const zoom = 13
    const selectedBill = useAppSelector(selectSelectedBill)
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<L.Map | undefined>(undefined)
    const [markerFrom, setMarkerFrom] = useState<L.Marker | undefined>(undefined)
    const [markerTo, setMarkerTo] = useState<L.Marker | undefined>(undefined)
    const [polygon, setPolygon] = useState<L.Polygon | undefined>(undefined)
    useEffect(() => {
        if (mapRef.current) {
            var mapObj = L.map(mapRef.current);//.setView([51.505, -0.09], 13);
            const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            })
            layer.addTo(mapObj);
            setMap(mapObj)
        }
    }, [])

    useEffect(() => {
        if (map && selectedBill) {

            map.setView([selectedBill.from.latitude, selectedBill.from.longtitude], zoom)

            if (markerFrom && markerTo) {
                markerFrom.removeFrom(map);
                markerTo.removeFrom(map);
            }
            if (polygon) {
                polygon.removeFrom(map)
            }

            let markerFromObj = L.marker([selectedBill.from.latitude, selectedBill.from.longtitude]).addTo(map);
            setMarkerFrom(markerFromObj)
            const markerToObj = L.marker([selectedBill.to.latitude, selectedBill.to.longtitude]).addTo(map);
            setMarkerTo(markerToObj)

            var polygonObj = L.polygon([
                [selectedBill.from.latitude, selectedBill.from.longtitude],
                [selectedBill.to.latitude, selectedBill.to.longtitude],
            ]).addTo(map);
            setPolygon(polygonObj)

        } else {
            if (mapRef.current && selectedBill) {
                var mapObj = L.map(mapRef.current);//.setView([51.505, -0.09], 13);
                const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                })
                layer.addTo(mapObj);
                mapObj.setView([selectedBill.from.latitude, selectedBill.from.longtitude], zoom);
                setMap(mapObj)


                const markerFromObj = L.marker([selectedBill.from.latitude, selectedBill.from.longtitude]).addTo(mapObj);
                setMarkerFrom(markerFromObj)
                const markerToObj = L.marker([selectedBill.to.latitude, selectedBill.to.longtitude]).addTo(mapObj);
                setMarkerTo(markerToObj)

                var polygonObj = L.polygon([
                    [selectedBill.from.latitude, selectedBill.from.longtitude],
                    [selectedBill.to.latitude, selectedBill.to.longtitude],
                ]).addTo(mapObj);
                setPolygon(polygonObj)
            }

        }
    }, [selectedBill])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}>
            <>
                {
                    selectedBill === undefined &&
                    <h1>Накладная не выбрана</h1>
                }
                {
                    selectedBill !== undefined &&
                    <>
                        <h1>Маршрут накладной {selectedBill.name}</h1>
                        <div style={{width: "600px", height: "600px"}} ref={mapRef}></div>
                    </>
                }
            </>
        </div>
    )
}