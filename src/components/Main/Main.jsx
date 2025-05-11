import React from 'react';
import '../../assets/scss/Main.scss';

function Main() {
  return (
    <div className="main-container">
      <header className="main-header">
        <div className="logo">상권온(ON)</div>
      </header>

      <div className="main-content">
        <section className="location-select">
          <h2>지역을 선택하세요.</h2>
          <div className="dropdowns">
            <select><option>시</option></select>
            <select><option>군</option></select>
            <select><option>구</option></select>
          </div>

          <div className="region-list">
            <p>경기도 수원시 상권은 어떠세요.</p>
            <p>경기도 성남시는 ~</p>
            <p>경기도 안산시는 ~</p>
            <p>경기도 부천시는 ~</p>
            <p>경기도 의정부는 ~</p>
          </div>
        </section>

        <section className="map-section">
          <div className="map-container">
            {/* 지도를 대체할 영역 */}
            <img src="/map-placeholder.png" alt="지도 이미지" />
          </div>

          <div className="region-summary">
            <h3>이런 상권은 어때요?</h3>
            <p>중앙시 시장구 밀집도</p>
            <p>타지역 월등한 1등</p>
            <p>인접지 인구수</p>
          </div>
        </section>

        <section className="visual-section">
          <h2>시각화 보조자료</h2>
          <div className="bar-chart">
            {/* 간단한 바 차트 영역 */}
            <div className="bar">강남역</div>
            <div className="bar">홍대입구</div>
            <div className="bar">신촌</div>
            <div className="bar">종로3가</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
