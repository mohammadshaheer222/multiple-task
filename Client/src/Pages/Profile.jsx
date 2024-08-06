import React from "react";

const Profile = ({data, setData}) => {
  return (
    <div className="space-y-2">
      <h1>Profile</h1>
      <div className="flex flex-col border">
        <input
          className="px-2"
          type="text"
          placeholder="First Name"
          value={data.firstName}
          onChange={(event) =>
            setData({ ...data, firstName: event.target.value })
          }
        />
      </div>
      <div className="flex flex-col border">
        <input
          className="px-2"
          type="text"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(event) =>
            setData({ ...data, lastName: event.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Profile;
