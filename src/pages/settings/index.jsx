import { Box } from "@chakra-ui/react";
import Nav from "./components/Nav";

function Settings({ ...props }) {
  return (
    <Box>
      <Nav {...props} />
    </Box>
  );
}

export default Settings;
