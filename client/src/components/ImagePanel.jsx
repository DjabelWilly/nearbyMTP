import React from "react";
import image1 from "../media/food.jpg";
import image2 from "../media/museum.jpg";
import image3 from "../media/vineyard.jpg";
import image4 from "../media/aiguesMortes.jpg";

const ImagePanel = () => {
  const images = [
    { src: image1, alt: "Restaurants", text: "Restaurants" },
    { src: image2, alt: "Musées", text: "Musées" },
    { src: image3, alt: "Vignobles", text: "Vignobles du Pic St Loup" },
    { src: image4, alt: "Aigues-Mortes", text: "Aigues-Mortes" },
  ];

  return (
    <div className="container mx-auto px-4 mt-4 flex justify-center items-center align-middle">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full max-w-sm mx-auto aspect-square overflow-hidden rounded-lg relative"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:opacity-75 transition-opacity duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-semibold">{image.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePanel;
