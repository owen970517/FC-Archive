interface Teams {
    [key: string]: string;
  }
  
  interface Translation {
    id: number;
    teams: Teams;
  }

export const enTokrTeam: { [leagueId: number]: Translation }  = 
    {
      47 : {
        id : 47,
        teams : {
          "Arsenal":'아스날',
          "Man City":'맨체스터 시티',
          "Liverpool":'리버풀',
          "Aston Villa":'아스톤 빌라',
          "Tottenham":'토트넘',
          "Man United":'맨체스터 유나이티드',
          "Newcastle":'뉴캐슬',
          "West Ham":'웨스트햄',
          "Chelsea":'첼시',
          "Bournemouth":'본머스',
          "Brighton":'브라이튼',
          "Wolves":'울버햄튼',
          "Fulham":'풀럼',
          "Crystal Palace":'크리스탈 팰리스',
          "Brentford":'브랜트포드',
          "Everton":'에버튼',
          "Nottm Forest":'노팅엄 포레스트',
          "Luton":'루턴',
          "Burnley":'번리',
          "Sheff Utd":'셰필드',
        }
      },
      87: {
        id:87,
        teams:{
          "Real Madrid": "레알 마드리드",
          "Barcelona": "바르셀로나",
          "Atletico Madrid": "AT 마드리드",
          'Girona' : '지로나',
          "Sevilla": "세비야",
          "Villarreal": "비야레알",
          "Real Sociedad": "레알 소시에다드",
          "Real Betis": "레알 베티스",
          "Valencia": "발렌시아",
          "Athletic Club": "아틀레틱",
          "Getafe": "헤타페",
          "Celta Vigo": "셀타 비고",
          "Espanyol": "에스파뇰",
          "Levante": "레반테",
          "Granada": "그라나다",
          "Deportivo Alaves": "알라베스",
          'Las Palmas' :'라스팔마스',
          'Rayo Vallecano' : '바예카노',
          "Cadiz": "카디스",
          "Osasuna": "오사수나",
          "Mallorca": "마요르카",
          'Almeria' : '알메리아'
        }
      },
      54 : {
        id:54,
        teams : {
          "Leverkusen": "레버쿠젠",
          "Bayern München": "바이에른 뮌헨",
          "VfB Stuttgart": "슈투트가르트",
          "RB Leipzig": "RB 라이프치히",
          "Dortmund": "도르트문트",
          "Frankfurt": "프랑크푸르트",
          "Freiburg": "프라이부르크",
          "Augsburg": "아우크스부르크",
          "Hoffenheim": "호펜하임",
          "Werder Bremen": "베르더 브레멘",
          "FC Heidenheim": "하이덴하임",
          "Wolfsburg": "볼프스부르크",
          "M'gladbach": "묀헨글라드바흐",
          "VfL Bochum": "보훔",
          "Union Berlin": "우니온 베를린",
          "Mainz": "마인츠",
          "Köln": "쾰른",
          "SV Darmstadt": "다름슈타트"
        }
      },
      55 : {
        id:55,
        teams: {
          "Inter": "인터 밀란",
          "AC Milan": "AC 밀란",
          "Juventus": "유벤투스",
          "Bologna": "볼로냐",
          "Roma": "AS 로마",
          "Lazio": "라치오",
          "Atalanta": "아탈란타",
          "SSC Napoli": "나폴리",
          "Fiorentina": "피오렌티나",
          "Torino": "토리노",
          "Monza": "몬차",
          "Genoa": "제노아",
          "Lecce": "레체",
          "Cagliari": "칼리아리",
          "Empoli": "엠폴리",
          "Frosinone": "프로시노네",
          "Hellas Verona": "베로나",
          "Udinese": "우디네세",
          "Sassuolo": "사수올로",
          "Salernitana": "살레르니타나"
        }
      },
      53 : {
        id:53,
        teams : {
          "PSG": "PSG",
          "Monaco": "모나코",
          "Brest": "브레스트",
          "Lille": "릴",
          "Nice": "니스",
          "Lens": "랑스",
          "Rennes": "렌",
          "Marseille": "마르세유",
          "Lyon": "리옹",
          "Reims": "랭스",
          "Toulouse": "툴루즈",
          "Montpellier": "몽펠리에",
          "Strasbourg": "스트라스부르",
          "Nantes": "낭트",
          "Le Havre": "르 아브르",
          "Metz": "메스",
          "Lorient": "로리앙",
          "Clermont Foot": "클레르몽 푸트"
        }
      },
      9080 : {
        id:9080,
        teams: {
          "Gimcheon Sangmu": "김천 상무",
          "Pohang Steelers": "포항 스틸러스",
          "Suwon FC": "수원 FC",
          "Ulsan HD FC": "울산 현대 FC",
          "Gangwon FC": "강원 FC",
          "Jeonbuk Hyundai Motors FC": "전북 현대 모터스 FC",
          "Incheon United": "인천 유나이티드",
          "Jeju United": "제주 유나이티드",
          "FC Seoul": "FC 서울",
          "Daejeon Hana Citizen": "대전 하나 시티즌",
          "Daegu FC": "대구 FC",
          "Gwangju FC": "광주 FC"
        }
      }
    }