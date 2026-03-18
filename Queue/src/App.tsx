import React, { useState } from 'react';
import { Queue, type Persona } from './Queue';

const colaATM = new Queue<Persona>();
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

export default function App() {
  const [nombre, setName] = useState('');
  const [monto, setAmount] = useState('');
  const [actualizar, setUpdateTrigger] = useState(0);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !monto) return;

    const newPersona: Persona= {
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
    <div>
      <h2>Cola ATM</h2>
      
      <form onSubmit={handleAddPerson}>
        <div>
          <label>Nombre: </label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Monto: </label>
          <input 
            type="number" 
            value={monto} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <br />
      
      <button onClick={handleNextPerson} disabled={colaATM.isEmpty()}>
        Siguiente persona
      </button>

      <h3>Cola</h3>
      <ul>
        {colaATM.items.map((persona, index) => (
          <li key={persona.id}>
            <strong>{index + 1}. {persona.nombre}</strong> - Retiro: ${persona.monto} - Llegada: {persona.fecha.toLocaleTimeString()}
          </li>
        ))}
      </ul>
      
      {colaATM.isEmpty() && <p>No hay personas.</p>}
    </div>
  );
}