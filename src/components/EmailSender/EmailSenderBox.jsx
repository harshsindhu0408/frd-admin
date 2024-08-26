import React from "react";
import CustomInput from "../common/CustomInput";
import makeRequest from "../../utils/request";
import { ADMIN_APIS } from "../../actions/apis";
import toast from "react-hot-toast";
import { errorNotify, successNotify } from "../common/CustomToast";
import CustomButton from "../common/CustomButton";

const EmailSenderBox = ({
  to = "",
  closeDialog = function () {},
  ordersData,
}) => {
  const [emailBody, setEmail] = React.useState({
    customerEmail: to,
    emailContent: "",
    emailSubject: "Your order is on it's way",
    trackingLink: "",
  });

  console.log(ordersData);

  async function handleSendEmail() {
    toast.loading("Sending mail...");
    try {
      const payload = {
        ...emailBody,
        customerName: ordersData.customer.customerName,
        orderNumber: ordersData.generatedId,
        trackingLink: emailBody.trackingLink, // Include tracking link in payload
        deliveryAddress: ordersData.customer.address,
      };
  

      const res = await makeRequest("POST", ADMIN_APIS.sendMail, payload);
      toast.dismiss();
      successNotify("Mail sent successfully");
      closeDialog();
      return res.updatedOrder;
    } catch (error) {
      toast.dismiss();
      if (error.response) {
        errorNotify("Unable to send mail");
      }
    }
  }
  
  return (
    <div className="w-[600px] flex flex-col gap-1">
      {/* Recipient's email address */}
      <CustomInput
        value={emailBody.customerEmail}
        onChange={(e) =>
          setEmail({ ...emailBody, customerEmail: e.target.value })
        }
        placeholder="Recipient's email address"
      />

      {/* Subject box */}
      <CustomInput
        value={emailBody.emailSubject}
        onChange={(e) =>
          setEmail({ ...emailBody, emailSubject: e.target.value })
        }
        placeholder="Subject"
      />

      {/* Tracking link field */}
      <CustomInput
        value={emailBody.trackingLink}
        onChange={(e) =>
          setEmail({ ...emailBody, trackingLink: e.target.value })
        }
        placeholder="Tracking link"
      />

      {/* Message box */}
      <div className="relative w-full m-1">
        <textarea
          value={emailBody.emailContent}
          onChange={(e) =>
            setEmail({ ...emailBody, emailContent: e.target.value })
          }
          placeholder="Enter message"
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          cols="30"
          rows="10"
        />
      </div>

      {/* Send mail button */}
      <div className="flex items-center justify-center ">
        <CustomButton className="w-full" onClick={handleSendEmail}>
          Send mail
        </CustomButton>
      </div>
    </div>
  );
};

export default EmailSenderBox;
