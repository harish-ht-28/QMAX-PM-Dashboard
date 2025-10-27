import Link from "next/link";
export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#17263c] text-white flex flex-col pt-8">
      <Link className="mb-8 ml-4 text-lg font-bold text-cyan-700 flex items-center" href="/dashboard">
        <img src="/qs-logo.png" className="mr-2 w-8 h-8" alt="QMAX" />
        <span style={{ color: "#111", fontWeight: 800, fontSize: "1.4rem" }}>QMAX</span>
      </Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/projects">My Projects</Link>
      <Link href="/log-time">Log Time</Link>
      <Link href="/timesheet">Timesheet</Link>
      <Link href="/admin-dashboard">Admin Dashboard</Link>
      <Link href="/manage-projects">Manage Projects</Link>
      <Link href="/manage-users">Manage Users</Link>
      <Link href="/reports">Reports</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/logout">Logout</Link>
    </aside>
  );
}
