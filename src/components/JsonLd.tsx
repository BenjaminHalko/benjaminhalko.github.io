/** @jsxRuntime automatic @jsxImportSource preact */
import type { Thing, WithContext } from "schema-dts";

// Injects a schema.org object as a JSON-LD script. The JSON must NOT be
// HTML-escaped (that would corrupt the structured data), so it is written
// raw via dangerouslySetInnerHTML.
export function JsonLd({ schema }: { schema: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
