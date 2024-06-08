import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  handleAddComment: (
    text: string,
    rating: Set<string>,
    user: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => void;
};

function AddComment({ handleAddComment }: Props) {
  let { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [svalue, setSValue] = useState(new Set([]));
  const { status, data } = useSession();

  const user = data?.user;
  const userId = user?.email as string;

  return (
    <>
      <Button onPress={onOpen}>Add</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              {status == "authenticated" && (
                <>
                  <ModalHeader>Add A comment</ModalHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <ModalBody>
                      <Select
                        className="text-black"
                        items={[
                          { key: 1, label: "1" },
                          { key: 2, label: "2" },
                          { key: 3, label: "3" },
                          { key: 4, label: "4" },
                          { key: 5, label: "5" },
                        ]}
                        selectedKeys={svalue}
                        // @ts-ignore
                        onSelectionChange={setSValue}
                        label="Rating"
                        placeholder="Choose Rating"
                        isDisabled={loading}
                        isRequired
                        required
                      >
                        {(num) => (
                          <SelectItem className="text-black" key={num.key}>
                            {num.label}
                          </SelectItem>
                        )}
                      </Select>
                      <Textarea
                        isRequired
                        placeholder="Enter comment"
                        variant="underlined"
                        value={value}
                        onValueChange={(v) => {
                          if (!(v.length > 72)) {
                            setValue(v);
                          }
                        }}
                        isDisabled={loading}
                        required
                        description="Max is 72 char"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onPress={onClose}
                        variant="bordered"
                        color="danger"
                      >
                        Cancel
                      </Button>
                      <Button
                        onPress={(_e) =>
                          // @ts-ignore
                          handleAddComment(value, svalue, +userId, setLoading)
                        }
                        variant="solid"
                        color="success"
                        isLoading={loading}
                        isDisabled={loading}
                        type="submit"
                      >
                        Add
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
              {status != "authenticated" && (
                <>
                  <ModalHeader>Please log in</ModalHeader>
                  <ModalBody>
                    <Button
                      onPress={() =>
                        signIn("credentials", {
                          callbackUrl: window.location.href,
                        })
                      }
                    >
                      Sign In
                    </Button>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddComment;
