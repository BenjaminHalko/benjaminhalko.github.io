/** @jsxRuntime automatic @jsxImportSource preact */
import { loadSvg } from "../data/svg";

export interface ButtonProps {
  link: string;
  color: string;
  text: string;
  icon: string;
  style?: string;
}

// The SVG must be a direct flex child of `.button` (alongside <p>) for the
// `gap` spacing and `.button svg` sizing to apply, so icon + label are injected
// as raw trusted markup rather than wrapped in an element.
export function Button({ link, color, text, icon, style = "" }: ButtonProps) {
  const inner = `${loadSvg(icon)}<p>${text}</p>`;
  return (
    <a
      class="button"
      href={link}
      target="_blank"
      style={`--col: ${color};${style}`}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
