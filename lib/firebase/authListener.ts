import { clearUser, setUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { onIdTokenChanged } from "./auth";

export const listenToAuthChanges = (
  dispatch: AppDispatch,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (user: any) => void
) => {
  return onIdTokenChanged((user) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ?? null,
        })
      );
      callback(user);
    } else {
      dispatch(clearUser());
      callback(null);
    }
  });
};
