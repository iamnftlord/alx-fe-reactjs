// src/App.jsx
import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="center-page">
       <h1 className="center-page">Github User Search</h1>
       <p className="center-page">Search Github User By their Name</p>
       <Search />
    </div>
  );
}

export default App;