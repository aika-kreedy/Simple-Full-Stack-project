import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", { name, age, email })
      .then((res) => {
        console.log(res.data, "user is created");
        // Reset input fields
        setName("");
        setAge("");
        setEmail("");

        // Optional: Fetch updated users if needed
        Axios.get("http://localhost:3001/users").then((res) => {
          setUsers(res.data);
        });
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <br />
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <br />
      <button onClick={createUser}>Submit</button>

      <h2>Users</h2>
      {users.map((user, index) => (
        <div key={index}>
          <ul>
            <li>{user.name}</li>
            <li>{user.age}</li>
            <li>{user.email}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
