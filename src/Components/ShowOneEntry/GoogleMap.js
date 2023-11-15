//Import in all needed dependencies and CSS for leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon                from 'leaflet/dist/images/marker-icon.png';
import iconShadow          from 'leaflet/dist/images/marker-shadow.png';
import L                   from 'leaflet';

function GoogleMap ({ latlong }){
    let position = latlong;
    let DefaultIcon = L.icon({iconUrl: icon,shadowUrl: iconShadow});
    L.Marker.prototype.options.icon = DefaultIcon;
    return(
        <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{'height': '400px', 'width':'100%', 'marginTop': '30px', "zIndex":'0'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                Look! Im your warehouse!
            </Popup>
            </Marker>
        </MapContainer>
    )
};
export default GoogleMap;