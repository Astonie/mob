"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f8fafc",
          color: "#0a1f2e",
        }}
      >
        <div style={{ maxWidth: "32rem", padding: "2rem", textAlign: "center" }}>
          <title>Mob Limited — Error</title>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              fontWeight: 600,
              color: "#b45309",
            }}
          >
            ERROR
          </p>
          <h1 style={{ marginTop: "0.5rem", fontSize: "1.9rem", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "1rem", color: "#475569", lineHeight: 1.6 }}>
            We hit an unexpected problem loading Mob Limited. Please try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              padding: "0.65rem 1.5rem",
              backgroundColor: "#0F4A6B",
              color: "#ffffff",
              border: 0,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
