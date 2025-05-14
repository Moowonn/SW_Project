// src/components/Main.jsx
import React from 'react';
import '../../assets/scss/Main.scss';

const CERT_KEY = '3059da37325d0e6b01e0daee7c66dd46b73d4e43e2ff496993c0ce75b2ae6479';

function Main() {
  return (
    <div className="main-container">
      <header className="main-header">
        <div className="logo-image">
          <img src="/image/On_image.png" alt="상권온 로고" />
        </div>
        <div className="logo">상권온(ON)</div>
      </header>

      <div className="main-content">
        {/* --- 지역 선택 섹션 --- */}
        <section className="location-select">
          <h2>지역을 선택하세요.</h2>
          <div className="dropdowns">
            <select><option>서울시</option></select>
            <select><option>군</option></select>
            <select><option>구</option></select>
          </div>
          <div className="region-list">
            <p>서울시 강남구 상권은 어떠세요.</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
          </div>
        </section>

        {/* --- 지도 임베드 섹션 --- */}
        <section className="map-section">
          <div className="map-container">
            <iframe
              title="소상공인365 상권지도"
              src={`https://bigdata.sbiz.or.kr/#/openApi/detail?certKey=a7ecc262dde0ab54ef8d6d017c7d2330b0c7d921e8091ea588c0039b6b06f4df`}
              allowFullScreen
            />
          </div>
          <div className="region-summary">
            <h3>이런 상권은 어때요?</h3>
            <p>중앙시 시장구 밀집도</p>
            <p>타지역 월등한 1등</p>
            <p>인접지 인구수</p>
          </div>
        </section>

        {/* --- 시각화 보조자료 섹션 --- */}
        <section className="visual-section">
          <h2>시각화 보조자료</h2>
          <div className="bar-chart">
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
