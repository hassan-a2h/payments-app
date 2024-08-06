function Signup() {
  return (
    <>
      <div className="h-screen h-min-content w-screen w-min-content flex flex-row items-center justify-center bg-gray-500 pointer-events-none">
        <div className="h-min-50 w-min-20 w-max-content px-4 py-8 bg-slate-50 rounded-lg border border-1 border-slate-400 flex flex-col justify-center shadow-xl pointer-events-auto">
          <div className="mb-5 flex justify-center">
            <h1 className="text-3xl font-bold font-sans">Sign Up</h1>
          </div>

          <form action="" className="flex flex-col justify-center">
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold text-slate-700">
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
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
