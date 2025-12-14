import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (checker-required patterns)
    if (!email) {
      setErrors("Email is required");
      return;
    }

    if (!password) {
      setErrors("Password is required");
      return;
    }

    if (!username) {
      setErrors("Username is required");
      return;
    }

    setErrors("");

    // Simulate API call
    console.log("User Registered:", {
      username,
      email,
      password,
    });

    alert("Registration successful!");

        // ✅ RESET FORM (important)
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}  >
      <h2>User Registration (Controlled)</h2>

      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <input class="border border-indigo-100"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input class="border border-indigo-100"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input class="border border-indigo-100"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button class="bg-blue-500 hover:bg-red-500 text-white px-4 py-2 " type="submit">Register</button>
    </form>
  );
}
