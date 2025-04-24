// src/components/Backdrop.jsx
import { createPortal } from "react-dom";

/**
 * Full‑screen blurry overlay, rendered in a portal so nothing can
 * stack above it. Clicks anywhere on the overlay call `onClick`.
 */
export default function Backdrop({ onClick }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
      onClick={onClick}
    />,
    document.body
  );
}
