import ProductGallery from "./components/ProductGallery";

import { Truck, MapPin, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { QuantitySelector } from "../../components/QuantitySelector";
import { Input } from "../../components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

import { motion, AnimatePresence } from "framer-motion";
import { products, type Variant } from "../../data/products";
import { ProductCard } from "./components/ProductCard";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";
import { formatBRL } from "../../lib/format";

type Address = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type FreteOption = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  icon: React.ReactNode;
  isRecommended?: boolean;
};

export function ProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  const { addItem } = useCart();

  const colors = useMemo(
    () =>
      product ? Array.from(new Set(product.variants.map((v) => v.color))) : [],
    [product]
  );

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const sizes = useMemo(
    () =>
      product
        ? Array.from(
            new Set(
              product.variants
                .filter((v) => v.color === selectedColor)
                .map((v) => v.size)
                .filter((s): s is string => !!s)
            )
          )
        : [],
    [product, selectedColor]
  );

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes[0]
  );

  const variant: Variant = useMemo<Variant>(() => {
    if (!product) {
      throw new Error("Product not found");
    }
    return (
      product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      ) || product.variants[0]
    );
  }, [product, selectedColor, selectedSize]);

  useEffect(() => {
    if (!product) return;
    setSelectedColor(colors[0] ?? "");
    setSelectedSize(undefined);
  }, [product, colors]);

  useEffect(() => {
    setSelectedSize(sizes[0]);
  }, [sizes]);

  const [open, setOpen] = useState(false);
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return <div>Produto não encontrado</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const imagesFront = useMemo(() => variant.images, [variant]);

  const handleCepChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
    }
    setCep(value);
  };

  const consultCep = async (): Promise<void> => {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) {
      setError("CEP deve ter 8 dígitos.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      const data = (await res.json()) as Record<string, any>;

      if (data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
      } else {
        setAddress({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      }
    } catch {
      setError("Erro ao consultar o CEP.");
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const options: FreteOption[] = [
    {
      id: "delivery",
      title: "Receba em casa",
      description:
        "Agendamento a partir de X dias úteis. Assistência técnica garantida.",
      priceLabel: formatBRL(80),
      icon: <Truck className="w-5 h-5" />,
      isRecommended: true,
    },
    {
      id: "pickup",
      title: "Retire na loja",
      description:
        "Disponível em lojas próximas a você (ex: Tok&Stok Marginal Tietê — 13.7 km).",
      priceLabel: "GRÁTIS",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  const installments = 10;
  const discountPix = 0.1;
  const installmentValue = product.price / installments;
  const pixPrice = product.price * (1 - discountPix);

  return (
    <>
      <div className="lg:grid lg:grid-cols-[3fr_2fr] py-5 sm:flex sm:flex-wrap">
        <div className="p-2">
          <ProductGallery images={imagesFront} />
        </div>
        <div className="px-4 py-5 gap-3 flex flex-col sm:w-full sm:mt-6">
          <h1 className="text-xl lg:text-3xl sm:text-2xl font-semibold uppercase">
            {product.title}
          </h1>

          <p className="text-xs lg:text-base sm:text-sm">ID: {product.id}</p>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-medium">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <div className="space-y-1">
            {product.originalPrice && (
              <span className="text-xs lg:text-sm sm:text-sm line-through text-gray-400">
                {formatBRL(product.originalPrice)}
              </span>
            )}
            <h2 className="text-xl lg:text-3xl sm:text-2xl font-bold text-green-800">
              {formatBRL(product.price)}
            </h2>

            <div className="text-sm lg:text-base space-y-1">
              <p>
                <span className="font-bold tracking-wider">
                  {installments}x
                </span>{" "}
                de{" "}
                <span className="font-bold tracking-wider">
                  {formatBRL(installmentValue)}
                </span>{" "}
                sem juros
              </p>

              <p>
                <span className="font-bold">{formatBRL(pixPrice)}</span> no Pix
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-sm lg:text-base">Outros acabamentos:</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <QuantitySelector
                value={quantity}
                onChange={(q) => setQuantity(q)}
              />
            </div>
          </div>
          {sizes.length > 0 && (
            <div className="mt-2 flex gap-2 items-center lg:text-base text-sm">
              <span>Tamanho:</span>
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          )}

          <div className="py-2 flex flex-col gap-2">
            <Button className="bg-green-800 hover:bg-green-700 text-zinc-50 tracking-wider uppercase  py-6">
              Comprar
            </Button>
            <Button
              className=" bg-gray-200 hover:bg-gray-300  text-green-800 font-bold tracking-wider uppercase  py-6"
              onClick={() => {
                addItem(product.id, variant.id, quantity);
                // se quiser resetar a quantidade após adicionar:
                setQuantity(1);
              }}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
          <div className="border rounded-md">
            <div className="p-4 space-y-2">
              <p className="text-sm lg:text-base font-medium">
                Calcule o valor do frete
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs lg:text-sm">
                  CEP{" "}
                  <Link
                    to="https://buscacepinter.correios.com.br/app/endereco/index.php"
                    className="underline"
                  >
                    Não sei meu CEP
                  </Link>
                </p>
                <Button
                  className="text-sm"
                  variant="link"
                  size="sm"
                  onClick={() => setOpen((o) => !o)}
                >
                  {open ? "Fechar" : "Calcular"}
                </Button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t"
                >
                  <div className="p-4 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="12345-678"
                        value={cep}
                        onChange={handleCepChange}
                        maxLength={9}
                        className="flex-1"
                      />
                      <Button
                        onClick={consultCep}
                        disabled={loading}
                        className="whitespace-nowrap"
                      >
                        {loading ? "Buscando..." : "OK"}
                      </Button>
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    {address && (
                      <>
                        <p className="text-sm">
                          {address.logradouro}, {address.bairro},{" "}
                          {address.localidade} – {address.uf}
                        </p>

                        <Card className="border gap-0">
                          <CardHeader>
                            <p className="text-base font-medium">
                              Opções de entrega
                            </p>
                          </CardHeader>

                          <CardContent className="p-4 space-y-2">
                            {options.map((opt) => (
                              <div
                                key={opt.id}
                                className={`flex items-start gap-4 p-4 rounded-md border ${
                                  opt.isRecommended
                                    ? "border-green-300 bg-green-50"
                                    : "border-gray-200"
                                }`}
                              >
                                <div className="pt-1">{opt.icon}</div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-semibold">
                                      {opt.title}
                                    </h4>
                                    <span
                                      className={`font-medium ${
                                        opt.isRecommended
                                          ? "text-green-700"
                                          : "text-black"
                                      }`}
                                    >
                                      {opt.priceLabel}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {opt.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h3 className="text-xl font-medium tracking-tight text-gray-900">
          Produtos similares
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              variant={prod.variants[0]}
            />
          ))}
        </div>
      </section>
    </>
  );
}
