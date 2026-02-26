import React from 'react';

type Product = {
  id: number;
  nombre: string;
  precio: number;
};

interface ProductoProps {
  producto: Product;
  siguiente: () => void;
  anterior: () => void;
}

const Producto: React.FC<ProductoProps> = ({ producto, siguiente, anterior }) => {
  return (
    <div style={{ border: '1px solid black', padding: '20px', textAlign: 'center' }}>
      <h2>{producto.nombre}</h2>
      <p>ID: {producto.id}</p>
      <p>Precio: ${producto.precio}</p>
      <button onClick={anterior}>Anterior</button>
      <button onClick={siguiente}>Siguiente</button>
    </div>
  );
};

export default Producto;
