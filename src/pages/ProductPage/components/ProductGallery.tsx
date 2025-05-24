"use client";

import * as React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Tabs
      value={`image-${currentIndex}`}
      onValueChange={(value) => setCurrentIndex(Number(value.split("-")[1]))}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative">
        {/* Imagem Principal */}
        {images.map((src, index) => (
          <TabsContent
            key={index}
            value={`image-${index}`}
            className="w-full  flex justify-center"
          >
            <img
              src={src}
              alt={`Product image ${index + 1}`}
              className="w-auto rounded-lg object-cover"
            />
          </TabsContent>
        ))}

        {/* Botões de Navegação */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-md cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Miniaturas (Agora dentro do Tabs!) */}
      <TabsList className="flex justify-center gap-2 mt-4">
        {images.map((src, index) => (
          <TabsTrigger
            key={index}
            value={`image-${index}`}
            className="w-20 h-20  rounded-md overflow-hidden"
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="object-cover"
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
