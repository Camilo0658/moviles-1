"use client";

import Image from "next/image";
import type { Product } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {product.imagen ? (
            <Image
              src={product.imagen}
              alt={product.nombre}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {product.nombre}
        </h3>
        {product.descripcion && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.descripcion}
          </p>
        )}
        <p className="text-lg font-bold text-primary">
          {formatPrice(product.precio)}
        </p>
      </CardFooter>
    </Card>
  );
}
