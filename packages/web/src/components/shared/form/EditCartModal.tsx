//
//  EditCartModal.tsx
//  echoppe
//
//  Created by d-exclaimation on 17:25.
//

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { CartDTO, CartList } from "@echoppe/common";
import React, { useCallback, useState } from "react";

type Props = {
  edited: CartList | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: CartDTO) => void;
};

const EditCartModal: React.FC<Props> = ({
  edited,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState<Date | null>(null);
  const handleSubmit = useCallback(() => {
    onSubmit({
      title,
      description: desc,
      due_date: due ? due.toISOString() : null,
    });
    onClose();
  }, [onSubmit, onClose, title, desc, due]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{edited?.title ?? "Edit"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title" my=".5rem">
            <FormLabel> Title </FormLabel>
            <Input
              placeholder={edited?.title ?? "Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="description" my=".5rem">
            <FormLabel> Description </FormLabel>
            <Textarea
              placeholder={edited?.description ?? "Description"}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="published-date">Published Date</FormLabel>
            <Input
              type="date"
              value={due?.toISOString().split("T")[0] ?? ""}
              onChange={(e) => setDue(e.target.valueAsDate)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" variant="ghost" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCartModal;
