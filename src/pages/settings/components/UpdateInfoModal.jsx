/* eslint-disable react/prop-types */
import { Button, Flex} from "@chakra-ui/react";
import FormInput from "../../../components/FormInput";
import { _COLORS } from "../../../constant";
import { useState } from "react";
import { updatePartner } from "../services/support";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "../../../components/FullPageLoader";

const UpdateInfoModal = ({ data, state, onClose }) => {
  console.log(data)
  const [loading, setLoading] = useState(false);
  const partnerId = state?._id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: data[0]?.name,
    email: data[0]?.email,
    phone: data[0]?.phone,
    location: data[0]?.location,
    businessName: data[0]?.businessName,
    country: data[0]?.country,
    cacNumber: data[0]?.cacNumber,
    address: data[0]?.address,
  });
  const { mutate: updatePartners, isLoading } = useMutation({
    mutationFn: () =>
      updatePartner(partnerId, { ...formData }, setLoading),
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ["partner"] });
      onClose();
    },
    onError: (e) => {
      console.log("rtrr", e);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUpdate = () => {
    setLoading(true);
    const payload = { ...formData };
    updatePartners(partnerId, payload,);
  };

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Flex flexDir={"column"} gap="20px" px="10px" w="100%">
      <FormInput
        label="Enter Your Full Name"
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your CAC Number"
        type="text"
        name="cacNumber"
        value={formData?.cacNumber}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your Phone Number"
        type="text"
        name="phone"
        value={formData?.phone}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your Company Name"
        type="text"
        name="businessName"
        value={formData?.businessName}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your Location"
        type="text"
        name="location"
        value={formData?.location}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your address"
        type="text"
        name="address"
        value={formData?.address}
        onChange={handleChange}
      />
      <FormInput
        label="Enter Your Country"
        type="text"
        name="country"
        value={formData?.country}
        onChange={handleChange}
      />
      <Button
        bg={_COLORS.brand}
        color="#fff"
        _hover={{ background: `${_COLORS.brand}50` }}
        px="50px"
        fontSize={".86em"}
        alignSelf={"center"}
        isLoading={loading}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </Flex>
  );
};

export default UpdateInfoModal;
