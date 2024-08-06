import React, { useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import Gallery from "./Gallery";
import axios from "axios"

const Form = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const titles = ["Login", "Profile", "Gallery"]

  const pageDisplay = () => {
    if (page === 0) {
      return <Login data={data} setData={setData} />;
    } else if (page === 1) {
      return <Profile data={data} setData={setData} />;
    } else {
      return <Gallery data={data} setData={setData} />;
    }
  };

  const Register = async (event) => {
    const {email, password, firstName, lastName} = data
    event.preventDefault();
    await axios
      .post("http://localhost:2000/register", {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => console.l0g(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-6">
        {titles[page]}
      {pageDisplay()}
      <div className="space-x-2 py-4">
        <button
          className="bg-red-500 text-white px-4 "
          onClick={(event) => {
            setPage((prev) => prev - 1);
          }}
        >
          Prev
        </button>
        <button
          className="bg-red-500 text-white px-4 "
          onClick={(event) => {
            if (page === titles.length - 1) {
              return Register(event);
            }
            setPage((prev) => prev + 1);
          }}
        >
            {console.log(titles.length)}
          {`${page === titles.length - 1 ? "Submit" : "Next"}`}
        </button>
      </div>
    </div>
  );
};

export default Form;
