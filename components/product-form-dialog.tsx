"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Omit<Product, "id">) => Promise<void>;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio.toString(),
        descripcion: product.descripcion || "",
        imagen: product.imagen || "",
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
      });
    }
    setErrors({});
  }, [product, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    
    if (!formData.precio) {
      newErrors.precio = "El precio es obligatorio";
    } else if (isNaN(Number(formData.precio)) || Number(formData.precio) <= 0) {
      newErrors.precio = "El precio debe ser un numero mayor a 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await onSave({
        nombre: formData.nombre.trim(),
        precio: Number(formData.precio),
        descripcion: formData.descripcion.trim(),
        imagen: formData.imagen.trim(),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Modifica los datos del producto"
              : "Completa los datos para agregar un nuevo producto"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: iPhone 15 Pro"
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="precio">Precio *</Label>
              <Input
                id="precio"
                type="number"
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                placeholder="Ej: 4500000"
                className={errors.precio ? "border-destructive" : ""}
              />
              {errors.precio && (
                <p className="text-sm text-destructive">{errors.precio}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripcion</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describe las caracteristicas del producto..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imagen">URL de la Imagen</Label>
              <Input
                id="imagen"
                type="url"
                value={formData.imagen}
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.value })
                }
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
