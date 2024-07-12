import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const updateRequest = async (
  requestId,
  action,
  payload,
  setLoading,
  onClose
) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(
      AUTH_ROUTES.UPDATE_REQUEST(requestId),
      action,
      payload
    );
    successNotifier("Request Accepted successfully");
    setLoading && setLoading(false);
    onClose && onClose();
    console.log("r");
    return data;
  } catch (e) {
    setLoading && setLoading(false);
    console.log("catch");
    if (e.response) {
      errorNotifier(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
export const declineRequest = async (requestId, action, payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(
      AUTH_ROUTES.UPDATE_REQUEST(requestId),
      action,
      payload
    );
    successNotifier("Request Declined successfully");
    return data;
  } catch (e) {
    if (e.response) {
      errorNotifier(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};

export const getAcceptedRequest = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.ACCEPTED_REQUEST(skip));

    return data;
  } catch (e) {
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

export const getAllRequest = async (live, skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_ALL_REQUEST(live, skip));
   console.log(request, data); 
    return data;
  } catch (e) {
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
