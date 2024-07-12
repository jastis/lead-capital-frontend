import { Box } from '@chakra-ui/react'
import Info from '../Info';
import BankDetails from '../BankDetails';
import ResetPassword from '../ResetPassword';
import { useGetState } from '../../../../GlobalStateContext/useGetState';

function Profile() {
   const { state } = useGetState();
  return (
    <Box>
      <Info state={state}/>
      <BankDetails />
      <ResetPassword state={state} />
    </Box>
  );
}

export default Profile
