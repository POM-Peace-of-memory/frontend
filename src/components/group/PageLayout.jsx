export default function PageLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minWidth: "965px",
        boxSizing: "border-box",
        padding: "0 9%",
        marginBottom: "40px",
      }}
    >
      {children}
    </div>
  );
}
