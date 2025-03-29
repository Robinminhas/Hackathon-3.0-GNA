import React, { useState } from 'react';
import InspectorLogin from './InspectorLogin'; 
import NewInspection from './NewInspection'; 

function Home() {
  const [view, setView] = useState('home'); // Manage views: 'home', 'inspectorLogin', 'newInspection'

  if (view === 'inspectorLogin') {
    return <InspectorLogin />; // Render InspectorLogin component
  }

  if (view === 'newInspection') {
    return <NewInspection />; // Render NewInspection component
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">InspectAI</h1>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={() => setView('newInspection')} // Update state to show NewInspection
          >
            +New Inspection
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            onClick={() => setView('inspectorLogin')} // Update state to show InspectorLogin
          >
            Inspector Login
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full flex justify-center mb-6">
        <ul className="flex space-x-4">
          <li className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Facility Inspections</li>
          <li className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Document Analysis</li>
          <li className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Real-time Monitoring</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Automated Facility Inspection */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Automated Facility Inspection</h2>
          <p className="text-gray-600 mb-4">
            Use AI image recognition to assess infrastructure and facilities.
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Upload Images</button>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Use Images
          </button>
        </section>

        {/* Recent Facility Inspections */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent Facility Inspections</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Main Campus Building A</span>
              <span className="text-sm text-green-600">completed</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Science Laboratory</span>
              <span className="text-sm text-green-600">completed</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Student Dormitory</span>
              <span className="text-sm text-red-600">Action Required</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
          </ul>
        </section>

        {/* AI Detection Capabilities */}
        <section className="bg-white p-6 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">AI Detection Capabilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Structural integrity issues</li>
            <li>Safety hazards and violations</li>
            <li>Accessibility conformance</li>
            <li>Maintenance requirements</li>
            <li>Space utilization analysis</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Start Facility Inspection
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;