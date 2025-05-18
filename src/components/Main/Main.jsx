// src/components/Main/Main.jsx
import React, { useEffect, useRef } from 'react';
import '../../assets/scss/Main.scss';
import centers from '../../data/seoul_adm_centroids_normalized.json';

const CERT_KEY = '3059da37325d0e6b01e0daee7c66dd46b73d4e43e2ff496993c0ce75b2ae6479';

// Haversine 거리 계산 함수
const toRad = deg => (deg * Math.PI) / 180;
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반경 (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function Main() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // 1) Leaflet CSS 로드
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // 2) Leaflet JS 로드
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.crossOrigin = '';
    script.onload = () => {
      const L = window.L;

      // 3) 지도는 한 번만 초기화
      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([37.5665, 126.9780], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        mapInstanceRef.current = map;

        // 4) 공공데이터포털 API 마커 로드
        fetch(
          `https://api.odcloud.kr/api/15012005/v1/centers?serviceKey=${CERT_KEY}&page=1&perPage=100`
        )
          .then(res => res.json())
          .then(json => {
            (json.data || []).forEach(item => {
              const lat = parseFloat(item.위도);
              const lng = parseFloat(item.경도);
              if (!isNaN(lat) && !isNaN(lng)) {
                L.marker([lat, lng])
                  .addTo(map)
                  .bindPopup(item.상호명);
              }
            });
          })
          .catch(console.error);

        // 5) 클릭 이벤트: 마커 추가 + 행정동 판별
        map.on('click', e => {
          const { lat, lng } = e.latlng;
          // 가장 가까운 행정동 찾기
          let nearest = { name: null, dist: Infinity };
          centers.forEach(d => {
            const dist = haversine(lat, lng, d.lat, d.lng);
            if (dist < nearest.dist) {
              nearest = { name: d.name, dist };
            }
          });
          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
              `위도: ${lat.toFixed(5)}, 경도: ${lng.toFixed(5)}<br/>행정동: ${nearest.name}`
            )
            .openPopup();
        });
      }
    };
    document.body.appendChild(script);

    // 언마운트 시 정리
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

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
            <select>
              <option>서울시</option>
            </select>
            <select>
              <option>군</option>
            </select>
            <select>
              <option>구</option>
            </select>
          </div>
          <div className="region-list">
            <p>서울시 강남구 상권은 어떠세요.</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
            <p>서울 OO시는 ~</p>
          </div>
        </section>

        {/* --- 지도 표시 섹션 --- */}
        <section className="map-section">
          <div className="map-container">
            {/* 이 div가 지도를 렌더링 합니다 */}
            <div id="map" ref={mapRef} />
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
