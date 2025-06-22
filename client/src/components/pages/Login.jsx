import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 m-8">
      <form className="border-4 border-pink-600 rounded-xl w-full max-w-md p-8 m-8">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          {" "}
          Login:{" "}
        </h3>

        <div>
          <label className="block mb-1 text-gray-700"> First Name: </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="firstname"
            placeholder="Enter first name here"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700"> Last Name: </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="lastname"
            placeholder="Enter last name here"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700"> Email: </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            name="email"
            placeholder="Enter email here"
          />
        </div>

        <button className="block mb-1 bg-red-200" type="submit">
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
};

export default Login;
