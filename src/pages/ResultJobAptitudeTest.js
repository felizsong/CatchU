import React from "react";
import { useLocation } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import "../style/ResultJobAptitudeTest.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResultJobAptitudeTest = ({ profileData }) => {
  const location = useLocation();
  const userName = profileData.name;
  //const pdfRef = useRef(); // PDF로 변환할 영역의 참조
  const currentDate = new Date().toLocaleDateString(); // 현재 날짜 선언

  // 테스트 데이터를 받거나 기본값 설정
  const results = location.state?.results || {
    title: "기본 검사 결과",
    labels: [
      "언어력",
      "수리력",
      "추리력",
      "공간 지각력",
      "사물 지각력",
      "상황 판단력",
      "기계능력",
      "집중력",
      "색채 지각력",
      "문제 해결능력",
      "사고 유창력",
    ],
    scores: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], // 기본 점수
    recommendedJobs: [], // 기본 추천 직업
    date: currentDate,
  };

  // 점수 기반 계산: 수준(Level)과 백분위(Percentiles) 동적 생성
  const levels =
    results.levels ||
    results.scores.map((score) => {
      if (score >= 130) return "최상";
      if (score >= 110) return "상";
      if (score >= 90) return "중상";
      if (score >= 70) return "중하";
      return "하";
    });

  const percentiles =
    results.percentiles ||
    results.scores.map((score) => Math.round((score / 150) * 100)); // 최대 점수 기준 정규화

  // 그래프 데이터
  const graphData = {
    labels: results.labels,
    datasets: [
      {
        label: "점수",
        data: results.scores,
        fill: false,
        borderColor: "#666eff",
        backgroundColor: "#666eff",
        tension: 0.4,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: "top" } },
    scales: {
      y: {
        title: { display: true, text: "점수" },
        min: 40,
        max: 150,
      },
      x: {
        title: { display: true, text: "적성 요인" },
        ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 },
      },
    },
  };

  const data2 = {
    labels: results.labels,
    datasets: [
      {
        type: "line",
        label: "나",
        data: results.scores,
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        tension: 0.4,
        fill: false,
      },
      {
        type: "bar",
        label: "법률 전문가",
        data: [114, 115, 109, 106, 101, 102, 105, 104, 109, 103, 106],
        backgroundColor: "rgba(255, 223, 71, 0.7)",
      },
    ],
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        title: { display: true, text: "점수" },
        min: 40,
        max: 150,
      },
      x: {
        title: { display: true, text: "적성 요인" },
      },
    },
  };

  const recommendedJobs = [
    {
      rank: 1,
      jobField: "법률 전문가",
      subJobs: "판사 및 검사, 변호사, 법무사 및 법원직, 관리사",
      keyAbilities: "언어력/추리력/수리력",
    },
    {
      rank: 2,
      jobField: "의사 및 한의사",
      subJobs: "의사 및 한의사",
      keyAbilities: "수리력/집중력/언어력/문제해결능력",
    },
    {
      rank: 3,
      jobField: "의사",
      subJobs: "전문의, 일반의사, 한의사, 치과의사, 수의사",
      keyAbilities: "수리력/언어력/문제해결능력/집중력",
    },
    {
      rank: 4,
      jobField: "회계 사무/금융평가 전문가",
      subJobs: "회계사, 세무사, 감사사, 금융평가사, 관세사 (상품별 보고서 제공)",
      keyAbilities: "수리력/추리력/언어력",
    },
    {
      rank: 5,
      jobField: "중등교사",
      subJobs: "중등교사",
      keyAbilities: "언어력/문제해결능력/추리력",
    },
  ];

  const exportToPDF = () => {
    const element = document.getElementById("result-container");
    if (!element) return;

    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210; // A4 너비(mm)
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName}님의 직업적성검사결과_${results.date || currentDate}.pdf`);
    });
  };

  return (
    <div>
      {/* PDF 저장 버튼 */}
      <div className="print-button-container">
        <button onClick={exportToPDF} className="export-button">
          PDF로 저장
        </button>
      </div>

      <div className="resultaptitude-container" id="result-container">
        {/* 첫 번째 그래프 */}
        <div className="resultaptitude-header">
          <div>{userName}님의 {results.title}</div>
          <p>검사 날짜: {results.date || currentDate}</p>
        </div>

        <div className="resultaptitude-details-header">
          <div>프로파일 해석</div>
        </div>

        <div className="resultaptitude-main">
          <div className="resultaptitude-graph">
            <GraphComponent data={graphData} options={graphOptions} />
          </div>
          <div className="resultaptitude-table">
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  {results.labels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>수준</th>
                  {levels.map((level, index) => (
                    <td key={index}>{level}</td>
                  ))}
                </tr>
                <tr>
                  <th>변환점수</th>
                  {results.scores.map((score, index) => (
                    <td key={index}>{score}</td>
                  ))}
                </tr>
                <tr>
                  <th>백분위</th>
                  {percentiles.map((percentile, index) => (
                    <td key={index}>{percentile}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 두 번째 그래프 */}
        <div className="resultaptitude-details-header">
          <div>직업 추천 결과</div>
        </div>

        <div className="resultaptitude-main">
          <p>나의 적합특성에 적합한 직업</p>
          <div className="resultaptitude-table">
            <table>
              <thead>
                <tr>
                  <th>추천 순위</th>
                  <th>직업</th>
                  <th>세부 직업</th>
                  <th>중요한 역량</th>
                </tr>
              </thead>
              <tbody>
                {recommendedJobs.map((job) => (
                  <tr key={job.rank}>
                    <td>{job.rank}</td>
                    <td>{job.jobField}</td>
                    <td>{job.subJobs}</td>
                    <td>{job.keyAbilities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <p>추천직업과의 비교: {data2.datasets[1].label}</p>
          <GraphComponent data={data2} options={options2} />
          <br></br>
          <div className="resultaptitude-table">
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  {results.labels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{userName}님</th>
                  {results.scores.map((score, index) => (
                    <td key={index}>{score}</td>
                  ))}
                </tr>
                <tr>
                  <th>추천직업</th>
                  {data2.datasets[1].data.map((score, index) => (
                    <td key={index}>{score}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultJobAptitudeTest;
