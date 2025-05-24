// src/contexts/CartContext.tsx
import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";

interface CartContextType {
  items: CartItem[];
  addItem: (pid: number, vid: string, qty?: number) => void;
  updateItem: (pid: number, vid: string, qty: number) => void;
  removeItem: (pid: number, vid: string) => void;
  clearCart: () => void;
}

export interface CartItem {
  productId: number;
  variantId: string;
  quantity: number;
  expiresAt: number; // timestamp em ms
}

type State = { items: CartItem[] };
type Action =
  | {
      type: "ADD_ITEM";
      payload: { productId: number; variantId: string; quantity: number };
    }
  | {
      type: "UPDATE_ITEM";
      payload: { productId: number; variantId: string; quantity: number };
    }
  | { type: "REMOVE_ITEM"; payload: { productId: number; variantId: string } }
  | { type: "CLEAR" };

const EXPIRATION = 15 * 60 * 1000; // 15 minutos
const STORAGE_KEY = "furniture:cart";

// Purga itens expirados
const purgeExpired = (items: CartItem[]): CartItem[] => {
  const now = Date.now();
  return items.filter((i) => i.expiresAt > now);
};

// Reducer padrão
const reducer = (state: State, action: Action): State => {
  const now = Date.now();
  const items = purgeExpired(state.items).map((i) => ({ ...i })); // clone e limpa expirados

  switch (action.type) {
    case "ADD_ITEM": {
      const { productId, variantId, quantity } = action.payload;
      const expiresAt = now + EXPIRATION;
      const idx = items.findIndex(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (idx >= 0) {
        items[idx].quantity += quantity;
        items[idx].expiresAt = expiresAt;
      } else {
        items.push({ productId, variantId, quantity, expiresAt });
      }
      return { items };
    }

    case "UPDATE_ITEM": {
      const { productId, variantId, quantity } = action.payload;
      const idx = items.findIndex(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (idx >= 0) {
        items[idx].quantity = quantity;
        items[idx].expiresAt = now + EXPIRATION;
      }
      return { items };
    }

    case "REMOVE_ITEM":
      return {
        items: items.filter(
          (i) =>
            !(
              i.productId === action.payload.productId &&
              i.variantId === action.payload.variantId
            )
        ),
      };

    case "CLEAR":
      return { items: [] };
  }
};

// Inicialização preguiçosa, já puxando do localStorage e purge expirados
const initializer = (): State => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { items: [] };
  try {
    const stored: CartItem[] = JSON.parse(raw);
    return { items: purgeExpired(stored) };
  } catch {
    return { items: [] };
  }
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Usa initializer para ler do localStorage antes de qualquer efet
  const [state, dispatch] = useReducer(reducer, undefined, initializer);

  // Salva sempre que `state.items` mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (pid: number, vid: string, qty = 1) =>
    dispatch({
      type: "ADD_ITEM",
      payload: { productId: pid, variantId: vid, quantity: qty },
    });

  const updateItem = (pid: number, vid: string, qty: number) =>
    dispatch({
      type: "UPDATE_ITEM",
      payload: { productId: pid, variantId: vid, quantity: qty },
    });

  const removeItem = (pid: number, vid: string) =>
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId: pid, variantId: vid },
    });

  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
