# FC-Archive

## 프로젝트 소개

> nexon에서 제공해주는 FC online api를 사용하여 전적 검색 사이트를 구현했습니다.

## 개발 기간
2024.03.14 ~ 2024.03.29

## 배포 주소 

🔗 https://fc-archive.vercel.app

## 화면 구성 

|                                          검색창                                                                              |                                                                               매치 리스트                                                                              |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="380" alt="signin" src="https://github.com/owen970517/FC-Archive/assets/75247323/9a0b2607-1a34-4969-a7ce-155c5669f08f"> | <img width="380" alt="signup" src="https://github.com/owen970517/FC-Archive/assets/75247323/2872762b-5063-4804-8269-033b6e744729"> |

|                                                                                  매치 상세 리스트                                                                                  |                                                                               해외 축구 팀 순위                                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="380" alt="todo_gif" src="https://github.com/owen970517/FC-Archive/assets/75247323/fa32fdf6-6b40-4117-bbe1-dad56c55eaf6" /> | <img width="380" alt="notfound" src="https://github.com/owen970517/FC-Archive/assets/75247323/ce1567b7-f982-463f-a1f8-4c94146edd25"> 

|                                                                                  해외 축구 팀 상세 정보                                                                                                                                                                                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
| <img width="380" alt="todo_gif" src="https://github.com/owen970517/FC-Archive/assets/75247323/30c7b25e-73ff-46b2-b5d0-a1e4a5278923" /> | 

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
    - 10경기당 평균 점유율, 득점, 실점을 보여줌
    - 매치 기록의 닉네임 클릭 시 해당 구단주 기록으로 이동
    - useInfiniteQuery를 사용하여 더보기 기능 구현 (2024년 6월 15일)

- 매치 기록
    - 각 매치 분석, 상대 및 자신의 스쿼드 볼 수 있도록 구현
    - 스쿼드에서 선수 클릭 시 해당 선수의 개인 기록을 보여줌 

- 해외 축구 (2024.04.27 ~ 2024.04.30)
    - 풋몹 api를 사용하여 해외 리그 팀들의 일정, 순위 및 스쿼드 볼 수 있도록 구현
    - 각 팀 선수 클릭 시 해당 선수의 요번 시즌 스탯을 보여줌
    - 감독 클릭 시 총 경기 횟수, 승리, 패배, 무승부 기록을 보여줌

## 트러블 슈팅 

### 1. useQueries로 데이터 병렬 처리 시 데이터를 하나씩 보여지는 현상 발생
- 원인 : return 데이터를 받아온 후 isSuccess가 false에서 true로 변경
- 해결 방법 : 모든 데이터의 isSuccess가 true일 경우 데이터를 보여주도록 개선
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/FC-Archive/blob/712a5b8ef2242d3386ae8e23f45ebd6433eef1e0/src/components/matches/Match.tsx#L47-L66
            </ul>
        </div>
    </details>

### 2. 새로고침 및 뒤로가기 했을 때 매치 리스트를 보여주지 않는 현상 발생
- 원인 : 리렌더링 시 redux 데이터가 초기화되기 떄문
- 해결 방법 : useEffect를 사용하여 쿼리스트링이 변경되거나, ouid가 달라졌을 경우 다시 할당하도록 개선
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/FC-Archive/blob/bd93dca5434e9dfd9c9596935de06aadae4caa16/src/components/matches/Match.tsx#L29-L42
            </ul>
        </div>
    </details>

## 기술스택 

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel">
<img src="https://img.shields.io/badge/redux-purple?style=for-the-badge&logo=redux">

### Library
<img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/React Router Dom-3178C6?style=for-the-badge&logo=reactrouterdom&logoColor=white">
<img src="https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

### Environment

<img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">