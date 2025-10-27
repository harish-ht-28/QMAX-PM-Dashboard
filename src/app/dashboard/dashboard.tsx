"use client";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BarChart2, FileText, Power, User2, Users } from "lucide-react";

// ---- Sample UI Button ----
const Button = (props: any) => (
  <button
    type="button"
    className={`px-3 py-1 rounded font-semibold ${
      props.variant === "default"
        ? "bg-cyan-700 text-white"
        : "bg-gray-100 text-cyan-700 border border-cyan-500"
    }`}
    {...props}
  >
    {props.children}
  </button>
);

// ---- Data Models ----
interface TimesheetRow {
  date: string;
  hours: number;
  description: string;
  status: "completed" | "in-progress";
}
interface Project {
  id: number;
  name: string;
  assignedTo: string[];
  status: "Active" | "Completed";
  hoursLogged: number;
  totalHours: number;
  timesheet: TimesheetRow[];
}
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
  projects: number[];
}

// ---- Initial Data ----
const initialProjects: Project[] = [
  { id: 1, name: "IoT Sensor Module", assignedTo: ["Harish"], status: "Active", hoursLogged: 120, totalHours: 160,
    timesheet: [{ date: "2024-01-15", hours: 6.5, description: "Module Complete", status: "completed" }] },
  { id: 2, name: "Embedded Dashboard", assignedTo: ["Harish"], status: "Active", hoursLogged: 90, totalHours: 200,
    timesheet: [{ date: "2024-01-15", hours: 4, description: "Work in progress", status: "in-progress" }] },
  { id: 3, name: "Firmware Update", assignedTo: ["Harish"], status: "Active", hoursLogged: 180, totalHours: 200,
    timesheet: [{ date: "2024-01-14", hours: 3.5, description: "Firmware completion", status: "completed" }] },
  { id: 4, name: "Hardware Testing", assignedTo: ["Harish"], status: "Active", hoursLogged: 8, totalHours: 20,
    timesheet: [{ date: "2024-01-14", hours: 8, description: "Testing", status: "completed" }] }
];
const usersList: User[] = [
  { id: 1, name: "Harish", isAdmin: false, projects: [1,2,3,4] },
  { id: 2, name: "Admin", isAdmin: true, projects: [1,2,3,4] }
];

// ---- Sidebar Navigation ----
const sidebarNav = [
  { label: "Dashboard", route: "/dashboard", icon: <BarChart2 />, admin: false },
  { label: "Projects", route: "/projects", icon: <FileText />, admin: false },
  { label: "Timesheet", route: "/timesheet", icon: <FileText />, admin: false },
  { label: "Log Time", route: "/log-time", icon: <FileText />, admin: false },
  { label: "Manage Users", route: "/manage-users", icon: <Users />, admin: true },
  { label: "Reports", route: "/reports", icon: <BarChart2 />, admin: true },
  { label: "Settings", route: "/settings", icon: <User2 />, admin: false },
  { label: "Logout", route: "/logout", icon: <Power />, admin: false },
];

// ---- Employee Dashboard ----
const EmployeeDashboard: React.FC<{ user: User; projects: Project[]; setProjects: Function }> = ({ user, projects, setProjects }) => {
  const userProjects = projects.filter(p => user.projects.includes(p.id));
  const todayHours = userProjects.reduce((sum, p) => sum + (p.timesheet.find(t => t.date === "2024-01-15")?.hours || 0), 0);
  const weekHours = userProjects.reduce((sum, p) => sum + p.hoursLogged, 0);

  // Add project logic
  const [newProjectName, setNewProjectName] = useState("");
  const addProject = () => {
    if (newProjectName.trim().length === 0) return;
    const newId = Math.floor(Math.random() * 100000);
    setProjects((prev: Project[]) => [
      ...prev,
      { id: newId, name: newProjectName, assignedTo: [user.name], status: "Active", hoursLogged: 0, totalHours: 100, timesheet: [] }
    ]);
    user.projects.push(newId);
    setNewProjectName(""); // reset input
  };

  // Remove project logic
  const removeProject = (projectId: number) => {
    user.projects = user.projects.filter(id => id !== projectId);
    setProjects((prev: Project[]) => prev.filter(p => p.id !== projectId));
  };

  // Log hours logic
  const [logProjectId, setLogProjectId] = useState<number|null>(null);
  const [logHours, setLogHours] = useState("");
  const [logDesc, setLogDesc] = useState("");
  const logTime = () => {
    if (!logProjectId || Number.isNaN(Number(logHours)) || logHours.trim().length === 0) return;
    setProjects((prev: Project[]) => prev.map(p => p.id === logProjectId
      ? { ...p,
          hoursLogged: p.hoursLogged + parseFloat(logHours),
          timesheet: [
             ...p.timesheet,
             {
               date: `${new Date().toISOString().split("T")[0]}`,
               hours: parseFloat(logHours),
               description: logDesc,
               status: "completed"
             }
          ]
        }
      : p
    ));
    setLogProjectId(null); setLogHours(""); setLogDesc("");
  };

  return (
    <div>
      <h2 className="dashboard-title">Employee Dashboard</h2>
      <div className="grid grid-cols-4 gap-5 mb-6">
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Hours Today</span>
          <span className="metric-value">{todayHours}</span>
          <span className="metric-subtext">+2.5h from yesterday</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Hours This Week</span>
          <span className="metric-value">{weekHours}</span>
          <span className="metric-subtext">82% of target (40h)</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Active Projects</span>
          <span className="metric-value">{userProjects.length}</span>
          <span className="metric-subtext">2 due this week</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Productivity</span>
          <span className="metric-value">94%</span>
          <span className="metric-subtext">+5% from last week</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="section-header">Recent Time Entries</h3>
          <p className="section-subtext">Your latest logged hours</p>
          {userProjects.map(project =>
            project.timesheet.slice(-3).map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-500">{entry.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`status-badge ${entry.status}`}>{entry.status}</span>
                  <span className="text-right text-lg font-bold">{entry.hours}h</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="section-header">Project Progress</h3>
          <p className="section-subtext">Your active project status</p>
          {userProjects.map(project => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{project.name}</span>
                <span className="text-sm text-gray-500">{project.hoursLogged}/{project.totalHours}h</span>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.round((project.hoursLogged / project.totalHours) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{Math.round((project.hoursLogged / project.totalHours) * 100)}% complete</span>
            </div>
          ))}
        </div>
      </div>
      {/* Project Add/Remove UI */}
      <div className="flex flex-row gap-5 mt-6">
        <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="Add Project Name" className="px-3 py-1 border rounded"/>
        <Button onClick={addProject}>Add Project</Button>
      </div>
      <div className="mt-4">
        <h4 className="mt-6 mb-2 font-semibold">Remove Project</h4>
        {userProjects.map(project => (
          <div key={project.id} className="flex items-center gap-2 mb-1">
            <span>{project.name}</span>
            <Button onClick={() => removeProject(project.id)}>Remove</Button>
          </div>
        ))}
      </div>
      {/* Log Time UI */}
      <div className="mt-4">
        <h4 className="mt-6 mb-2 font-semibold">Log Time</h4>
        <select value={logProjectId||""} onChange={e => setLogProjectId(Number(e.target.value))} className="px-2 py-1 border rounded">
          <option value="">Select Project</option>
          {userProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <input
          value={logHours}
          onChange={e => setLogHours(e.target.value)}
          placeholder="Hours"
          className="w-24 mx-2 px-2 py-1 border rounded"
          type="number"
        />
        <input
          value={logDesc}
          onChange={e => setLogDesc(e.target.value)}
          placeholder="Description"
          className="mx-2 px-2 py-1 border rounded"
        />
        <Button onClick={logTime}>Log Time</Button>
      </div>
    </div>
  );
};

// ---- Admin Dashboard ----
const AdminDashboard: React.FC<{ projects: Project[], users: User[] }> = ({ projects, users }) => {
  const totalEmployees = users.filter(u => !u.isAdmin).length;
  const activeProjects = projects.filter(p => p.status === "Active").length;
  const totalHoursWeek = projects.reduce((sum, p) => sum + p.hoursLogged, 0);
  const avgHours = totalEmployees === 0 ? "0" : (totalHoursWeek / totalEmployees).toFixed(1);

  // Employee total hour table
  const employeeHours: { name: string; hours: number }[] = users
    .filter(u => !u.isAdmin)
    .map(u => ({
      name: u.name,
      hours: projects.filter(p => p.assignedTo.includes(u.name)).reduce((sum, proj) => sum + proj.hoursLogged, 0)
    }));

  return (
    <div>
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="grid grid-cols-4 gap-5 mb-6">
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Total Employees</span>
          <span className="metric-value">{totalEmployees}</span>
          <span className="metric-subtext">+2 from last month</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Active Projects</span>
          <span className="metric-value">{activeProjects}</span>
          <span className="metric-subtext">3 due this week</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Total Hours (Week)</span>
          <span className="metric-value">{totalHoursWeek}h</span>
          <span className="metric-subtext">+12% from last week</span>
        </div>
        <div className="metric-card card-shadow radius-lg">
          <span className="metric-title">Avg Hours/Employee</span>
          <span className="metric-value">{avgHours}h</span>
          <span className="metric-subtext">+5% from last week</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="section-header">Weekly Hours Trend</h3>
          <p className="section-subtext">Total hours logged by all employees</p>
          {/* Chart placeholder */}
          <div className="mt-4">
            <div style={{ height: 120, width: '100%', background: "#fff" }}>
              <div className="text-center text-gray-400">[Bar Chart: Weekly Hours]</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="section-header">Project Hours Distribution</h3>
          <p className="section-subtext">Hours allocated across projects</p>
          <div className="mt-4">
            <div style={{ height: 120, width: '100%', background: "#fff" }}>
              <div className="text-center text-gray-400">[Pie Chart: Project Hours]</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-5 mt-8">
        <h3 className="section-header">Employee Monthly Hours</h3>
        <table className="simple-table mb-2">
          <thead>
            <tr>
              <th className="text-left font-semibold">Employee</th>
              <th className="text-center font-semibold">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {employeeHours.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td className="text-center">{row.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---- Main App ----
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(usersList[0]);
  const [projects, setProjects] = useState<Project[]>([...initialProjects]);

  return (
    <Router>
      <div className="min-h-screen dashboard-main flex flex-col relative">
        <header className="py-6 px-8 bg-white shadow flex items-center justify-between sticky top-0 z-30">
          <div className="text-2xl font-bold text-cyan-700">QMAX Dashboard</div>
          <div className="flex items-center gap-4">
            {usersList.map(u => (
              <Button key={u.id} variant={currentUser.name === u.name ? "default" : "outline"} onClick={() => setCurrentUser(u)}>
                {u.isAdmin ? "Admin" : u.name}
              </Button>
            ))}
          </div>
        </header>
        <aside className="fixed top-0 left-0 w-64 h-screen bg-[#17263c] text-white shadow-xl flex flex-col pt-8 z-40">
          <Link className="flex items-center mb-8 ml-4 text-lg font-bold text-cyan-700" to="/dashboard">
            <img src="/qs-logo.png" className="mr-2 w-8 h-8" alt="QMAX" />
            <span style={{ color: '#111', fontWeight: 800, fontSize: '1.4rem' }}>QMAX</span>
          </Link>
          <div className="flex flex-col gap-1 w-full">
            <div className="px-5 text-xs text-gray-400 mb-1">Employee Portal</div>
            {sidebarNav.filter(e => !e.admin).map(item => (
              <Link
                key={item.label}
                to={item.route}
                className="flex items-center px-5 py-2 gap-3 hover:bg-cyan-100 rounded transition font-medium"
                style={{ color: "#fff" }}
              >
                <span style={{ color: "#fff", display: "flex", alignItems: "center" }}>{item.icon}</span>
                <span style={{ color: "#fff" }}>{item.label}</span>
              </Link>
            ))}
            <div className="px-5 text-xs text-gray-400 mt-5 mb-1">Admin Portal</div>
            {currentUser.isAdmin && sidebarNav.filter(e => e.admin).map(item => (
              <Link
                key={item.label}
                to={item.route}
                className="flex items-center px-5 py-2 gap-3 hover:bg-orange-100 rounded transition font-medium text-orange-800"
              >{item.icon}<span>{item.label}</span></Link>
            ))}
          </div>
        </aside>
        <main className="ml-64 p-9 min-h-screen">
          <Routes>
            <Route path="/" element={
              currentUser.isAdmin
                ? <AdminDashboard projects={projects} users={usersList} />
                : <EmployeeDashboard user={currentUser} projects={projects} setProjects={setProjects} />
            } />
            {/* Other pages/routes as needed */}
          </Routes>
          <footer className="centered-footer mt-12 text-center font-medium text-gray-500 border-t pt-4">
            Copyright © 2025 <span className="font-semibold text-cyan-700">Qmax Systems India Pvt Ltd.</span> All rights reserved.
          </footer>
        </main>
      </div>
    </Router>
  );
};
export default App;
