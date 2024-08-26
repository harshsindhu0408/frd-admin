import toast from "react-hot-toast";

export const errorNotify = (msg = "Example toast message!") =>
  toast.error(msg, {
    position: "top-right",
  });

export const successNotify = (msg = "Example toast message!") =>
  toast.success(msg, {
    position: "top-right",
  });
