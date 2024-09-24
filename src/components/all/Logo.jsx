import logo from "@assets/logo.svg";
export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="조각집" style={{ width: "137px", height: "48px" }} />
    </div>
  );
}
