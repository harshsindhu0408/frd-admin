import React, { useState } from "react";
import CustomDialog from "../common/Dialog/CustomDialog";
import CustomButton from "../common/CustomButton";
import EmailSenderBox from "./EmailSenderBox";

const EmailDialog = ({ to = "", ordersData }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* button */}
      <CustomButton onClick={() => setIsOpen(true)}>
        Contact Customer
      </CustomButton>

      {/* Dialog */}
      {isOpen && (
        <CustomDialog closeDailog={() => setIsOpen(false)} title="Send Email">
          <EmailSenderBox closeDialog={() => setIsOpen(false)} to={to} ordersData={ordersData} />
        </CustomDialog>
      )}
    </div>
  );
};

export default EmailDialog;
