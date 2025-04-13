"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Full height image */}
      <div className="hidden md:block md:w-2/3 relative">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="World cuisine"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
          <div className="text-white p-8 max-w-md">
            <h1 className="text-4xl font-bold mb-4">Discover World Cuisine</h1>
            <p className="text-lg">
              Explore flavors from around the world with WorldBites and create
              your own culinary adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-white to-blue-50">
        <div className="w-full max-w-sm">
          <Card className="border-2 border-pink-100 shadow-2xl rounded-xl overflow-hidden">
            {isLogin ? (
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl font-bold text-center text-gray-800">
                    Login
                  </CardTitle>
                  <CardDescription className="text-center text-sm">
                    Sign in to explore culinary traditions from around the world
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-6">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="h-9 text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-pink-500 hover:text-pink-700"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="h-9 text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 h-9 text-sm mt-2"
                    onClick={() => {
                      signIn(email, password);
                    }}
                  >
                    Login
                  </Button>

                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border h-9 text-xs hover:bg-gray-50"
                    >
                      <svg
                        className="mr-2 h-3 w-3"
                        fill="#4285F4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.545 10.239v3.821h5.445c-0.643 2.508-2.608 4.398-5.445 4.398-3.332 0-6.033-2.701-6.033-6.033s2.701-6.033 6.033-6.033c1.32 0 2.576 0.43 3.616 1.178l2.257-2.257c-1.67-1.424-3.83-2.288-6.168-2.288-5.261 0-9.529 4.268-9.529 9.529s4.268 9.529 9.529 9.529c5.261 0 9.529-4.268 9.529-9.529 0-0.769-0.107-1.519-0.304-2.232h-9.234z" />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border h-9 text-xs hover:bg-gray-50"
                    >
                      <svg
                        className="mr-2 h-3 w-3"
                        fill="#1877F2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988c4.781-.749 8.437-4.886 8.437-9.879 0-5.522-4.477-9.999-9.999-9.999z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pb-6 pt-2 px-6">
                  <div className="text-center text-xs">
                    Don&apos;t have an account yet?{" "}
                    <button
                      onClick={toggleAuthMode}
                      className="text-pink-500 hover:text-pink-700 font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                </CardFooter>
              </>
            ) : (
              // sign up form
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl font-bold text-center text-gray-800">
                    Sign Up
                  </CardTitle>
                  <CardDescription className="text-center text-sm">
                    Sign up to start your culinary journey around the world
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-6">
                  <div className="space-y-1">
                    <Label htmlFor="nickname" className="text-xs">
                      Nickname
                    </Label>
                    <Input
                      id="nickname"
                      type="text"
                      className="h-9 text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNickname(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="h-9 text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      className="h-9 text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="h-9 text-sm"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 h-9 text-sm mt-2"
                    onClick={() => {
                      signUp(email, password, nickname);
                    }}
                  >
                    Create Account
                  </Button>

                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border h-9 text-xs hover:bg-gray-50"
                    >
                      <svg
                        className="mr-2 h-3 w-3"
                        fill="#4285F4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.545 10.239v3.821h5.445c-0.643 2.508-2.608 4.398-5.445 4.398-3.332 0-6.033-2.701-6.033-6.033s2.701-6.033 6.033-6.033c1.32 0 2.576 0.43 3.616 1.178l2.257-2.257c-1.67-1.424-3.83-2.288-6.168-2.288-5.261 0-9.529 4.268-9.529 9.529s4.268 9.529 9.529 9.529c5.261 0 9.529-4.268 9.529-9.529 0-0.769-0.107-1.519-0.304-2.232h-9.234z" />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border h-9 text-xs hover:bg-gray-50"
                    >
                      <svg
                        className="mr-2 h-3 w-3"
                        fill="#1877F2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988c4.781-.749 8.437-4.886 8.437-9.879 0-5.522-4.477-9.999-9.999-9.999z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pb-6 pt-2 px-6">
                  <div className="text-center text-xs">
                    Already have an account?{" "}
                    <button
                      onClick={toggleAuthMode}
                      className="text-pink-500 hover:text-pink-700 font-medium"
                    >
                      Login
                    </button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
