/** @jsxRuntime automatic @jsxImportSource preact */
import { loadSvg } from "../data/svg";

export interface ButtonProps {
  link: string;
  color: string;
  text: string;
  icon: string;
  style?: string;
  newTab?: boolean;
}

// The SVG must be a direct flex child of `.button` (alongside <p>) for the
// `gap` spacing and `.button svg` sizing to apply, so icon + label are injected
// as raw trusted markup rather than wrapped in an element.
export function Button({
  link,
  color,
  text,
  icon,
  style = "",
  newTab = true,
}: ButtonProps) {
  const inner = `${loadSvg(icon)}<span>${text}</span>`;
  return (
    <a
      class="button"
      href={link}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      style={`--col: ${color};${style}`}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
