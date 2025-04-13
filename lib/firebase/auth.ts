import { clearUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export async function signUp(
  email: string,
  password: string,
  nickname: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: nickname,
    });
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata:", error);
    throw error;
  }
}

export function signIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
export function onAuthStateChanged(cb: (user: any) => void) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: (user: any) => void) {
  return _onIdTokenChanged(auth, cb);
}

export async function signOut(dispatch: AppDispatch) {
  try {
    await auth.signOut();
    dispatch(clearUser());
  } catch (error) {
    console.error("Logout error", error);
  }
}
