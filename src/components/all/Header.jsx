import Logo from "@components/all/Logo";
import Button from "@components/all/Button";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header({ button = false }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerEmptySpace}></div>
        <div className={styles.headerLogo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.headerButton}>
          {button && <Button size="small">그룹 만들기</Button>}
        </div>
      </div>
    </header>
  );
}
