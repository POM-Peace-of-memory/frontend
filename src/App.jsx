import "./App.css";

function App() {
  return (
    <>
      {/* 임시 스타일 가이드 - 세팅 완료 후 삭제 */}
      <div className="typography">
        <div>typography</div>
        <div className="typo-30-bold">Spoqa Han Sans Neo</div>
        <div className="typo-24-bold">Spoqa Han Sans Neo</div>
        <div className="typo-20-regular">Spoqa Han Sans Neo</div>
        <div className="typo-18-bold">Spoqa Han Sans Neo</div>
        <div className="typo-18-regular">Spoqa Han Sans Neo</div>
        <div className="typo-16-bold">Spoqa Han Sans Neo</div>
        <div className="typo-16-medium">Spoqa Han Sans Neo</div>
        <div className="typo-16-regular">Spoqa Han Sans Neo</div>
        <div className="typo-14-bold">Spoqa Han Sans Neo</div>
        <div className="typo-14-regular">Spoqa Han Sans Neo</div>
        <div className="typo-12-regular">Spoqa Han Sans Neo</div>
      </div>
      <div className="color">
        <div>color</div>
        <div style={{ backgroundColor: `var(--black)` }}>black</div>
        <div style={{ backgroundColor: `var(--gray-500)` }}>gray-500</div>
        <div style={{ backgroundColor: `var(--gray-400)` }}>gray-400</div>
        <div style={{ backgroundColor: `var(--gray-200)` }}>gray-200</div>
        <div style={{ backgroundColor: `var(--gray-100)` }}>gray-100</div>
        <div style={{ backgroundColor: `var(--gray-50)` }}>gray-500</div>
        <div style={{ backgroundColor: `var(--white)` }}>white</div>
        <div style={{ backgroundColor: `var(--red)` }}>red</div>
      </div>
    </>
  );
}

export default App;
