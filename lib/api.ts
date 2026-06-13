export interface Product {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Error al obtener productos');
  }
  
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Error al obtener el producto');
  }
  
  return res.json();
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!res.ok) {
    throw new Error('Error al crear el producto');
  }
  
  return res.json();
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!res.ok) {
    throw new Error('Error al actualizar el producto');
  }
  
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error('Error al eliminar el producto');
  }
}
