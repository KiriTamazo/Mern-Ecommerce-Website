// import { useEffect } from "react";

// const useClickOutSide = (ref, handler) => {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || !ref.current.contains(event.target)) {
//         return;
//       }
//       handler(event);
//     };
//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);
//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// };
// export default useClickOutSide;
import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const ref = useRef();

  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

export default useClickOutside;
