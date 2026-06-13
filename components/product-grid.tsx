"use client";

import useSWR from "swr";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/api";
import { Loader2, PackageX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error del servidor");
    return res.json();
  });

export function ProductGrid() {
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>(
    `${API_BASE_URL}/products`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
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
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <PackageX className="h-16 w-16 text-muted-foreground/50" />
          <div>
            <p className="text-lg font-medium text-foreground">
              No hay productos disponibles
            </p>
            <p className="text-sm text-muted-foreground">
              Agrega productos desde el panel de administracion
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {(Array.isArray(products) ? products : []).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
