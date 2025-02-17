import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "../style/ResultJobValueTest.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResultJobValueTest = ({ profileData }) => {
  const location = useLocation();

  // 1. 데이터 우선 순위: `results` -> 테스트에서 전달된 `categoryScores` -> 기본값
  const results = location.state?.results || {};
  const categoryScores = location.state?.categoryScores || [];
  const dataDate = results.date;

  // 2. 현재 날짜 가져오기
  const currentDate = new Date().toLocaleDateString();
  const displayDate = dataDate || (categoryScores[0]?.date || currentDate);

  const userName = profileData?.name || "사용자";

  // 3. 데이터 병합: `results` 우선, 없으면 `categoryScores`, 기본값 사용
  const selectedCategories =
    results.labels ||
    categoryScores.map((item) => item.category) || [
      "사회적 공헌",
      "변화지향",
      "성취",
      "경제적 보상",
      "자기개발",
      "일과 삶의 균형",
      "사회적 인정",
      "자율성",
      "직업안정",
    ];

  const selectedScores =
    results.scores ||
    categoryScores.map((item) => item.score) || [4.7, 4.2, 4.1, 3.5, 3.1, 2.3, 2.1, 1.5, 1.1];

  const standardScores =
    results.standardScores ||
    selectedScores.map((score) => Math.round(score * 15));

  const levels =
    results.levels ||
    standardScores.map((score) => {
      if (score >= 60) return "최상";
      if (score >= 50) return "상";
      if (score >= 40) return "중";
      if (score >= 30) return "하";
      return "최하";
    });

  // 4. 점수 기반으로 상위/하위 3위 계산
  const scoredCategories = selectedCategories.map((category, index) => ({
    category,
    score: selectedScores[index],
  }));

  const calculatedTopRank = [...scoredCategories]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const calculatedLowRank = [...scoredCategories]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const topRank = results.topRank || calculatedTopRank;
  const lowRank = results.lowRank || calculatedLowRank;

  const recommendedJobs =
    results.recommendedJobs || [
      "감사 사무원",
      "감정평가사",
      "경영 기획 사무원",
      "고객 상담원",
      "관세사",
      "광고·홍보·마케팅 사무원",
      "행사기획자",
      "회계사",
    ];

  const chartData = {
    labels: selectedCategories,
    datasets: [
      {
        label: "직업 가치관 점수",
        data: selectedScores,
        backgroundColor: "#9BA1FF", // 변경된 색상
        borderColor: "#9BA1FF", // 변경된 색상
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // 차트 비율 유지 안 함
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const exportToPDF = () => {
    const element = document.getElementById("result-container");
    if (!element) return;

    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210; // A4 너비(mm)
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName}님의 직업가치관검사결과_${currentDate}.pdf`);
    });
  };

  return (
    <>
      <div className="print-button-container">
        <button onClick={exportToPDF} className="export-button">
          PDF로 저장
        </button>
      </div>
      <div className="result-job-value-container" id="result-container">
        <div className="result-job-value-header">
          <div>{userName}님의 직업 가치관 검사 결과</div>
          <p>검사 날짜: {displayDate}</p>
        </div>

        <div className="result-job-value-detail-header">
          <div>1. 직업가치관검사란?</div>
        </div>

        <div className="result-job-value-main">
          <p>본 직업가치관검사는 당신이 직업을 선택할 때 중요하게 생각하는 가치가 무엇인지를 확인해보는 심리검사입니다.<br></br>
            당신이 중요하게 생각하는 직업가치를 9개 가치요인을 기준으로 파악하고 이를 바탕으로 당신의 직업가치관에 적합한 직업분야를 안내해드리고자 합니다.<br></br>
            당신이 중요하게 생각하는 가치를 충족시킬 수 있는 직업에 종사할 때 당신은 해당 직업에 더욱 만족하게 될 것입니다.</p>
        </div>

        <div className="result-job-value-detail-header">
          <div>2. 직업가치관검사 결과</div>
        </div>

        <div className="result-job-value-main">
          <div className="result-chart-section">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* 결과표 */}
          <div className="result-table-section">
            <table className="rank-table">
              <thead>
                <tr>
                  <th>구분</th>
                  {selectedCategories.map((category, index) => (
                    <th key={index}>{category}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>원점수</th>
                  {selectedScores.map((score, index) => (
                    <td key={index}>{score.toFixed(1)}</td>
                  ))}
                </tr>
                <tr>
                  <th>표준점수</th>
                  {standardScores.map((score, index) => (
                    <td key={index}>{score}</td>
                  ))}
                </tr>
                <tr>
                  <th>수준</th>
                  {levels.map((level, index) => (
                    <td key={index}>{level}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <br></br>
            <br></br>
            <table className="rank-table">
              <tbody>
                {/* 상위 직업가치관 */}
                <tr>
                  <th rowSpan={3}>상위 직업가치관</th>
                  <th>1순위</th>
                  <td>{topRank[0].category}</td>
                  <th rowSpan={3}>하위 직업가치관</th>
                  <th>1순위</th>
                  <td>{lowRank[0].category}</td>
                </tr>
                <tr>
                  <th>2순위</th>
                  <td>{topRank[1].category}</td>
                  <th>2순위</th>
                  <td>{lowRank[1].category}</td>
                </tr>
                <tr>
                  <th>3순위</th>
                  <td>{topRank[2].category}</td>
                  <th>3순위</th>
                  <td>{lowRank[2].category}</td>
                </tr>
              </tbody>
            </table>
            <br></br>
          </div>
        </div>

        <div className="result-job-value-detail-header">
          <div>3. 추천 직업</div>
        </div>

        <div className="result-job-value-main">
          {/* 추천 직업 */}
          <div className="result-recommendation-section">
            <p>당신의 직업 가치관에 적합한 직업:</p>
            <div className="recommended-jobs-container">
              {recommendedJobs.map((job, index) => (
                <div key={index} className="job-card">
                  <span className="job-card-title">{job}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultJobValueTest;
