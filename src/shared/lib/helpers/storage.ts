import { TSession } from "@/shared/lib/types";

export const setItem = <Value>(key: string, value: Value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <Value>(key: string): Value | null => {
  const item = sessionStorage.getItem(key);

  if (item === null) return null;

  try {
    return JSON.parse(item) as Value;
  } catch {
    return item as Value;
  }
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getSession = (): TSession | null => {
  const session = getItem<TSession>("session");

  if (!session) return null;

  return session;
};

export const setSession = (session: TSession | null) => {
  if (session) {
    setItem("session", session);
  } else {
    removeItem("session");
  }
};
