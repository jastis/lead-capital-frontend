import { errorNotifier, successNotifier} from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createSupport = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.SUPPORT, payload);
    successNotifier("Support successfully created");
  } catch (e) {
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
export const updatePartner = async (partnerId, payload, setLoading,onClose, setImageLoading) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(AUTH_ROUTES.UPDATE_PROFILE(partnerId),payload,{
      headers:{
        "Content-Type":"multipart/form-data",
      }
    });
    successNotifier("Partner Updated successfully");
    setImageLoading&&setImageLoading(false)
    setLoading&&setLoading(false)
    onClose&&onClose()
    console.log(data,"console")
    return data;
  } catch (e) {
    setImageLoading&&setImageLoading(false);
    setLoading&&setLoading(false);
    console.log(e.response,"new")
    if (e.response) {
      errorNotifier(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};

