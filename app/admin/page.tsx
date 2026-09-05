"use client";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              UGC GOAT Admin
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your creators, campaigns and payouts.
            </p>
          </div>

          <button
  onClick={() => window.location.href = "/admin/campaigns/new"}
  className="bg-gray-900 text-white px-5 py-3 rounded-lg font-medium"
>
  + Create Campaign
</button>
            
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Active Campaigns</p>
            <h2 className="text-3xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Creators</p>
            <h2 className="text-3xl font-bold mt-2">248</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Pending Submissions</p>
            <h2 className="text-3xl font-bold mt-2">36</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Payouts</p>
            <h2 className="text-3xl font-bold mt-2">$0</h2>
          </div>

        </div>

        {/* Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Campaign Management
            </h2>

            <p className="text-gray-500 mt-2">
              Create, edit and manage creator campaigns.
            </p>

            <button className="mt-6 border border-gray-300 px-4 py-2 rounded-lg">
              Manage Campaigns
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Creator Management
            </h2>

            <p className="text-gray-500 mt-2">
              View creators and manage their access.
            </p>

            <button className="mt-6 border border-gray-300 px-4 py-2 rounded-lg">
              Manage Creators
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Submissions
            </h2>

            <p className="text-gray-500 mt-2">
              Review and approve creator submissions.
            </p>

            <button className="mt-6 border border-gray-300 px-4 py-2 rounded-lg">
              Review Submissions
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Payouts
            </h2>

            <p className="text-gray-500 mt-2">
              Track and manage creator payments.
            </p>

            <button className="mt-6 border border-gray-300 px-4 py-2 rounded-lg">
              Manage Payouts
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}