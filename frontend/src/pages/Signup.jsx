import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Helper functions
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("backend address: ", import.meta.env.VITE_BACKEND_URL);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signup",
        inputs
      );

      const { accountCreated } = response.data;

      if (accountCreated) {
        alert("Account created successfully");
        navigate("/signin");
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      <div className="h-screen h-min-content w-screen w-min-content flex flex-row items-center justify-center bg-gray-500 pointer-events-none">
        <div className="h-min-50 w-min-20 w-max-content px-4 py-8 bg-slate-50 rounded-lg border border-1 border-slate-400 flex flex-col justify-center shadow-xl pointer-events-auto">
          <div className="mb-5 flex justify-center">
            <h1 className="text-3xl font-bold font-sans">Sign Up</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col justify-center"
          >
            <div className="mb-4">
              <label htmlFor="name" className="font-semibold text-slate-700">
                Full Name
              </label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="John Doe"
                minLength={3}
                maxLength={32}
                className="w-[320px] py-1 px-2 mt-1 rounded-md border-2 border-slate-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="font-semibold text-slate-700">
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleChange}
                maxLength={64}
                placeholder="user@abc.com"
                className="w-[320px] py-1 px-2 mt-1 rounded-md border-2 border-slate-200"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-semibold text-slate-700"
              >
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
                minLength={8}
                placeholder="Password"
                className="w-[320px] py-1 px-2 mt-1 rounded-md border-2 border-slate-200"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-slate-700 mt-1"
              >
                Confirm Password
              </label>
              <br />

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={inputs.confirmPassword}
                onChange={handleChange}
                minLength={8}
                placeholder="Repeat Password"
                className="w-[320px] py-1 px-2 mt-1 rounded-md border-2 border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full h-10 p-2 bg-slate-800 text-slate-100 rounded-md"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 flex justify-center">
            <p>Already have an account?</p>
            <a href="/signin" className="ml-1 underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
