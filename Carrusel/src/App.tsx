import { useState, useEffect } from 'react';
import './App.css';
import Producto from './Producto';

type Product = {
  id: number;
  nombre: string;
  precio: number;
};

const productos: Product[] = [
  { id: 1, nombre: 'Camisa', precio: 40000 },
  { id: 2, nombre: 'Pantalon', precio: 80000 },
  { id: 3, nombre: 'Zapatos', precio: 120000 },
  { id: 4, nombre: 'Calzon', precio: 10000 },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const irSiguiente = () => {
    setCurrentIndex((currentIndex + 1) % productos.length);
  };

  const irAnterior = () => {
    setCurrentIndex((currentIndex - 1 + productos.length) % productos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const productoActual = productos[currentIndex];

  return (
    <div>
      <h1>Carrusel de Productos</h1>
      <Producto producto={productoActual} siguiente={irSiguiente} anterior={irAnterior} />
      <h2>Cada producto avanza automaticamente cada 5 segundos </h2>    
    </div>
  );
}

export default App;
