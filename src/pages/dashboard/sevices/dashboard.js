import { errorNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getDashboard = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.DASHBOARD);
    return data;
  } catch (e) {
    if (e.response) {
      errorNotifier(
        console.log(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    }
  }
};

export const getCards = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_CARDS);
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
export const getIncomeChart = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_INCOME_CHART);
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
export const getTripsChart = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_TRIPS_CHART);
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
