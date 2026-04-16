import React, { useState } from 'react';
import { FileNode } from '../models/FileSystem';
import { useFileSystem } from '../context/FileSystemContext';

const NodeItem: React.FC<{ node: FileNode }> = ({ node }) => {
  const { addNode } = useFileSystem();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (type: 'folder' | 'file') => {
    const name = prompt(`Nombre del nuevo ${type}:`);
    if (name && name.trim() !== "") {
        addNode(node.id, name, type);
        setIsOpen(true); 
    }
};

  return (
    <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px', color: "black" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0' }}>
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
          {node.type === 'folder' ? (isOpen ? '📂' : '📁') : '📄'} 
          <strong>{node.name}</strong> 
          <small style={{ color: 'gray', fontSize: '10px' }}> ({node.ownerEmail})</small>
        </span>
        
        {node.type === 'folder' && (
          <>
            <button onClick={() => handleCreate('folder')}>+ Carpeta</button>
            <button onClick={() => handleCreate('file')}>+ Archivo</button>
          </>
        )}
      </div>

      {isOpen && node.children.map(child => (
        <NodeItem key={child.id} node={child} />
      ))}
    </div>
  );
};

export const FileTreeVisual: React.FC = () => {
  const { root, saveToCloud } = useFileSystem();
  if (!root) return <p>Cargando sistema de archivos...</p>;

  return (
    <div className="tree-container" style={{ color: "black" }}>
      <h3>Explorador de Archivos</h3>
      <button onClick={saveToCloud} style={{ marginBottom: '20px', background: '#4CAF50', color: 'white' }}>
        Guardar en Firebase
      </button>
      <NodeItem node={root} />
    </div>
  );
};