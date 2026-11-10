import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  Search, Bell, Plus, TrendingUp, Award,
  ChartNoAxesColumnIncreasing
} from "lucide-react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    prn: "",
    name: "",
    branch: "Computer Science",
    semester: "5",
    subject1Internal: "",
    subject1External: "",
    subject2Internal: "",
    subject2External: "",
    subject3Internal: "",
    subject3External: "",
    subject4Internal: "",
    subject4External: "",
    subject5Internal: "",
    subject5External: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/students")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to fetch students");
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch(() => setError("Could not connect to the backend. Make sure Spring Boot is running."))
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const payload = {
      ...formData,
      semester: Number(formData.semester)
    };

    for (let i = 1; i <= 5; i++) {
      payload[`subject${i}Internal`] = Number(formData[`subject${i}Internal`]);
      payload[`subject${i}External`] = Number(formData[`subject${i}External`]);
    }

    try {
      const isEditing = editingId !== null;
      const response = await fetch(
        `http://localhost:8080/api/students${isEditing ? `/${editingId}` : ""}`,
        {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to save student. Check the PRN.");
      }

      const savedStudent = await response.json();
      if (isEditing) {
        setStudents((previous) => previous.map((student) =>
          student.id === editingId ? savedStudent : student
        ));
      } else {
        setStudents((previous) => [...previous, savedStudent]);
      }
      setEditingId(null);
      setFormOpen(false);
      setFormData({
        prn: "", name: "", branch: "Computer Science", semester: "5",
        subject1Internal: "", subject1External: "",
        subject2Internal: "", subject2External: "",
        subject3Internal: "", subject3External: "",
        subject4Internal: "", subject4External: "",
        subject5Internal: "", subject5External: ""
      });
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormError("");
    setFormData({
      prn: student.prn ?? "",
      name: student.name ?? "",
      branch: student.branch ?? "Computer Science",
      semester: String(student.semester ?? 5),
      subject1Internal: String(student.subject1Internal ?? ""),
      subject1External: String(student.subject1External ?? ""),
      subject2Internal: String(student.subject2Internal ?? ""),
      subject2External: String(student.subject2External ?? ""),
      subject3Internal: String(student.subject3Internal ?? ""),
      subject3External: String(student.subject3External ?? ""),
      subject4Internal: String(student.subject4Internal ?? ""),
      subject4External: String(student.subject4External ?? ""),
      subject5Internal: String(student.subject5Internal ?? ""),
      subject5External: String(student.subject5External ?? "")
    });
    setFormOpen(true);
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/students/${student.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Could not delete student.");
      setStudents((previous) => previous.filter((s) => s.id !== student.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const average = students.length
    ? (students.reduce((sum, s) => sum + (s.percentage || 0), 0) / students.length).toFixed(1)
    : "0.0";

  const highest = students.length
    ? Math.max(...students.map((s) => s.percentage || 0)).toFixed(1)
    : "0.0";

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.prn} ${student.branch}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={25} /></div>
          <div><h2>VIT Results</h2><span>MANAGEMENT PORTAL</span></div>
        </div>

        <p className="menu-label">MAIN MENU</p>
        <nav>
          <a className="nav-link active"><LayoutDashboard size={19} /> Dashboard</a>
          <a className="nav-link"><Users size={19} /> Students</a>
          <a className="nav-link"><BookOpen size={19} /> Results</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-avatar">MS</div>
          <div><strong>Misbah Shaikh</strong><span>Administrator</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">VIT STUDENT PORTAL</p><h1>Dashboard</h1></div>
          <div className="profile">
            <button className="notification"><Bell size={19} /></button>
            <div className="profile-info"><strong>Misbah Shaikh</strong><span>PRN: 12414009</span></div>
            <div className="profile-avatar">MS</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h2>Welcome back, Misbah!</h2>
            <p>Here's what's happening with your student records.</p>
          </div>
          <div className="welcome-icon"><GraduationCap size={48} /></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue"><Users size={21} /></div>
            <p>Total Students</p><h2>{students.length}</h2><span>Registered records</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><Award size={21} /></div>
            <p>Average Percentage</p><h2>{average}%</h2><span>Across all students</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon cyan"><TrendingUp size={21} /></div>
            <p>Highest Percentage</p><h2>{highest}%</h2><span>Top student performance</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><ChartNoAxesColumnIncreasing size={21} /></div>
            <p>Result Records</p><h2>{students.length}</h2><span>Available results</span>
          </div>
        </section>

        <section className="students-section">
          <div className="section-heading">
            <div><h2>Student Records</h2><p>Manage and view student academic performance.</p></div>
            <button className="add-button" onClick={() => { setFormError(""); setFormOpen(true); }}><Plus size={18} /> Add Student</button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search by name, PRN or branch..." value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </div>
            <span>{filteredStudents.length} records found</span>
          </div>

          {error && <p className="error-message">{error}</p>}
          {loading ? <p className="empty-message">Loading student records...</p>
            : filteredStudents.length === 0 ? <p className="empty-message">No student records found.</p>
            : <div className="table-wrapper">
                <table>
                  <thead><tr>
                    <th>STUDENT</th><th>PRN</th><th>BRANCH</th>
                    <th>SEMESTER</th><th>TOTAL MARKS</th><th>PERCENTAGE</th><th>ACTIONS</th>
                  </tr></thead>
                  <tbody>{filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td><strong>{student.name}</strong></td>
                      <td>{student.prn}</td><td>{student.branch}</td>
                      <td>{student.semester}</td><td>{student.totalMarks}/500</td>
                      <td><span className="percentage">{student.percentage}%</span></td>
                      <td className="action-buttons">
                        <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(student)}>Delete</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>}
        </section>
        {formOpen && (
          <div className="modal-overlay">
            <div className="student-modal">
              <div className="modal-heading">
                <div>
                  <h2>{editingId !== null ? "Edit Student" : "Add New Student"}</h2>
                  <p>Enter student details and academic marks.</p>
                </div>
                <button type="button" className="close-button" onClick={() => setFormOpen(false)}>×</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label>Student Name
                    <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Enter full name" required />
                  </label>
                  <label>PRN
                    <input name="prn" value={formData.prn} onChange={handleFormChange} placeholder="Enter unique PRN" required />
                  </label>
                  <label>Branch
                    <select name="branch" value={formData.branch} onChange={handleFormChange}>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Computer Engineering</option>
                      <option>Electronics and Telecommunication</option>
                      <option>Mechanical Engineering</option>
                      <option>Civil Engineering</option>
                    </select>
                  </label>
                  <label>Semester
                    <input type="number" name="semester" min="1" max="8" value={formData.semester} onChange={handleFormChange} required />
                  </label>
                </div>

                <h3 className="marks-heading">Subject Marks</h3>
                <p className="marks-hint">Enter internal marks (out of 20) and external marks (out of 80).</p>

                <div className="marks-grid">
                  {Array.from({ length: 5 }, (_, index) => index + 1).map((number) => (
                    <div className="subject-row" key={number}>
                      <strong>Subject {number}</strong>
                      <input aria-label={`Subject ${number} internal marks`} type="number" name={`subject${number}Internal`} min="0" max="20" placeholder="Internal /20" value={formData[`subject${number}Internal`]} onChange={handleFormChange} required />
                      <input aria-label={`Subject ${number} external marks`} type="number" name={`subject${number}External`} min="0" max="80" placeholder="External /80" value={formData[`subject${number}External`]} onChange={handleFormChange} required />
                    </div>
                  ))}
                </div>

                {formError && <p className="form-error">{formError}</p>}

                <div className="modal-actions">
                  <button type="button" className="cancel-button" onClick={() => setFormOpen(false)}>Cancel</button>
                  <button type="submit" className="add-button" disabled={saving}>
                    {saving ? "Saving..." : editingId !== null ? "Update Student" : "Save Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}      </main>
    </div>
  );
}

export default App;


