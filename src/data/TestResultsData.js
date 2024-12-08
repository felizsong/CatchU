const testResultsData = [
  {
    title: "직업가치관검사 실시 내역",
    date: "11/30",
    type: "value", // 결과 페이지의 타입
    data: {
      title: "직업가치관검사 결과", // 결과 제목
      labels: [
        "사회적 공헌",
        "변화지향",
        "성취",
        "경제적 보상",
        "자기개발",
        "일과 삶의 균형",
        "사회적 인정",
        "자율성",
        "직업안정",
      ], // 카테고리 이름
      scores: [4.7, 4.2, 4.1, 3.5, 3.1, 2.3, 2.1, 1.5, 1.1], // 원점수
      recommendedJobs: [
        "기계 엔지니어",
        "전기 엔지니어",
        "인공지능 연구원",
        "로봇 공학자",
        "데이터 분석가"
      ], // 추천 직업
      date: "2024.11.30",
    },
  },
  {
    title: "직업적성검사 실시 내역",
    date: "11/21",
    type: "aptitude", // 결과 페이지의 타입
    data: {
      title: "직업적성검사 결과",
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
      scores: [90, 127, 123, 123, 110, 98, 106, 117, 117, 85, 109], // 점수만 전달
      date: "2024.11.21", // 검사 날짜
    },
  },
  {
    title: "구직준비도 검사 실시 내역",
    date: "11/15",
    type: "preparation",
    data: {
      title: "구직준비도 검사 결과",
      labels: [
        "경제적 취약성 적응도",
        "사회적 취약성 적응도",
        "자아 존중감",
        "자기 효능감",
        "경력의 유동화 능력",
        "고용정보 수집활동"
      ],
      scores: [8.7, 8.2, 8.1, 6.5, 6.1, 5.3], // 각 차원별 점수  
      date: "2024.11.15"
    },
  },
  {
    title: "직업적성검사 실시 내역",
    date: "11/13",
    type: "aptitude", // 결과 페이지의 타입
    data: {
      title: "직업적성검사 결과",
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
      scores: [80, 110, 111, 111, 99, 98, 88, 109, 108, 85, 109], // 점수만 전달
      date: "2024.11.13", // 검사 날짜
    },
  },
  {
    title: "직업가치관검사 실시 내역",
    date: "11/10",
    type: "value", // 결과 페이지의 타입
    data: {
      title: "직업가치관검사 결과", // 결과 제목
      labels: [
        "사회적 공헌",
        "변화지향",
        "성취",
        "경제적 보상",
        "자기개발",
        "일과 삶의 균형",
        "사회적 인정",
        "자율성",
        "직업안정",
      ], // 카테고리 이름
      scores: [9.5, 8.7, 7.8, 7.2, 6.8, 5.9, 5.3, 4.4, 3.2], // 원점수
      recommendedJobs: [
        "의사",
        "항공기 조종사",
        "우주비행사",
        "환경 과학자",
        "생명공학 연구원",
        "게임 개발자",
        "그래픽 디자이너",
        "소프트웨어 엔지니어",
        "고고학자",
        "천문학자"
      ], // 추천 직업
      date: "2024.11.10",
    },
  },
  {
    title: "직업가치관검사 실시 내역",
    date: "11/9",
    type: "value", // 결과 페이지의 타입
    data: {
      title: "직업가치관검사 결과", // 결과 제목
      labels: [
        "사회적 공헌",
        "변화지향",
        "성취",
        "경제적 보상",
        "자기개발",
        "일과 삶의 균형",
        "사회적 인정",
        "자율성",
        "직업안정",
      ], // 카테고리 이름
      scores: [9.4, 8.8, 8.5, 7.9, 7.4, 6.5, 6.0, 5.3, 4.7], // 원점수
      recommendedJobs: [
        "내과 전문의",
        "소아과 의사",
        "정신과 의사",
        "외과 의사",
        "응급구조 의사",
        "심리치료사",
        "재활치료 전문가",
        "약사",
        "의료 연구원",
        "임상 병리사"
      ], // 추천 직업
      date: "2024.11.9",
    },
  },
  {
    title: "구직준비도 검사 실시 내역",
    date: "11/7",
    type: "preparation",
    data: {
      title: "구직준비도 검사 결과",
      labels: [
        "경제적 취약성 적응도",
        "사회적 취약성 적응도",
        "자아 존중감",
        "자기 효능감",
        "경력의 유동화 능력",
        "고용정보 수집활동"
      ],
      scores: [4.7, 5.3, 5.4, 8.1, 8.5, 9.3], // 각 차원별 점수  
      date: "2024.11.7"
    },
  },
];

export default testResultsData;
