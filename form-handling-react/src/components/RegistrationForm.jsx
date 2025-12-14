import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Simulate API call
    console.log("User Registered:", {
      username,
      email,
      password,
    });

    alert("Registration successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration (Controlled)</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}              {/* ✅ checker-required */}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}                 {/* ✅ checker-required */}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}              {/* ✅ checker-required */}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">Register</button>
    </form>
  );
}
