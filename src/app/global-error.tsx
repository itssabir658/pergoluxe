"use client";

/**
 * Catches errors thrown *above* the root layout (e.g. inside a provider) —
 * the one place allowed to render its own `<html>`/`<body>`, since the
 * real root layout is presumed broken. Deliberately minimal and dependency-
 * free: it must not rely on anything that could itself be the source of
 * the crash (design tokens, providers, fonts).
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>Something went wrong.</p>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          Please try again, or come back in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
