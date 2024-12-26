import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=1")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
        <p className="text-white text-lg font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row p-6 md:p-10 w-full max-w-4xl transition-transform transform hover:scale-105 duration-300">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 border-4 border-blue-500 rounded-full overflow-hidden shadow-md">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Details Section */}
        <div className="ml-0 md:ml-10 mt-6 md:mt-0 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-lg text-gray-600 font-medium mt-2">
            <span className="font-semibold text-gray-700">Gender:</span> {user.gender}
          </p>
          <p className="text-lg text-gray-600 font-medium mt-2">
            <span className="font-semibold text-gray-700">Phone:</span> {user.phone}
          </p>
          <p className="text-lg text-gray-600 font-medium mt-2">
            <span className="font-semibold text-gray-700">Email:</span> {user.email}
          </p>
          <p className="text-lg text-gray-600 font-medium mt-2">
            <span className="font-semibold text-gray-700">Location:</span> {user.location.city}, {user.location.country}
          </p>
        </div>
      </div>

      {/* Button to Change Profile */}
      <button
        onClick={fetchUser}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition-all duration-300"
      >
        Change Profile
      </button>
    </div>
  );
};

export default App;
