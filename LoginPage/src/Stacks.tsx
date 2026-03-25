import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Libro, Stack } from './Stack';

export const Stacks = () => {
  const navigate = useNavigate();

  const initialBooks: Libro[] = [
    { nombre: "Cien años de soledad", isbn: "978-0307474728", autor: "Gabriel García Márquez", editorial: "Diana" },
    { nombre: "Clean Code", isbn: "978-0132350884", autor: "Robert C. Martin", editorial: "Prentice Hall" }
  ];

  const [stack, setStack] = useState<Stack<Libro>>(new Stack(initialBooks));
  const [formData, setFormData] = useState<Libro>({
    nombre: '',
    isbn: '',
    autor: '',
    editorial: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.isbn) return;

    const newStack = new Stack<Libro>(stack.toArray().reverse()); 
    newStack.push(formData);
    
    setStack(newStack);
    setFormData({ nombre: '', isbn: '', autor: '', editorial: '' });
  };

  const popBook = () => {
    const newStack = new Stack<Libro>(stack.toArray().reverse());
    newStack.pop();
    setStack(newStack);
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

      <h1>Libros</h1>

      <form onSubmit={addBook} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input name="nombre" placeholder="Nombre del libro" value={formData.nombre} onChange={handleInputChange} />
        <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleInputChange} />
        <input name="autor" placeholder="Autor" value={formData.autor} onChange={handleInputChange} />
        <input name="editorial" placeholder="Editorial" value={formData.editorial} onChange={handleInputChange} />
        <button type="submit" style={{ backgroundColor: '#00bcd4', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
          Agregar
        </button>
      </form>

      <hr />
      <h2>Libros guardados</h2>
      <button onClick={popBook} disabled={stack.isEmpty()} style={{ marginBottom: '20px' }}>
        Eliminar un libro
      </button>

      {stack.isEmpty() ? (
        <p>No hay libros.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stack.toArray().map((libro, index) => (
            <div key={libro.isbn + index} style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#000000',
              color: 'white'
            }}>
              <strong>{libro.nombre}</strong>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                {libro.autor} | {libro.editorial} | {libro.isbn}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};