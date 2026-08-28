import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import L from 'leaflet';

// Fix default leaflet marker icon issue in Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ServiceMap = ({ offices = [], selectedOffice, onSelectOffice }) => {
  const centerLat = selectedOffice ? selectedOffice.coordinates.lat : 18.5204;
  const centerLng = selectedOffice ? selectedOffice.coordinates.lng : 73.8567;

  return (
    <div className="w-full h-[480px] rounded-2xl overflow-hidden shadow-md border border-slate-200 relative z-10">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {offices.map((office) => (
          <Marker
            key={office._id}
            position={[office.coordinates.lat, office.coordinates.lng]}
            eventHandlers={{
              click: () => onSelectOffice && onSelectOffice(office)
            }}
          >
            <Popup>
              <div className="p-1 max-w-xs space-y-1">
                <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                  {office.type}
                </span>
                <h4 className="font-bold text-xs text-gov-navy mt-1">{office.name}</h4>
                <p className="text-[11px] text-slate-600 leading-tight">{office.address}</p>
                <div className="pt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-slate-100">
                  <p className="flex items-center gap-1 font-semibold text-slate-700">
                    <Phone className="w-3 h-3 text-emerald-600" /> {office.contactNumber}
                  </p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" /> {office.openingHours}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;
