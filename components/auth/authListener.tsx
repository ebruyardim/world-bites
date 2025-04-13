"use client";

import { listenToAuthChanges } from "@/lib/firebase/authListener";
import { AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = listenToAuthChanges(dispatch, (user) => {
      router.push("/");
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  return null;
}
