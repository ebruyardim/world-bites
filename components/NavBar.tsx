"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase/auth";
import { RootState } from "@/store";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(dispatch);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Globe className="h-8 w-8 text-pink-500" />

              <span className="ml-2 text-xl font-bold text-gray-800">
                WorldBites
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium"
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {!user?.email ? (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
                  Login
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant={"link"} onClick={handleLogout}>
                  Logout
                </Button>
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-pink-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4">
              <Link href="/auth" className="w-full">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
