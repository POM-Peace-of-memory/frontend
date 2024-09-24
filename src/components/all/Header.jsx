import Logo from "@components/all/Logo";
import Button from "@components/all/Button";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ button = false }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-empty-space"></div>
        <div className="header-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="header-button">
          {button && <Button size="small">그룹 만들기</Button>}
        </div>
      </div>
    </header>
  );
}
