import { Heart, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import type { Product, Variant } from "../../../data/products";
import { Link } from "react-router-dom";
import { formatBRL } from "../../../lib/format";

type Props = {
  product: Product;
  variant?: Variant;
};

export function ProductCard({ product, variant }: Props) {
  const { id, title, subtitle, rating, price, originalPrice, discountPercent } =
    product;

  const imageSrc = variant?.thumbnail ?? product.variants[0].thumbnail;

  return (
    <Card className="relative group overflow-hidden border-0 shadow-none hover:border hover:border-gray-100 ">
      {/* Coração de favorito */}
      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
      </div>
      <Link to={`/product/${id}`} className="block">
        <div className="flex lg:flex-col  sm:flex-row">
          <div className="w-full lg:w-full sm:w-1/2">
            <CardHeader className="p-0">
              <img
                src={imageSrc}
                alt={title}
                className="w-full aspect-square object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none"
              />
            </CardHeader>
          </div>
          <CardContent className="py-3 px-4 space-y-2">
            {/* Título e subtítulo */}
            <div>
              <h3 className="lg:text-base sm:text-sm font-medium text-gray-800">
                {title}
              </h3>
              {subtitle && <p className="text-sm  text-gray-500">{subtitle}</p>}
            </div>

            {/* Avaliação */}
            <div className="inline-flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {rating.toFixed(1)}
              </span>
            </div>

            {/* Preço */}
            <div className="flex flex-col items-baseline gap-2">
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatBRL(originalPrice)}
                </span>
              )}
              <div className="flex">
                <span className="text-lg font-bold text-green-800">
                  {formatBRL(price)}
                </span>
                {discountPercent && (
                  <Badge variant="secondary" className="text-green-800">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
