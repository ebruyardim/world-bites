"use client";
import Navbar from "@/components/NavBar";
import WorldMap from "@/components/WorldMap";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-white to-blue-50">
        <div className="w-full max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
              World Bites
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome {user?.email || "Guest"}! Explore culinary traditions from
              around the world. Select a country to discover its unique flavors!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-8">
            <WorldMap />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-pink-600">
                Discover Cuisines
              </h3>
              <p className="text-gray-600">
                Explore traditional dishes and culinary practices from every
                corner of the globe.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-teal-600">
                Save Favorites
              </h3>
              <p className="text-gray-600">
                Create a collection of your favorite international recipes and
                food destinations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-purple-600">
                Share Experiences
              </h3>
              <p className="text-gray-600">
                Connect with food enthusiasts and share your culinary
                adventures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
