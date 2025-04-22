import { useState } from "preact/hooks";
import AssignmentTable from "./components/AssignmentTable";
import "./app.css"; // Optional if you want styling

export function App() {
  return (
    <div className="App">
      <h1>Project Assignment Dashboard</h1>
      <AssignmentTable />
    </div>
  );
}
