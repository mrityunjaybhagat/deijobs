import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { throttle } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useLocalStorage("auth", {
    isLoggedIn: false,
    details: {},
  });
  return [loggedIn, setLoggedIn];
}

export function useInfiniteScroll(
  ref: any,
  callback: any,
  isFetching: any,
  enabled = true
) {
  // const scrollState = useScroll(ref);
  useEffect(() => {
    let localIsFetching = false;
    async function temp() {
      if (ref.current)
        if (
          !isFetching &&
          !localIsFetching &&
          ref.current.scrollHeight - ref.current.scrollTop <=
            ref.current.clientHeight + 100
        ) {
          localIsFetching = true;
          await (enabled && callback && callback());
          localIsFetching = false;
        }
    }
    const scroller = throttle(temp, 150);
    ref.current && ref.current.addEventListener("scroll", scroller);
    return () => {
      return ref.current && ref.current.removeEventListener("scroll", scroller);
    };
  }, [ref.current, callback, enabled, isFetching]);
}
