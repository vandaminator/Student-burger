import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa6";

type Props = { title: string; removeItem(): void };

const TitleItem = ({ title, removeItem }: Props) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <h3 className="text-lg">{title}</h3>
      <Button color="danger" isIconOnly onClick={(e) => removeItem()}>
        <FaTrash />
      </Button>
    </div>
  );
};

export default TitleItem;
