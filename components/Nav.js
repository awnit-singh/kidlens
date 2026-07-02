import Link from "next/link";

const links = [
  { href: "/shows", label: "Shows" },
  { href: "/methodology", label: "Methodology" },
];

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 7vw",
        background: "rgba(255,249,230,.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 38,
          lineHeight: 1,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <i
          className="ph-fill ph-binoculars"
          style={{ fontSize: 32, color: "var(--green-500)" }}
        />
        KidLens
      </Link>
      <div
        className="kd-nav-links"
        style={{ display: "flex", alignItems: "center", gap: 34 }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            className="navlink"
            href={l.href}
            style={{
              color: "var(--ink-700)",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          className="btnp"
          href="/shows"
          style={{
            fontSize: 16,
            background: "var(--coral-500)",
            color: "#fff",
            border: "2px solid var(--coral-500)",
            borderRadius: 999,
            padding: "11px 24px",
          }}
        >
          Browse shows
        </Link>
      </div>
    </nav>
  );
}
