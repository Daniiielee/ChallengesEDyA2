import type { Contact } from './types';

const ContactItem = ({ contact, onDelete }: { contact: Contact, onDelete: (id: string) => void }) => (
  <div style={{ borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <strong>{contact.name}</strong> - {contact.phone}
    </div>
    <button onClick={() => onDelete(contact.id)} style={{ color: 'red' }}>Eliminar</button>
  </div>
);

const ContactList = ({ contacts, onDelete }: { contacts: Contact[], onDelete: (id: string) => void }) => (
  <div>
    {contacts.length === 0 ? (
      <p>No hay contactos.</p>
    ) : (
      contacts.map(c => <ContactItem key={c.id} contact={c} onDelete={onDelete} />)
    )}
  </div>
);

export default ContactList;