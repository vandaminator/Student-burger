"use client"

import "./Carousel.css";
import React, { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  items: { image: string; title: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = items.length - 1

  const nextSlide = () => {
    // Implement logic to move to the next slide
    if (currentIndex === lastIndex) {
        setCurrentIndex(0)
    } else {
        setCurrentIndex((prev) => prev + 1)
    }
  };

  const prevSlide = () => {
    // Implement logic to move to the previous slide
    if (currentIndex === 0) {
        setCurrentIndex(lastIndex)
    } else {
        setCurrentIndex((prev) => prev - 1)
    }
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide}>Previous</button>
      {items.map((item, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
        >
          <Image src={item.image} alt={item.title} width={300} height={300}/>
        </div>
      ))}
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
