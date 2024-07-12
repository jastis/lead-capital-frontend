import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";


export const getCustomer = async (partnerId) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.CUSTOMER(partnerId));
    return data;
  } catch (e) {
    if (e.response) {
      errorNotifier(
        console.log(
          // e.response
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
}

export const deleteCustomer = async (customerId, partnerId) => {
  try {
    await axiosInstance.delete(AUTH_ROUTES.DELETE_CUSTOMER(customerId, partnerId));
    successNotifier("Staff Deleted Successfully");
  } catch (e) {
    if (e.response) {
      errorNotifier(
        console.log(
          // e.response
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
