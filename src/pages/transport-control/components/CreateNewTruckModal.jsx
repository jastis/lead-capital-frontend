import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTruck } from "../service/truck";
import { _COLORS } from "../../../constant";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";

export const CreateTruckModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    registrationNumber: "",
    truckType: "",
    assetSize: "",
    model: "",
    make: "",
    chassisNumber: "",
    vehicleLicence: "",
  });

  const [truckImage, setTruckImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createNewTruck, isLoading } = useMutation({
    mutationFn: createTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      registrationNumber,
      truckType,
      assetSize,
      make,
      chassisNumber,
      vehicleLicence,
    } = formValues;
    const formData = new FormData();

    formData.append("registrationNumber", registrationNumber);
    formData.append("truckType", truckType);
    formData.append("assetSize", assetSize);
    formData.append("make", make);
    formData.append("chassisNumber", chassisNumber);
    formData.append("vehicleLicence", vehicleLicence);
    formData.append("image", truckImage);

    createNewTruck(formData);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
      >
        <Flex alignItems={"center"} gap="5px" fontWeight={"500"}>
          <BiPlus />
          <Text>Add Truck</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Truck</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input
                name="registrationNumber"
                value={formValues.registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                fontSize=".86em"
              />
              <Input
                name="truckType"
                value={formValues.truckType}
                onChange={handleChange}
                placeholder="Truck Type"
                fontSize=".86em"
              />
              {/* <Select placeholder="Asset Class" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select> */}
              <Select
                placeholder="Asset Size"
                fontSize=".86em"
                name="assetSize"
                value={formValues.assetSize}
                onChange={handleChange}
              >
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </Select>
              <Input
                placeholder="Vehicle Licence Number"
                fontSize=".86em"
                name="vehicleLicence"
                value={formValues.vehicleLicence}
                onChange={handleChange}
              />
              <Input
                placeholder="Model"
                fontSize=".86em"
                name="model"
                value={formValues.model}
                onChange={handleChange}
              />
              <Input
                placeholder="Make"
                fontSize=".86em"
                name="make"
                value={formValues.make}
                onChange={handleChange}
              />
              <Input
                placeholder="Chassis Number"
                fontSize=".86em"
                name="chassisNumber"
                value={formValues.chassisNumber}
                onChange={handleChange}
              />
              <Input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                placeholder="Truck License Image"
                fontSize=".86em"
                name="image"
          
                onChange={(e) => setTruckImage(e.target.files?.[0])}
              />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Add Truck
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
