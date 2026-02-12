import { useState, useEffect } from 'react';
import type { Contact } from './types';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

// Datos de ejemplo
const datos_ejemplo: Contact[] = [
  { id: '1', name: 'Daniel Ruiz', phone: '3104243061' },
  { id: '2', name: 'Fernanda Perez', phone: '3113479020' },
];

const Loader = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulamos una demora de 2 segundos
    const timer = setTimeout(() => {
      setContacts(datos_ejemplo);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Lógica para añadir y eliminar
  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  if (isLoading) return <h2>Cargando contactos...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Contactos</h1>
      <ContactForm onAdd={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </div>
  );
};
export default Loader;