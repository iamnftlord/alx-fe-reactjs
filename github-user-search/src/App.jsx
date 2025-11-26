// src/App.jsx
import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="center-page ">
       <h1>Github User Search</h1>
       <p>Search Github User By their Name</p>
       <Search />
    </div>
  );
}

export default App;