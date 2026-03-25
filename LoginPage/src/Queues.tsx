import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Queue, type Persona } from './Queue';

const colaATM = new Queue<Persona>();

if (colaATM.isEmpty()) {
  colaATM.enqueue({
    id: 'mock-1',
    nombre: 'Juan Pérez',
    monto: 500000,
    fecha: new Date(Date.now() - 15000)
  });
  colaATM.enqueue({
    id: 'mock-2',
    nombre: 'María Gómez',
    monto: 1200000,
    fecha: new Date(Date.now() - 5000)
  });
}

export const Queues = () => {
  const navigate = useNavigate();

  const [nombre, setName] = useState('');
  const [monto, setAmount] = useState('');
  
  const [, setUpdateTrigger] = useState(0);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !monto) return;

    const newPersona: Persona = {
      id: Date.now().toString(),
      nombre: nombre,
      monto: Number(monto),
      fecha: new Date()
    };

    colaATM.enqueue(newPersona);
    
    setName('');
    setAmount('');
    setUpdateTrigger(prev => prev + 1);
  };

  const handleNextPerson = () => {
    colaATM.dequeue();
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>

      <button 
        onClick={() => navigate('/home')} 
        style={{ marginBottom: '20px', cursor: 'pointer' }}
      >
        ← Volver al Home
      </button>

      <hr />

      <h2>Cola ATM</h2>
      
      <form onSubmit={handleAddPerson}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre: </label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Monto: </label>
          <input 
            type="number" 
            value={monto} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <button type="submit" style={{ cursor: 'pointer' }}>Agregar</button>
      </form>

      <br />
      
      <button 
        onClick={handleNextPerson} 
        disabled={colaATM.isEmpty()}
        style={{ cursor: colaATM.isEmpty() ? 'not-allowed' : 'pointer' }}
      >
        Siguiente persona
      </button>

      <h3>Cola</h3>
      <ul>
        {colaATM.items.map((persona, index) => (
          <li key={persona.id} style={{ marginBottom: '5px' }}>
            <strong>{index + 1}. {persona.nombre}</strong> - Retiro: ${persona.monto} - Llegada: {persona.fecha.toLocaleTimeString()}
          </li>
        ))}
      </ul>
      
      {colaATM.isEmpty() && <p>No hay personas en la fila.</p>}
    </div>
  );
};