import { useEffect, useState } from "react"

export const useDebouncer = (value, delay) => {
    const [ debouncedValue, setDebouncedValue ] = useState(value)

    useEffect(() => {
        let timer;
        timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(timer)
    },[value, delay])

    return debouncedValue
}


export function debounce(func, delay) {
    let timeoutId;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
  }