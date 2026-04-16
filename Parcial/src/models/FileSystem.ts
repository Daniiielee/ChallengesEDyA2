export type NodeType = 'folder' | 'file';

export interface INode {
  id: string;
  name: string;
  type: NodeType;
  ownerEmail: string;
  children: INode[];
}


export class FileNode implements INode {
  id: string;
  name: string;
  type: NodeType;
  ownerEmail: string;
  children: FileNode[];

  constructor(name: string, type: NodeType, ownerEmail: string, id?: string, children?: FileNode[]) {
    this.id = id || (typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 9));
    
    this.name = name;
    this.type = type;
    this.ownerEmail = ownerEmail;
    this.children = children || [];
  }
  
  addChild(child: FileNode): void {
    if (this.type === 'file') {
      throw new Error("Un archivo no puede tener hijos.");
    }
    this.children.push(child);
  }

  toPlainObject(): INode {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      ownerEmail: this.ownerEmail,
      children: this.children.map(child => 
        child instanceof FileNode ? child.toPlainObject() : child
      )
    };
  }

  static fromPlainObject(obj: INode): FileNode {
    const children = obj.children?.map(child => FileNode.fromPlainObject(child)) || [];
    return new FileNode(obj.name, obj.type, obj.ownerEmail, obj.id, children);
  }
}