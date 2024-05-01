import { idProduct } from "@/types";
import { Button, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

type Props = { data: idProduct };

function ImageSlider({ data }: Props) {
  const [indexImage, setIndex] = useState(0);

  const ChangeImage = (dir: "next" | "back") => {
    const loaded = data;
    const last = loaded.images.length - 1;
    if (dir === "next") {
      if (indexImage === last) setIndex(0);
      else setIndex(indexImage + 1);
    } else if (dir === "back") {
      if (indexImage === 0) setIndex(last);
      else setIndex(indexImage - 1);
    }
  };
  return (
    <div className="flex flex-col gap-3 w-1/2 max-lg:w-full items-center">
      <Image
        src={data.images[indexImage]}
        alt={data.title}
        className="h-[350px]"
      />
      <div className="flex w-full items-center justify-between gap-3">
        <Button
          isIconOnly
          color="primary"
          onClick={(_e) => ChangeImage("back")}
        >
          <HiArrowCircleLeft size={36} className="rounded text-white" />
        </Button>
        <div className="flex gap-3">
          {data.images.slice(0, 5).map((_i, num) => (
            <div
              className={`h-4 w-4 rounded-full ${
                num === indexImage ? "bg-primary" : "bg-accent"
              }`}
              key={num}
            />
          ))}
        </div>
        <Button
          isIconOnly
          color="primary"
          onClick={(_e) => ChangeImage("next")}
        >
          <HiArrowCircleRight size={36} className="rounded text-white" />
        </Button>
      </div>
    </div>
  );
}

export default ImageSlider;
