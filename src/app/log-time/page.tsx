"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usersList, initialProjects } from "../../lib/data";

// add your LogTime UI here
export default function LogTimePage() {
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [project, setProject] = useState<string>("QSF-Web-development-01 - SP");
    const [hours, setHours] = useState<number>(1);
    const [description, setDescription] = useState<string>("");

    function handleSubmit() {
        // placeholder: in-app storage or API call could go here
        alert(`Logged ${hours}h for ${project} on ${date}: ${description}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-cyan-700">Log Time</h1>
                    <Link href="/dashboard" className="text-sm text-cyan-600 hover:underline">Back to Dashboard</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Date</span>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border px-2 py-1 rounded" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Project</span>
                        <select value={project} onChange={e => setProject(e.target.value)} className="border px-2 py-1 rounded">
                            <option>QSF-Web-development-01 - SP</option>
                            <option>Organisation Activities - CSB</option>
                            <option>Qmax-IOT-Platform - Harish</option>
                            <option>Secure-AP-SW-2025-TM - SP</option>
                        </select>
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Hours</span>
                        <input type="number" min={0} value={hours} onChange={e => setHours(Number(e.target.value))} className="border px-2 py-1 rounded" />
                    </label>
                </div>

                <label className="flex flex-col mb-3">
                    <span className="text-sm text-gray-600 mb-1">Description</span>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" rows={4} />
                </label>

                <div className="flex gap-3">
                    <button onClick={handleSubmit} className="bg-cyan-600 text-white px-4 py-2 rounded">Log Time</button>
                    <Link href="/dashboard" className="px-4 py-2 rounded border">Cancel</Link>
                </div>
            </div>
        </div>
    );
}
