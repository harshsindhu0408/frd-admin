import React from "react";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import authLogin from "../../actions/auth/authLogin";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  // handle login process on form submit
  async function handleLogin(e) {
    e.preventDefault();
    // set loading true
    setLoading(true);

    // login call to server
    await authLogin({
      email: e.target.email.value,
      password: e.target.password.value,
    }).finally(() => {
      // set loading false after getting response
      setLoading(false);
    });
  }
  return (
    // =============================================LOGIN-FORM============================================
    <div className="flex h-screen w-screen justify-center items-center">
      {/* form-card */}
      <div className="max-w-md relative flex flex-col px-4 py-6 rounded-md text-black shadow ">
        {/* form-heading */}
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-[#7747ff]">FRD Admin</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Log in to your admin account
        </div>
        {/* form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          {/* email input */}
          <div className="block relative">
            <CustomInput
              required={true}
              type="email"
              id="email"
              label="Email"
            />
          </div>
          {/* password input */}
          <div className="block relative">
            <CustomInput
              required={true}
              type="password"
              id="password"
              label="Password"
              minLength={6}
              maxLength={16}
            />
          </div>
          {/* submit button */}
          <CustomButton
            type="submit"
            className="bg-[#7747ff] min-w-40 m-auto mt-2 px-6 py-2 rounded text-white text-sm font-normal"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <LoaderIcon />
                Loading..
              </div>
            ) : (
              "Login"
            )}
          </CustomButton>
        </form>
      </div>
    </div>
    // =========================================================================================
  );
};

export default Login;
