import { X } from "lucide-react";

import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../contexts/CartContext";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "./ui/button";
import { products } from "../data/products";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, removeItem, updateItem, clearCart } = useCart();

  const formatBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (!open) return null;

  const total = items.reduce((sum, i) => {
    const p = products.find((p) => p.id === i.productId)!;
    return sum + p.price * i.quantity;
  }, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <aside className="fixed top-0 right-0 h-full lg:w-120 w-full sm:w-100 bg-white z-50 shadow-lg flex flex-col">
        <header className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Seu Carrinho</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </header>

        <div className="p-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Carrinho vazio</p>
          ) : (
            items.map((i: CartItem) => {
              const prod = products.find((p) => p.id === i.productId)!;
              const variant = prod.variants.find((v) => v.id === i.variantId)!;
              return (
                <div key={i.productId + i.variantId} className="flex  mb-4">
                  <img
                    src={variant.thumbnail}
                    alt={prod.title}
                    className="w-20 h-20 rounded shadow-xl/30"
                  />
                  <div className="flex flex-col w-full ml-3">
                    <p className="font-medium">{prod.title}</p>
                    <p className="text-sm text-gray-500 pb-2">
                      {variant.color} {variant.size || ""}
                    </p>
                    <span className="font-bold">
                      {formatBRL.format(prod.price * i.quantity)}
                    </span>

                    <Button
                      className="cursor-pointer flex justify-start hover:text-red-800"
                      variant="link"
                      size="sm"
                      onClick={() => removeItem(i.productId, i.variantId)}
                    >
                      Remover
                    </Button>
                  </div>
                  <QuantitySelector
                    value={i.quantity}
                    onChange={(qty) =>
                      updateItem(i.productId, i.variantId, qty)
                    }
                  />
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-4 border-t space-y-2">
            <div className="flex justify-between mb-4 font-bold">
              <span>Total:</span>
              <span className="text-green-800">{formatBRL.format(total)}</span>
            </div>
            <Button className="w-full uppercase bg-green-700 hover:bg-green-600 cursor-pointer text-white">
              Continuar
            </Button>
            <Button
              className="w-full bg-red-800 hover:bg-red-700 cursor-pointer text-white uppercase"
              onClick={clearCart}
            >
              Limpar Carrinho
            </Button>
          </footer>
        )}
      </aside>
    </>
  );
}
