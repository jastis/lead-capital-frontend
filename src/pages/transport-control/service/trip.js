import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";


export const getTrips = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(AUTH_ROUTES.TRIPS);
      return data;
    } catch (e) {
      if (e.response) {
        errorNotifier(
          console.log(
            e.response?.data?.message || e.response?.data?.data?.message
          )
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
      }
    }
  };
export const getTripsDetails = async (tripId) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(AUTH_ROUTES.GET_TRIPS((tripId)));
      return data;
    } catch (e) {
      if (e.response) {
        errorNotifier(
          console.log(
            e.response?.data?.message || e.response?.data?.data?.message
          )
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
      }
    }
  };