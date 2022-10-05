import { useEffect, useState } from "react";

export default function useLocalStorage<T>(def: T, key: string) {
  const [data, setData] = useState(def);

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data === null) {
      return;
    }
    try {
      setData(JSON.parse(data));
    } catch (err) {
      return;
    }
  }, [key]);

  useEffect(() => {
    const event = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setData(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", event);
    return () => window.removeEventListener("storage", event);
  }, [key, data]);

  return [
    data,
    (val: T) => {
      const oldValue = JSON.stringify(data);
      const newValue = JSON.stringify(val);
      localStorage.setItem(key, newValue);
      setData(val);
      const event = new StorageEvent("storage", {
        key,
        newValue,
        oldValue,
      });

      window.dispatchEvent(event);
    },
  ] as const;
}
