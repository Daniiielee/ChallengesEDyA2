import { useState, useEffect } from 'react';
import { SimpleLinkedList, DoublyLinkedList, CircularLinkedList, CircularDoublyLinkedList } from './models/Lists';

interface Carro { marca: string; placa: string; }
interface Inversionista { nombre: string; monto: number; }

function App() {
  const [listaInventario] = useState(new SimpleLinkedList<Carro>());
  const [listaHistorial] = useState(new DoublyLinkedList<Carro>());
  const [listaDestacados] = useState(new CircularLinkedList<Carro>());
  const [listaInversionistas] = useState(new CircularDoublyLinkedList<Inversionista>());

  const [inventario, setInventario] = useState<Carro[]>([]);
  const [historial, setHistorial] = useState<Carro[]>([]);
  const [destacados, setDestacados] = useState<Carro[]>([]);
  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);
  
  const [indiceDestacado, setIndiceDestacado] = useState(0);
  const [formCarro, setFormCarro] = useState({ marca: '', placa: '' });
  const [formInv, setFormInv] = useState({ nombre: '', monto: 0 });

  useEffect(() => {
    if (destacados.length > 0) {
      const interval = setInterval(() => {
        setIndiceDestacado(prev => (prev + 1) % destacados.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [destacados]);

  const registrarVehiculo = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo = { ...formCarro };
    listaInventario.append(nuevo);
    listaDestacados.append(nuevo);
    
    setInventario(listaInventario.toArray());
    setDestacados(listaDestacados.toArray());
    setFormCarro({ marca: '', placa: '' });
  };

  const alquilarVehiculo = (placa: string) => {
    const carro = inventario.find(c => c.placa === placa);
    if (carro) {
      listaHistorial.append(carro);
      listaInventario.remove(c => c.placa === placa);
      
      setInventario(listaInventario.toArray());
      setHistorial(listaHistorial.toArray());
    }
  };

  const agregarInversionista = (e: React.FormEvent) => {
    e.preventDefault();
    listaInversionistas.append({ ...formInv });
    setInversionistas(listaInversionistas.toArray());
    setFormInv({ nombre: '', monto: 0 });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Alquileres</h1>

      <section style={{ background: '#222', color: 'white', padding: '15px', borderRadius: '10px' }}>
        <h2>Destacados</h2>
        {destacados.length > 0 ? (
          <div>
            <p>{destacados[indiceDestacado].marca} - {destacados[indiceDestacado].placa}</p>
          </div>
        ) : <p>No hay destacados</p>}
      </section>

      <section>
        <form onSubmit={registrarVehiculo}>
          <input placeholder="Marca" value={formCarro.marca} onChange={e => setFormCarro({...formCarro, marca: e.target.value})} required />
          <input placeholder="Placa" value={formCarro.placa} onChange={e => setFormCarro({...formCarro, placa: e.target.value})} required />
          <button type="submit">Registrar vehiculo</button>
        </form>

        <h3>Inventario</h3>
        {inventario.map(c => (
          <div key={c.placa}>{c.placa} - {c.marca} 
            <button onClick={() => alquilarVehiculo(c.placa)}>Alquilar</button>
          </div>
        ))}
      </section>

      <section>
        <h3>Historial de alquiler</h3>
        <ul>
          {historial.map((c, i) => <li key={i}>{c.marca} ({c.placa}) - ALQUILADO</li>)}
        </ul>
      </section>

      <section style={{ borderTop: '2px solid #ccc', marginTop: '20px' }}>
        <h3>Inversionistas</h3>
        <form onSubmit={agregarInversionista}>
          <input placeholder="Nombre" value={formInv.nombre} onChange={e => setFormInv({...formInv, nombre: e.target.value})} required />
          <input type="number" value={formInv.monto} onChange={e => setFormInv({...formInv, monto: Number(e.target.value)})} required />
          <button type="submit">Añadir inversionista</button>
        </form>
        <div style={{ display: 'flex', gap: '10px' }}>
          {inversionistas.map((inv, i) => (
            <div key={i} style={{ border: '1px solid black', padding: '5px' }}>
              {inv.nombre}: ${inv.monto}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;