/** @jsxRuntime automatic @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import { TransitionScripts } from "./TransitionScripts";

export interface OpenGraph {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  imageType?: string;
  type?: string;
}

export interface TwitterCard {
  card?: string;
  url?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface HeadProps {
  title: string;
  description?: string;
  robots?: string;
  favicons?: ComponentChildren;
  styles?: string[];
  og?: OpenGraph;
  twitter?: TwitterCard;
  children?: ComponentChildren;
}

export function Head({
  title,
  description,
  robots,
  favicons,
  styles = [],
  og,
  twitter,
  children,
}: HeadProps) {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <TransitionScripts />
      {robots && <meta name="robots" content={robots} />}
      {favicons}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      {og?.type && <meta property="og:type" content={og.type} />}
      {og?.url && <meta property="og:url" content={og.url} />}
      {og?.title && <meta property="og:title" content={og.title} />}
      {og?.description && (
        <meta property="og:description" content={og.description} />
      )}
      {og?.image && <meta property="og:image" content={og.image} />}
      {og?.imageType && (
        <meta property="og:image:type" content={og.imageType} />
      )}

      {twitter?.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter?.url && <meta name="twitter:url" content={twitter.url} />}
      {twitter?.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter?.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter?.image && <meta name="twitter:image" content={twitter.image} />}

      {styles.map((href) => (
        <link rel="stylesheet" href={href} />
      ))}
      {children}
    </head>
  );
}
