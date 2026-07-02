import Link from "next/link";

const links = [
  { href: "/shows", label: "Shows" },
  { href: "/methodology", label: "Methodology" },
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px 7vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "2px solid var(--cream-200)",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div
        style={{
          flex: 1,
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 30,
        }}
      >
        KidLens
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "var(--ink-500)",
          fontSize: 15,
          fontWeight: 600,
          minWidth: 260,
        }}
      >
        Measured media for growing minds · proof of concept
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          gap: 22,
          color: "var(--ink-500)",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        {links.map((l) => (
          <Link
            key={l.label}
            className="navlink"
            href={l.href}
            style={{ color: "var(--ink-500)" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
