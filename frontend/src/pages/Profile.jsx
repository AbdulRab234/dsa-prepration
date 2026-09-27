import React from "react";

function Profile() {
  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">

        <h2 className="text-xl font-bold mb-4">
          Profile Information
        </h2>

        <p className="mb-2">
          <strong>Name:</strong> Abdul
        </p>

        <p className="mb-2">
          <strong>Email:</strong> abdul@gmail.com
        </p>

        <p className="mb-2">
          <strong>College:</strong> Galgotias University
        </p>

        <p className="mb-2">
          <strong>Course:</strong> B.Tech CSE
        </p>

        <p>
          <strong>Skills:</strong> C++, JavaScript, React, MySQL
        </p>

      </div>

    </div>
  );
}

export default Profile;