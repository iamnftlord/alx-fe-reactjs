function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-sm mx-auto my-10 rounded-lg shadow-lg">
      <img
        className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto object-cover"
        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        alt="User"
      />

      <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl text-blue-800 my-4 text-center font-semibold">
        John Doe
      </h1>

      <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
