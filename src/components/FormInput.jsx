import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function FormInput({ label, type, ...props }) {
  return (
    <FormControl>
      <FormLabel fontSize={".86em"}>{label}</FormLabel>
      <Input type={type} {...props} />
    </FormControl>
  );
}

export default FormInput;
