"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill as ArrowRight,
  BsFillArrowLeftCircleFill as ArrowLeft,
} from "react-icons/bs";
import { Card, CardBody, CardFooter, Button, Link } from "@nextui-org/react";
import { Product } from "./page";

interface Props {
  featuredItems: Product[];
}

function HomeCarousel({ featuredItems }: Props) {
  const [currentIndex, setIndex] = useState(0);
  const Items = featuredItems.slice(0, 5)

  const { image, id, title, price } = Items[currentIndex];
  const lastIndex = Items.length - 1;

  const showMapping = Items.map((_item, num) => (
    <button
      className={`h-[16px] w-[16px] rounded-full ${
        currentIndex === num ? "bg-primary" : "bg-accent"
      }`}
      onClick={() => setIndex(num)}
      key={num}
    />
  ));

  const handleNext = () => {
    if (currentIndex === lastIndex) setIndex(0);
    else setIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) setIndex(lastIndex);
    else setIndex((prev) => prev - 1);
  };

  return (
    <Card className="grid grid-cols-1 gap-3 bg-background">
      <CardBody>
        <div className="flex flex-col gap-3 font-semibold md:flex-row-reverse md:items-center">
          <Image
            className="h-[300px] w-full rounded bg-cover bg-no-repeat md:w-[300px] lg:h-[350px] lg:w-[350px]"
            src={image}
            alt={title}
            width={300}
            height={300}
          />
          <div className="md:flex-grow">
            <div className="flex justify-between gap-1 md:flex-col">
              <h1 className="text-lg font-semibold text-primary md:text-5xl lg:text-7xl">
                {title}
              </h1>
              <h1 className="text-lg font-semibold text-accent md:text-5xl lg:text-7xl">
                R {price.toLocaleString()}
              </h1>
            </div>
            <Button className="w-full justify-self-end bg-accent font-semibold text-white md:text-xl" href={`/${id}`} as={Link}>
              View
            </Button>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={handleBack} className="bg-accent">
          <ArrowLeft className="text-white" />
        </Button>

        <div className="flex gap-3 max-[350px]:hidden">{showMapping}</div>

        <Button className="bg-accent" onClick={handleNext}>
          <ArrowRight className="text-white" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default HomeCarousel;
