import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import './styles.css';

export default function SpotList({ tech }) {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      })
      setSpots(response.data);
    }

    loadSpots();
  }, [tech]);

  // function handleNavigate(id) {
  //   navigation.navigate('Book', { id });
  // }

  function handleNavigate(id) {
    navigate(`/Book/${id}`);
  }

  return (
    <div className="container">
      <p className="title">
        Empresas que usam <span className="bold">{tech}</span>
      </p>
      <ul className="spot-list">
          {spots.map(spot => (
            <li key={spot._id}>
              <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
              <button className="btn" onClick={() => handleNavigate(spot._id)}>Solicitar Reserva</button>
            </li>

          ))}
      </ul>
    </div>
  )
}

