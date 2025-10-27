"use client";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Power, User2, Users, FileText, BarChart2 } from "lucide-react";

// Sample UI button. Replace this import if using your own.
const Button = (props: any) => (
  <button type="button" {...props}>{props.children}</button>
);

// ---- Models & Data ----
export interface TimesheetRow {
  date: string;
  hours: number;
  description: string;
  status: "approved" | "pending" | "draft";
}
export interface Project {
  id: number;
  name: string;
  assignedTo: string[];
  status: "Active" | "Completed";
  hours: number;
  timesheet?: TimesheetRow[];
}
export const initialProjects: Project[] = [
  {
    id: 1,
    name: "Invoicing Portal",
    assignedTo: ["Alice"],
    status: "Active",
    hours: 24,
    timesheet: [
      { date: "2025-10-07", hours: 5, description: "Testing", status: "approved" },
      { date: "2025-10-10", hours: 3, description: "UI update", status: "pending" }
    ]
  },
  {
    id: 2,
    name: "Qmax Website",
    assignedTo: ["Bob"],
    status: "Completed",
    hours: 40
  }
];
export const usersList = [
  { id: 1, name: "Alice", isAdmin: false },
  { id: 2, name: "Bob", isAdmin: true }
];
export const sidebarNav = [
  { label: "Dashboard", route: "/dashboard", icon: <BarChart2 />, admin: false },
  { label: "Projects", route: "/projects", icon: <FileText />, admin: false },
  { label: "Timesheet", route: "/timesheet", icon: <FileText />, admin: false },
  { label: "Log Time", route: "/log-time", icon: <FileText />, admin: false },
  { label: "Manage Users", route: "/manage-users", icon: <Users />, admin: true },
  { label: "Reports", route: "/reports", icon: <BarChart2 />, admin: true },
  { label: "Settings", route: "/settings", icon: <User2 />, admin: false },
  { label: "Logout", route: "/logout", icon: <Power />, admin: false },
  { label: "Manage Projects", route: "/manage-projects", icon: <FileText />, admin: true },
  { label: "Admin Dashboard", route: "/admin-dashboard", icon: <BarChart2 />, admin: true }
];

// ---- Dashboard Home ----
const DashboardHome: React.FC<{ projects: Project[]; user: typeof usersList[number]; }> = ({ projects, user }) => {
  const userProjects = projects.filter(p => p.assignedTo.includes(user.name));
  const activeHours = userProjects.reduce((sum, project) => sum + (project.hours > 0 ? project.hours : 0), 0);
  const weekLabel = "06-Oct-2025 to 12-Oct-2025";
  const recentEntries = userProjects.flatMap(project =>
    (project.timesheet || []).map(entry => ({
      project: project.name,
      hours: entry.hours,
      status: entry.status,
      description: entry.description,
      date: entry.date,
    }))
  );
  return (
    <div>
      <h2 className="text-2xl font-bold text-cyan-700 mb-6">Employee Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
          <span className="font-semibold text-sm text-gray-700">Total Projects</span>
          <span className="font-bold text-2xl block">{userProjects.length}</span>
        </div>
        <div className="bg-cyan-50 rounded-lg p-4 shadow-sm">
          <span className="font-semibold text-sm text-gray-700">Active Hours</span>
          <span className="font-bold text-2xl block">{activeHours}</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 shadow-sm">
          <span className="font-semibold text-sm text-gray-700">Current Week</span>
          <span className="font-bold text-xl text-green-700 block">{weekLabel}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="font-bold mb-2">Recent Time Entries</h3>
          <table className="min-w-full table-fixed mb-2">
            <thead>
              <tr>
                <th className="p-2 text-left font-semibold">Project Name</th>
                <th className="p-2 text-center font-semibold">Hours</th>
                <th className="p-2 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEntries.length === 0 ? (
                <tr>
                  <td className="p-2 text-center" colSpan={3}>No entries.</td>
                </tr>
              ) : (
                recentEntries.map((entry, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{entry.project}</td>
                    <td className="p-2 text-center">{entry.hours}</td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-1 rounded font-semibold ${
                        entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                        entry.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-2 font-semibold">Total Hours</td>
                <td className="p-2 font-bold text-center">
                  {recentEntries.reduce((sum, e) => sum + (typeof e.hours === "number" ? e.hours : 0), 0)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center justify-center h-full">
          <span className="font-bold text-gray-400 mb-3">[Chart: Hours Distribution]</span>
        </div>
      </div>
    </div>
  );
};

// ---- Component Stubs ----
const MyProjects = (props: any) => <div>MyProjects Page</div>;
const Timesheet = (props: any) => <div>Timesheet Page</div>;
const LogTime = (props: any) => <div>Log Time Page</div>;
const ManageUsers = (props: any) => <div>ManageUsers Page</div>;
const Reports = (props: any) => <div>Reports Page</div>;
const Settings = (props: any) => <div>Settings Page</div>;
const Logout = (props: any) => <div>Logout Page</div>;
const ManageProjects = (props: any) => <div>ManageProjects Page</div>;
const AdminDashboard = (props: any) => <div>AdminDashboard Page</div>;

// ---- Main App ----
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(usersList[0]);
  const [projects, setProjects] = useState<Project[]>([...initialProjects]);

  const addUserProject = (name: string) => {
    setProjects(p =>
      [...p, { id: Math.floor(Math.random() * 100000), name, assignedTo: [currentUser.name], status: "Active", hours: 0 }]
    );
  };
  const removeUserProject = (id: number) => {
    setProjects(p => p.filter(pr => pr.id !== id || !pr.assignedTo.includes(currentUser.name)));
  };
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col relative">
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
            <Route path="/" element={<DashboardHome projects={projects} user={currentUser} />} />
            <Route path="/dashboard" element={<DashboardHome projects={projects} user={currentUser} />} />
            <Route path="/projects" element={<MyProjects projects={projects} user={currentUser} onAddProject={addUserProject} onRemoveProject={removeUserProject} />} />
            <Route path="/timesheet" element={<Timesheet user={currentUser} projects={projects} />} />
            <Route path="/log-time" element={<LogTime user={currentUser} projects={projects} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard projects={projects} />} />
            <Route path="/manage-projects" element={currentUser.isAdmin ? <ManageProjects projects={projects} setProjects={setProjects} /> : <div>Unauthorized</div>} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <footer className="centered-footer">
            Copyright © 2025 <span className="company">Qmax Systems India Pvt Ltd.</span> All rights reserved.
          </footer>
        </main>
      </div>
    </Router>
  );
};
export default App;
