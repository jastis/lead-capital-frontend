import { successNotifier, errorNotifier } from "../../../components/notifier";
import axiosInstance,{AUTH_ROUTES} from "../../../service/api";



export const updatePassword = async (partnerId, payload, setLoading) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(
      AUTH_ROUTES.UPDATE_PASSWORD(partnerId),
      payload
    );
    successNotifier("Pssword Updated successfully");
    setLoading(false)
    return data;
  } catch (e) {
     setLoading(false);
    if (e.response) {
      errorNotifier(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};