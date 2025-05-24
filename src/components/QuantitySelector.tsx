import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus } from "lucide-react";

/**
 * QuantitySelector pode ser controlado ou não.
 * Se value e onChange forem providos, funciona como componente controlado.
 */
export function QuantitySelector({
  value: controlledValue,
  onChange,
}: {
  value?: number;
  onChange?: (newQty: number) => void;
}) {
  // estado interno usado quando não controlado
  const [quantity, setQuantity] = useState<number>(controlledValue ?? 1);

  // detecta modo controlado
  const isControlled = controlledValue !== undefined && onChange !== undefined;
  const qty = isControlled ? controlledValue! : quantity;

  const increment = () => {
    const newQty = qty + 1;
    if (isControlled) {
      onChange!(newQty);
    } else {
      setQuantity(newQty);
    }
  };

  const decrement = () => {
    const newQty = Math.max(1, qty - 1);
    if (isControlled) {
      onChange!(newQty);
    } else {
      setQuantity(newQty);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      if (isControlled) {
        onChange!(value);
      } else {
        setQuantity(value);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className="rounded-full w-8 h-8 p-0"
        onClick={decrement}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Input
        type="number"
        value={qty}
        onChange={handleChange}
        className="w-12 h-8 text-center px-0 border rounded-md"
      />
      <Button
        variant="outline"
        className="rounded-full w-8 h-8 p-0"
        onClick={increment}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
