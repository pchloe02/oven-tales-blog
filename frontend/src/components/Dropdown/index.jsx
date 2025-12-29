import { useState, useRef, useEffect } from "react";
import { DropdownContainer, ToggleButton, Menu, MenuItem } from "./styled.js";

export default function Dropdown({
  label = "",
  items = [],
  onSelect,
  className,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleSelect = (item) => {
    setOpen(false);
    if (onSelect) {
      onSelect(item);
      return;
    }

    if (item && typeof item === "object") {
      if (item.to) {
        try {
          window.location.href = item.to;
          return;
        } catch (e) {}
      }
      if (typeof item.action === "function") {
        try {
          item.action();
        } catch (e) {
          // ignore
        }
      }
    }
  };

  return (
    <DropdownContainer ref={ref} className={className}>
      <ToggleButton
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        {label}
      </ToggleButton>
      <Menu role="menu" data-open={open} aria-hidden={!open}>
        {items.map((it, i) => (
          <MenuItem
            key={i}
            type="button"
            role="menuitem"
            onClick={() => handleSelect(it)}
            tabIndex={open ? 0 : -1}
          >
            {typeof it === "string" ? it : it.label}
          </MenuItem>
        ))}
      </Menu>
    </DropdownContainer>
  );
}
