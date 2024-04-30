# FC-Archive

## 프로젝트 소개

> nexon에서 제공해주는 FC online api를 사용하여 전적 검색 사이트를 구현했습니다.

## 개발 기간
2024.03.14 ~ 2024.03.29

## 배포 주소 

🔗 https://fc-archive.vercel.app

## 주요 기능

- API 호출 최소화
    - React-query의 데이터 캐싱을 통해 api 호출을 줄임

- 검색 및 최근 검색어 구현 
    - 구단주 명을 통해 검색 
    - localStorage를 사용하여 최근에 검색한 구단주를 최대 5명까지 보여줌
    - keyboard 이벤트를 구현하여 최근 검색어를 이동할 수 있도록 구현

- 구단주 정보
    - 닉네임, 레벨, 공식 경기 최고 등급, 감독 모드 최고 등급을 보여줌

- 매치 리스트
    - 디폴트 값: 공식 경기
    - 공식 경기, 친선 경기, 감독 모드 별 매치 기록을 볼 수 있도록 구현
    - 경기당 평균 점유율, 득점, 실점을 보여줌
    - 매치 기록의 닉네임 클릭 시 해당 구단주 기록으로 이동

- 매치 기록
    - 각 매치 분석, 상대 및 자신의 스쿼드 볼 수 있도록 구현
    - 스쿼드에서 선수 클릭 시 해당 선수의 개인 기록을 보여줌 

- 해외 축구 
    - 풋몹 api를 사용하여 해외 리그 팀들의 일정, 순위 및 스쿼드 볼 수 있도록 구현
    - 각 팀 선수 클릭 시 해당 선수의 요번 시즌 스탯을 보여줌
    - 감독 클릭 시 총 경기 횟수, 승리, 패배, 무승부 기록을 보여줌

## 기술스택 

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library
<img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/React Router Dom-3178C6?style=for-the-badge&logo=reactrouterdom&logoColor=white">
<img src="https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

### Environment

<img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">