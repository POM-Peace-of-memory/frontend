import Header from "@components/all/Header";
import notFoundIcon from "@assets/notFound.svg";

export default function NotFound() {
  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "355.171px",
            height: "156.121px",
            marginTop: "25vh",
            flexShrink: "0",
          }}
        >
          <img style={{ width: "100%" }} src={notFoundIcon} alt="404아이콘" />
        </div>
        <span
          className="typo-18-bold"
          style={{ marginTop: "40.88px", color: "var(--gray-500)" }}
        >
          찾을 수 없는 페이지입니다.
        </span>
        <span
          className="typo-14-regular"
          style={{ marginTop: "20px", color: "var(--gray-400)" }}
        >
          요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.
        </span>
      </div>
    </>
  );
}
