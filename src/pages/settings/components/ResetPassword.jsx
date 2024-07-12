/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomBtn } from "../../../components/CustomBtn";
import { _COLORS } from "../../../constant";
import FormInput from "../../../components/FormInput";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword } from "../services/resetPassword";

function ResetPassword({ state }) {
  const queryClient = useQueryClient();
  const partnerId = state?._id;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: updatepassword } = useMutation({
    mutationFn: () => updatePassword(partnerId, { ...formData }, setLoading),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updatepassword(partnerId, { ...formData });
  };
  return (
    <Box
      width="100%"
      bgColor={_COLORS.white}
      borderRadius="10px"
      padding={"50px 30px"}
      mt="20px"
    >
      <Text fontSize="16px" fontWeight="semibold">
        Reset Password
      </Text>
      <Text pt="30px" pb="10px">
         Please insert the required credentials below to update the password.
      </Text>
      <Box mb="30px">
        <Flex>
          <FormInput
            width={["100%", "90%"]}
            type="text"
            name="oldPassword"
            value={formData?.oldPassword}
            placeholder="Enter Old Password"
            onChange={handleChange}
          />
          <FormInput
            width={["100%", "90%"]}
            type="text"
            name="newPassword"
            value={formData?.newPassword}
            placeholder="Enter New Password"
            onChange={handleChange}
          />
        </Flex>
      </Box>
      <CustomBtn
        fontSize="16px"
        text="save"
        height="50px"
        width={["100%", "360px"]}
        handleClick={handleSubmit}
        loading={loading}
      />
    </Box>
  );
}

export default ResetPassword;
