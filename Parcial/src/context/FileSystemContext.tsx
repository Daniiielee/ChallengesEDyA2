import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, set, get, child } from 'firebase/database';
import { db } from '../firebase/config';
import { FileNode, type INode } from '../models/FileSystem';
import { useAuth } from './AuthContext';

interface FileSystemContextType {
  root: FileNode | null;
  addNode: (parentId: string, name: string, type: 'folder' | 'file') => void;
  saveToCloud: () => Promise<void>;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

export const FileSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [root, setRoot] = useState<FileNode | null>(null);

  useEffect(() => {
    const loadTree = async () => {
      if (!user) {
        setRoot(null);
        return;
      }
      
      const dbRef = ref(db);
      const userPath = user.email?.replace(/\./g, '_') || "default_user";
      
      try {
        console.log("Intentando recuperar árbol para:", userPath);
        const snapshot = await get(child(dbRef, `trees/${userPath}`));
        
        if (snapshot.exists()) {
          console.log("Datos encontrados en la nube");
          const restoredTree = FileNode.fromPlainObject(snapshot.val() as INode);
          setRoot(restoredTree);
        } else {
          console.log("No hay datos previos, creando árbol inicial");
          setRoot(new FileNode("Mi Unidad", "folder", user.email || "anon"));
        }
      } catch (error) {
        console.error("Error cargando desde Realtime DB:", error);
      }
    };

    loadTree();
  }, [user]);

  const addNode = (parentId: string, name: string, type: 'folder' | 'file') => {
    if (!user || !root) return;

    const newTree = FileNode.fromPlainObject(root.toPlainObject());
    
    const findAndAdd = (current: FileNode): boolean => {
      if (current.id === parentId) {
        if (current.type === 'file') {
          alert("No se pueden crear elementos dentro de un archivo");
          return false;
        }
        current.addChild(new FileNode(name, type, user.email || "anon"));
        return true;
      }
      for (const childNode of current.children) {
        if (findAndAdd(childNode)) return true;
      }
      return false;
    };

    if (findAndAdd(newTree)) {
      setRoot(newTree);
    }
  };

  const saveToCloud = async () => {
    if (root && user) {
      const userPath = user.email?.replace(/\./g, '_') || "default_user";
      try {
        await set(ref(db, `trees/${userPath}`), root.toPlainObject());
        alert("¡Sistema guardado con éxito!");
      } catch (e) {
        alert("Error al guardar: " + e);
      }
    }
  };

  return (
    <FileSystemContext.Provider value={{ root, addNode, saveToCloud }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) throw new Error("useFileSystem debe usarse dentro de un Provider");
  return context;
};