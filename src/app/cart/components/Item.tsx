import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { Image, Select, SelectItem } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import TitleItem from "./TitleItem";

type Props = {
  order: Product;
  removeItemCart: () => void;
  changeQty: (qty: number) => void;
};

const Item = ({ order, removeItemCart, changeQty }: Props) => {
  const [qty, SetQty] = useState(order.quantity);
  const [numAvaliable, setAvaliable] = useState([1]);

  useEffect(() => {
    if (order.avaliableQty !== undefined) {
      const numList: number[] = [];
      for (let num = 1; num <= order.avaliableQty; num++) {
        numList.push(num);
      }
      setAvaliable(numList);
    }
  }, [order]);

  const genRand = (len: number) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };

  return (
    <div className="flex flex-grow justify-between gap-3 rounded p-3 shadow">
      <Image src={order.image} alt={order.title} className="w-[200px]" />
      <div className="flex flex-col gap-4">
        <TitleItem title={order.title} removeItem={removeItemCart} />
        {/* <label htmlFor="qty_input">
          Qty:
          <Input
            id="qty_input"
            type="number"
            value={qty.toString()}
            onChange={(e) => {
              const value = +e.target.value;
              changeQty(value);
              SetQty(value);
            }}
            min={1}
          />
        </label> */}
        <select
          // items={numAvaliable}
          className="p-3 rounded"
          value={qty}
          onChange={(e) => {
            const value = +e.target.value;
            changeQty(value);
            SetQty(value);
          }}
        >
          {/* {(num) => <SelectItem key={genRand(num)}>{num}</SelectItem>} */}
          {numAvaliable.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Item;
