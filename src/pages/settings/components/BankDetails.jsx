import { Box, Flex, Text } from "@chakra-ui/react";
import FormInput from "../../../components/FormInput";
import { CustomBtn } from "../../../components/CustomBtn";
import { _COLORS } from "../../../constant";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePartner } from "../services/support";
import { useGetState } from "../../../GlobalStateContext/useGetState";


function BankDetails() { 
  const {state} = useGetState()
  const [loading, setLoading] = useState(false)
  const partnerId= state?._id
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    "bankAccount.bankName":"",
    "bankAccount.accountName":"",
    "bankAccount.accountNumber":""

  })
  const handleChange = (e)=>{
    const {name, value}= e.target
    setFormData(prev=> ({...prev,[name]:value}))
  }
 
  const Updatemutation = useMutation({
    mutationFn: () => updatePartner(partnerId,{...formData}, setLoading),
    onSuccess: () => {
      queryClient.invalidateQueries(["partners"], partnerId);
    },
  });

  const handleSubmit = () => {
    setLoading(true)
    const payload= {...formData}
    console.log(payload, partnerId)
    Updatemutation.mutate(partnerId, payload );
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
        Add Bank Account
      </Text>
      <Flex
        flexDir={["column", "row"]}
        justifyContent="space-between"
        width="100%"
        my="30px"
        gap={["20px", "0"]}
      >
        <FormInput
          width={["100%", "90%"]}
          label={"Input your Bank Name"}
          type="text"
          name="bankAccount.bankName"
          value={formData?.bankAccount?.bankName}
          onChange={handleChange}
        />
        <FormInput
          width={["100%", "90%"]}
          label={"Input your Account Name"}
          type="text"
          name="bankAccount.accountName"
          value={formData?.bankAccount?.accountName}
          onChange={handleChange}
        />
        <FormInput
          width={["100%", "90%"]}
          label={"Input your Account Number"}
          type="number"
          name="bankAccount.accountNumber"
          value={formData?.bankAccount?.accountNumber}
          onChange={handleChange}
        />
      </Flex>
      <CustomBtn
        text="save"
        fontSize="16px"
        height="50px"
        width={["100%", "360px"]}
        handleClick={handleSubmit}
        loading={loading}
      />
    </Box>
  );
}

export default BankDetails;
