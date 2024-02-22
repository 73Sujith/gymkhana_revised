import { useEffect } from "react";
import { useState } from "react";

export default function useScrollPosition(){
  const [scrollPosition, setScrollPosition] = useState(0);

    const updateScrollPosition = ()=>{
      setScrollPosition(window.scrollY);
    }
  useEffect(()=>{
    window.addEventListener('scroll', updateScrollPosition)
    return () => window.removeEventListener("scroll", updateScrollPosition);
  },[]);

  return scrollPosition;
}