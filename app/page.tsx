import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Productos Tecnologicos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explora nuestra seleccion de los mejores productos de tecnologia
          </p>
        </div>
        <ProductGrid />
      </main>
    </div>
  );
}
