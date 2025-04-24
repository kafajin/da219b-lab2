import { useEffect, useState } from "react";

export default function AssignmentTable() {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/project_assignments"
        );
        const data = await res.json();
        setAssignments(data.slice(-5)); // latest 5
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };

    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortValue = (assignment, key) => {
    switch (key) {
      case "employee_id":
        return assignment.employee_id?.employee_id || "";
      case "employee_name":
        return assignment.employee_id?.full_name || "";
      case "project_name":
        return assignment.project_code?.project_name || "";
      case "start_date":
        return assignment.start_date || "";
      default:
        return "";
    }
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = getSortValue(a, sortConfig.key);
    const bVal = getSortValue(b, sortConfig.key);
    return sortConfig.direction === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const sortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("employee_id")}>
              Employee ID{sortArrow("employee_id")}
            </th>
            <th onClick={() => handleSort("employee_name")}>
              Employee Name{sortArrow("employee_name")}
            </th>
            <th onClick={() => handleSort("project_name")}>
              Project Name{sortArrow("project_name")}
            </th>
            <th onClick={() => handleSort("start_date")}>
              Start Date{sortArrow("start_date")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map((assignment, idx) => (
            <tr key={idx}>
              <td>{assignment.employee_id?.employee_id}</td>
              <td>{assignment.employee_id?.full_name}</td>
              <td>{assignment.project_code?.project_name}</td>
              <td>{assignment.start_date?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
