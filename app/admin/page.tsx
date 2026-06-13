"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Header } from "@/components/header";
import { ProductFormDialog } from "@/components/product-form-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import type { Product } from "@/lib/api";
import { createProduct, updateProduct, deleteProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, PackageX, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>(
    `${API_BASE_URL}/products`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveProduct = async (productData: Omit<Product, "id">) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData);
    } else {
      await createProduct(productData);
    }
    mutate();
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      mutate();
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl">Administrar Productos</CardTitle>
              <CardDescription>
                Agrega, edita o elimina productos del catalogo
              </CardDescription>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="text-muted-foreground">Cargando productos...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                  <PackageX className="h-16 w-16 text-muted-foreground/50" />
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      Error al cargar los productos
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Asegurate de que el servidor Spring Boot este corriendo en el puerto 8080
                    </p>
                  </div>
                  <Button onClick={() => mutate()} variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reintentar
                  </Button>
                </div>
              </div>
            ) : !products || products.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                  <PackageX className="h-16 w-16 text-muted-foreground/50" />
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      No hay productos todavia
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Haz clic en &quot;Nuevo Producto&quot; para agregar el primero
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripcion</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="w-[120px] text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-secondary">
                            {product.imagen ? (
                              <Image
                                src={product.imagen}
                                alt={product.nombre}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Package className="h-6 w-6 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.nombre}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">
                          {product.descripcion || "-"}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatPrice(product.precio)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(product)}
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product)}
                              className="text-destructive hover:text-destructive"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <ProductFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
