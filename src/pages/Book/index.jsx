import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
// import { Alert } from "@material-tailwind/react";

export default function Book() {
    const { id } = useParams();
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
        const user_id = await localStorage.getItem('user');
    
        await api.post(`/spots/${id}/bookings`, {
          date
        }, {
          headers: { user_id }
        })

        // {<Alert color="green">Solicitação de reserva enviada.</Alert>}
        navigate('/list');
    
      }
    
      function handleCancel() {
        navigate('/list');

      }
    
    return (
        <div>
            
        <form>
            <label htmlFor="data">Data de interesse *</label>
            <input 
            id="data" 
            type="text" 
            placeholder="Qual data você quer reservar?"
            value={date}
            onChange={event => setDate(event.target.value)}
            />
            
            <button className="btn" onClick={handleSubmit}>Solicitar Reserva</button>
            <button className="btn cancelButton" onClick={handleCancel}>Cancelar</button>
        </form>

        </div>
    )
}