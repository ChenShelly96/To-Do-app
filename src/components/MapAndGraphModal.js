// src/components/MapAndGraphModal.js
import GoogleMapReact from 'google-map-react';
import React from 'react';
import { Line } from 'react-chartjs-2';

const MapAndGraphModal = ({ tasks, onClose }) => {

  const center = { lat: 31.0461, lng: 34.8516 }; //Center map of Israel
  const zoom = 7;

  const data = {
    labels: tasks.map(task => task.location),
    datasets: [
      {
        label: 'Productivity by Location',
        data: tasks.map(task => {
     
          return task.status === 'Done' ? 100 : 50;
        }),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Map and Productivity Graph</h2>
        <div className="map-container" style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {tasks.map(task => (
              <div
                key={task.id}
                lat={center.lat} 
                lng={center.lng}
                text={task.name}
              >
                {task.name}
              </div>
            ))}
          </GoogleMapReact>
        </div>
        <div className="graph-container">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default MapAndGraphModal;
