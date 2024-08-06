import React from "react";

const Login = ({ data, setData }) => {
  return (
    <div className="space-y-2">
      <h1>Login</h1>
      <div className="flex flex-col border">
        <input
          className="px-2"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: event.target.value })}
        />
      </div>
      <div className="flex flex-col border">
        <input
          className="px-2"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Login;
