import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
export const errorNotifier = (msg) =>
  toast({
    title: typeof msg === "string" ? msg : "Please try again",
    // description: "Unable to create user account.",
    status: "error",
    duration: 9000,
    position: "top",
    // isClosable: true,
  });

  export const successNotifier = (info) => {
    return toast({
      // title: "Success",
      description: info,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
