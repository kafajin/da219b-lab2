import React, { useEffect, useState } from "react";

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortBy, setSortBy] = useState("start_date");
  const [ascending, setAscending] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/project_assignments");
      const data = await res.json();

      const sorted = [...data].sort((a, b) => {
        const aVal =
          a[sortBy]?.full_name || a[sortBy]?.project_name || a[sortBy] || "";
        const bVal =
          b[sortBy]?.full_name || b[sortBy]?.project_name || b[sortBy] || "";
        return ascending
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });

      setAssignments(sorted.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, [sortBy, ascending]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setAscending(!ascending);
    } else {
      setSortBy(field);
      setAscending(true);
    }
  };

  return (
    <div>
      <h2>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("employee_id")}>Employee ID</th>
            <th onClick={() => handleSort("employee_name")}>Employee Name</th>
            <th onClick={() => handleSort("project_name")}>Project Name</th>
            <th onClick={() => handleSort("start_date")}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, idx) => (
            <tr key={idx}>
              <td>{a.employee_id?.employee_id}</td>
              <td>{a.employee_id?.full_name}</td>
              <td>{a.project_code?.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
