import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createTruck = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.TRUCK, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successNotifier("Truck successfully created");
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

export const getTrucks = async (partnerId, skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_TRUCKS(partnerId, skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
    // if (e.response) {
    //   errorNotifier(
    //     console.log(
    //       // e.response
    //       e.response?.data?.message || e.response?.data?.data?.message
    //     )
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
};
