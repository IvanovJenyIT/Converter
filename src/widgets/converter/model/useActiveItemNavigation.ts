import { useEffect, useRef, useState } from "react";

export function useActiveItemNavigation<T>(items: T[]) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = itemRefs.current[active];
    if (el) {
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
  };

  return { active, setActive, itemRefs, onKeyDown };
}
