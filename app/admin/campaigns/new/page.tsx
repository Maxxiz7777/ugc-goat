export default function NewCampaignPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900">
          Create New Campaign
        </h1>

        <p className="text-gray-500 mt-1 mb-8">
          Set up a new UGC campaign for creators.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Campaign Name
            </label>

            <input
              type="text"
              placeholder="Example: Summer Promotion"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              placeholder="Describe what creators need to do..."
              className="w-full border rounded-lg px-4 py-3 min-h-[120px]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Payment Per Creator
            </label>

            <input
              type="number"
              placeholder="100"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Number of Creators Needed
            </label>

            <input
              type="number"
              placeholder="10"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium">
            Create Campaign
          </button>

        </div>
      </div>
    </main>
  );
}