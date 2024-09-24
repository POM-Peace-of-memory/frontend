import Logo from "@components/all/Logo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#FAFAFA",
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1920px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <div style={{ cursor: "pointer" }}>
            <Logo />
          </div>
        </Link>
      </div>
    </header>
  );
}
