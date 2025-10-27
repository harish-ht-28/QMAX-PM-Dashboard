"use client";
import React from "react";
import Link from "next/link";

// add your stats, admin dashboards etc.
export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-orange-600">Admin Dashboard</h1>
                    <Link href="/dashboard" className="text-sm text-cyan-600 hover:underline">Back to Dashboard</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded bg-white border">
                        <div className="text-sm text-gray-500">Total Projects</div>
                        <div className="text-2xl font-bold mt-2">—</div>
                    </div>
                    <div className="p-4 rounded bg-white border">
                        <div className="text-sm text-gray-500">Active Users</div>
                        <div className="text-2xl font-bold mt-2">—</div>
                    </div>
                    <div className="p-4 rounded bg-white border">
                        <div className="text-sm text-gray-500">Pending Approvals</div>
                        <div className="text-2xl font-bold mt-2">—</div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-gray-600">This is a placeholder admin dashboard page. If you want the full admin UI copied from the SPA, I can add it here (or convert the SPA routes to Next App Router pages).</p>
                </div>
            </div>
        </div>
    );
}
