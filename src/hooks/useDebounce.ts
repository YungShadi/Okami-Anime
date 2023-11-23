import { useState, useEffect } from "react";

// Наш хук
export default function useDebounce(value, delay) {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update with the correct value
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Add delay as a dependency to handle changes in delay

  return debouncedValue;
}
