import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import getProfile from "../../actions/auth/getProfile";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import BackButton from "../../components/common/BackButton";
import dateFormatter from "../../utils/dateFormatter";
import CustomInput from "../../components/common/CustomInput";
import updatePass from "../../actions/auth/updatePass";
import updateEmail from "../../actions/auth/updateEmail";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdatePassDialog, setPassDialog] = useState(false);
  const [showUpdateEmailDialog, setEmailDialog] = useState(false);
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [emailData, setEmailData] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfileData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    updateEmail(emailData)
      .then((res) => {
        setEmailDialog(false);
        setProfileData({...res,email:emailData.newEmail})
      })
      .catch((err) => {
        return;
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    updatePass(passData)
      .then((res) => {
        setPassDialog(false);
      })
      .catch((err) => {
        return;
      });
  };

  return (
    <Layout>
      <div className="mx-4 mt-3">
        <BackButton onClick={() => navigate(-1)} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* profileData view */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-4 mt-2">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Admin Details
                </h3>
              </div>

              <div className="flex ">
                <CustomButton
                  onClick={() => setEmailDialog(true)}
                  className="bg-red-500 hover:bg-red-400"
                >
                  Update Email
                </CustomButton>

                <CustomButton
                  onClick={() => setPassDialog(true)}
                  className="bg-indigo-500 hover:bg-indigo-400"
                >
                  Update Password
                </CustomButton>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Id</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData._id}
                  </dd>
                </div>

                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData.email}
                  </dd>
                </div>

                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData.name}
                  </dd>
                </div>

                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData.gender}
                  </dd>
                </div>

                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dateFormatter(profileData.dob)}
                  </dd>
                </div>

                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData.status}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Password update Modal */}
          {showUpdatePassDialog && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <form
                  onSubmit={handleUpdatePassword}
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {/* Current password */}
                    <CustomInput
                      value={passData.currentPassword}
                      onChange={(e) =>
                        setPassData({
                          ...passData,
                          currentPassword: e.target.value,
                        })
                      }
                      boxClassName="my-2"
                      label="Current Password"
                      minLength={6}
                      required
                    />
                    {/* New password */}
                    <CustomInput
                      value={passData.newPassword}
                      onChange={(e) =>
                        setPassData({
                          ...passData,
                          newPassword: e.target.value,
                        })
                      }
                      minLength={6}
                      boxClassName="my-2"
                      label="New Password"
                      required
                    />
                  </div>

                  {/* dialog footer */}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setPassDialog(false)}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Email update Modal */}
          {showUpdateEmailDialog && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <form
                  onSubmit={handleUpdateEmail}
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {/* Current mail */}
                    <CustomInput
                      value={emailData.currentEmail}
                      onChange={(e) =>
                        setEmailData({
                          ...emailData,
                          currentEmail: e.target.value,
                        })
                      }
                      type="email"
                      boxClassName="my-2"
                      label="Current email"
                      required
                    />
                    {/* new mail */}
                    <CustomInput
                      type="email"
                      value={emailData.newEmail}
                      onChange={(e) =>
                        setEmailData({
                          ...emailData,
                          newEmail: e.target.value,
                        })
                      }
                      boxClassName="my-2"
                      label="New email"
                      required
                    />
                    {/* Current password */}
                    <CustomInput
                      value={emailData.currentPassword}
                      onChange={(e) =>
                        setEmailData({
                          ...emailData,
                          currentPassword: e.target.value,
                        })
                      }
                      minLength={6}
                      boxClassName="my-2"
                      label="Current Password"
                      required
                    />
                  </div>

                  {/* dialog footer */}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEmailDialog(false)}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Profile;
