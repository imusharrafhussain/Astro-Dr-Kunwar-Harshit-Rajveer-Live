import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

type TabProps = {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick: () => void;
  isCompact: boolean;
  isActive: boolean;
};

type CursorProps = {
  position: CursorPosition;
};

type SlideTabsProps = {
  tabs: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
};

export const SlideTabs = ({
  tabs,
  selectedIndex,
  onSelect,
}: SlideTabsProps) => {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [internalSelected, setInternalSelected] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);

  const selected = selectedIndex ?? internalSelected;
  const safeTabs = useMemo(() => (tabs.length ? tabs : ["Tab"]), [tabs]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 980);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ul
        onMouseLeave={() => {
          const selectedTab = tabsRef.current[selected];
          if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect();
            setPosition({
              left: selectedTab.offsetLeft,
              width,
              opacity: 1,
            });
          }
        }}
        style={{
          position: "relative",
          margin: "0 auto",
          display: "flex",
          width: "fit-content",
          maxWidth: "100%",
          flexWrap: isCompact ? "wrap" : "nowrap",
          justifyContent: "center",
          listStyle: "none",
          padding: "6px",
          borderRadius: "999px",
          border: "2px solid #111",
          background: "#fff",
          alignItems: "center",
        }}
      >
        {safeTabs.map((tab, i) => (
          <Tab
            key={tab}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            setPosition={setPosition}
            onClick={() => {
              setInternalSelected(i);
              onSelect?.(i);
            }}
            isCompact={isCompact}
            isActive={selected === i}
          >
            {tab}
          </Tab>
        ))}

        {!isCompact && <Cursor position={position} />}
      </ul>
    </div>
  );
};

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick, isCompact, isActive }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={(event) => {
          if (isCompact) return;
          const target = event.currentTarget;
          const { width } = target.getBoundingClientRect();

          setPosition({
            left: target.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "block",
          cursor: "pointer",
          listStyle: "none",
          margin: isCompact ? "2px" : "0",
          padding: isCompact
            ? "clamp(6px, 1.8vw, 9px) clamp(10px, 2.2vw, 14px)"
            : "clamp(8px, 1.8vw, 12px) clamp(12px, 2.6vw, 24px)",
          fontSize: isCompact ? "clamp(10px, 2.8vw, 12px)" : "clamp(12px, 1.6vw, 14px)",
          fontWeight: 700,
          textTransform: "uppercase",
          color: isCompact ? (isActive ? "#fff" : "#111") : "#fff",
          mixBlendMode: isCompact ? "normal" : "difference",
          userSelect: "none",
          borderRadius: "999px",
          whiteSpace: isCompact ? "normal" : "nowrap",
          textAlign: "center",
          lineHeight: 1.2,
          maxWidth: isCompact ? "210px" : "none",
          background: isCompact ? (isActive ? "#111" : "transparent") : "transparent",
          transition: "background 180ms ease, color 180ms ease",
        }}
      >
        {children}
      </li>
    );
  }
);

Tab.displayName = "Tab";

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      style={{
        position: "absolute",
        zIndex: 0,
        top: "6px",
        bottom: "6px",
        borderRadius: "999px",
        background: "#111",
      }}
    />
  );
};

