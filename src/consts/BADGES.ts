import {
  Camera,
  Cat,
  ConfoundedCircle,
  CrownStar,
  CupStar,
  Danger,
  Eye,
  EyeScan,
  FaceScanCircle,
  Gift,
  HandShake,
  HandStars,
  Health,
  Hearts,
  History2,
  Home2,
  Leaf,
  Logout2,
  Masks,
  Muted,
  PeopleNearby,
  Printer,
  QuestionCircle,
  Running,
  StarAngle,
  StarShine,
  StarsLine,
  Text,
  ThreeSquares,
  UserHandUp,
  UserRounded,
  Waterdrops,
  Wind,
} from '@solar-icons/react'
import type { Icon } from '@solar-icons/react/lib/types'

interface IBadge {
  name: string
  color: string
  backgroundColor: string
  border: string
  icon: Icon
  criteria: string
}

export const BADGES: Record<number, IBadge> = {
  1: {
    name: '시간빌게이츠',
    color: '#193676',
    backgroundColor: '#BBE4FF',
    border: '#547ACA',
    icon: History2,
    criteria: `“또 오셨네요?” 연속 출석 달성`
  },
  2: {
    name: '관상가',
    color: '#FFF632',
    backgroundColor: '#333C64',
    border: '#333C64',
    icon: Eye,
    criteria: `“MBTI 분석 마스터” MBTI 테스트를 성실히 하면 획득`
  },
  3: {
    name: '다중인격',
    color: '#F9F0FF',
    backgroundColor: '#B37FEB',
    border: '#B37FEB',
    icon: Masks,
    criteria: `“지금도 당신의 MBTI는 바뀌는 중” 여러 종류의 MBTI를 수집`
  },
  4: {
    name: 'FFFFFF',
    color: '#E2CFEB',
    backgroundColor: '#313131',
    border: '#A40BDB',
    icon: ConfoundedCircle,
    criteria: `“감성 MAX, F의 끝판왕” F가 들어간 모든 MBTI를 수집`
  },
  5: {
    name: 'T발 C야?',
    color: '#F7B998',
    backgroundColor: '#2A0810',
    border: '#2A0810',
    icon: Text,
    criteria: `“이성 MAX, T의 끝판왕” T가 들어간 모든 MBTI를 수집`
  },
  6: {
    name: '리액션공장',
    color: '#FF8181',
    backgroundColor: '#292524',
    border: '#292524',
    icon: FaceScanCircle,
    criteria: `“오늘도 돌아가는 리액션 공장” 리액션을 많이 등록하면 획득`
  },
  7: {
    name: '입에서주스가주르륵',
    color: '#FF9E17',
    backgroundColor: '#F8F8F8',
    border: '#FF9E17',
    icon: Waterdrops,
    criteria: `“리액션 없으면 대화 불가” 댓글 작성 횟수가 많으면 획득`
  },
  8: {
    name: '변검술사',
    color: '#ED82D8',
    backgroundColor: '#413341',
    border: '#ED82D8',
    icon: ThreeSquares,
    criteria: `“오늘은 어떤 얼굴을 쓸까” 등록된 프로필 이미지가 많으면 획득`
  },
  9: {
    name: '파파라치',
    color: '#F0EFB9',
    backgroundColor: '#330A6D',
    border: '#5D7BBE',
    icon: Camera,
    criteria: `“사진 찍기 좋아하는 당신은” 등록한 프로필 이미지가 많으면 획득`
  },
  10: {
    name: '전문찍새',
    color: '#74D4FF',
    backgroundColor: '#000',
    border: '#000',
    icon: EyeScan,
    criteria: `“여행을 가면 사진을 찍어야지” 포스트 이미지를 많이 업로드`
  },
  11: {
    name: '마니또',
    color: '#FBECBB',
    backgroundColor: '#C933BB',
    border: '#94546F',
    icon: Gift,
    criteria: `“너 혹시 내 마니또야?” 작성한 방명록이 많으면 획득`
  },
  12: {
    name: '민들레? 노브랜드?',
    color: '#FF9511',
    backgroundColor: '#FFFF69',
    border: '#F57043',
    icon: QuestionCircle,
    criteria: `“이번엔 새로운데 갈거지?” 생성한 기억이 많으면 획득`
  },
  13: {
    name: 'GMG',
    color: '#515F62',
    backgroundColor: '#A1EDF2',
    border: '#515F62',
    icon: Running,
    criteria: `“여기도 갔어?” 참여한 기억이 많으면 획득`
  },
  14: {
    name: '업적헌터#kill',
    color: '#0C0A09',
    backgroundColor: '#FF4758',
    border: '#0C0A09',
    icon: CupStar,
    criteria: `“모든 업적을 사냥” 공개된 모든 업적을 달성`
  },
  15: {
    name: '홈 스윗 홈',
    color: '#E7F6AF',
    backgroundColor: '#008C32',
    border: '#00C84F',
    icon: Home2,
    criteria: `“우리가 태어난 그리운 그 곳” 지도에서 특정 위치를 찾기`
  },
  16: {
    name: '13일의 금요일',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: '#000000',
    icon: Danger,
    criteria: `"이 으스스한 날에 무슨일로..." 이스터에그`
  },
  17: {
    name: '씽씽씽',
    color: '#D6E4FF',
    backgroundColor: '#0033AA',
    border: '#0033AA',
    icon: Wind,
    criteria: `오준수 曰 “씽씽씽”`
  },
  18: {
    name: '팅팅팅',
    color: '#F9F0F0',
    backgroundColor: '#F23333',
    border: '#A37171',
    icon: StarsLine,
    criteria: `오준수 曰 “팅팅팅”`
  },
  19: {
    name: '쿠로네코',
    color: '#FFF',
    backgroundColor: '#000',
    border: '#000',
    icon: Cat,
    criteria: `12반의 검은고양이`
  },
  20: {
    name: '횬딘곤듀',
    color: '#FFE8EF',
    backgroundColor: '#FF7AA1',
    border: '#94C3FD',
    icon: Health,
    criteria: `12반 영원한 공주`
  },
  21: {
    name: '귀한곳에누추한분이',
    color: '#3666A2',
    backgroundColor: '#E6F7FF',
    border: '#0050B3',
    icon: Logout2,
    criteria: `어…왔어?`
  },
  22: {
    name: '뤼전드',
    color: '#FFCC00',
    backgroundColor: '#000',
    border: '#000',
    icon: CrownStar,
    criteria: `진짜 넌…`
  },
  23: {
    name: '주피티',
    color: '#95E2C0',
    backgroundColor: '#09112B',
    border: '#0058C4',
    icon: Printer,
    criteria: `알려줘 주빈아`
  },
  24: {
    name: '신',
    color: '#F5E984',
    backgroundColor: '#433633',
    border: '#F4A73E ',
    icon: HandStars,
    criteria: `그저 갓 도영`
  },
  25: {
    name: '그녀석',
    color: '#D1D1D1',
    backgroundColor: '#818181',
    border: '#BEBEBE',
    icon: UserRounded,
    criteria: `와 대산이다`
  },
  26: {
    name: '인형',
    color: '#EB2F96',
    backgroundColor: '#FFF0F6',
    border: '#EB2F96',
    icon: PeopleNearby,
    criteria: `인형 뽑기 마스터`
  },
  27: {
    name: '닥치',
    color: '#FF4230',
    backgroundColor: '#282828',
    border: '#E9210E',
    icon: Muted,
    criteria: `쉿`
  },
  28: {
    name: 'ㅁㅇㅁㅇ',
    color: '#FFF4F7',
    backgroundColor: '#FF5F60',
    border: '#AE3A3E',
    icon: UserHandUp,
    criteria: `이거 이렇게 될 줄 모르고 만들었는데, 이게 되네`
  },
  29: {
    name: '내절친',
    color: '#E3E08B',
    backgroundColor: '#41415D',
    border: '#3A885F',
    icon: StarAngle,
    criteria: `그들이 진짜 절친이라는 것을 증명해 준다`
  },
  30: {
    name: 'GAY',
    color: '#F9F1F3',
    backgroundColor: '#C32C5C',
    border: '#F5A34D',
    icon: Hearts,
    criteria: `그들만의 끈끈하고 비밀스러운 우정을 증명해 준다`
  },
  31: {
    name: '드디어봐주는구나',
    color: '#FFFFFF',
    backgroundColor: '#498FD6',
    border: '#FBC13C',
    icon: HandShake,
    criteria: `연락 기다리고 있었어`
  },
  32: {
    name: '현지',
    color: '#5C4231',
    backgroundColor: '#FDFDFD',
    border: '#D99EA2',
    icon: StarShine,
    criteria: `현지야`
  },
  33: {
    name: '랑이와싹이',
    color: '#697F38',
    backgroundColor: '#FFFF91',
    border: '#96DB59',
    icon: Leaf,
    criteria: `여기서 이러지 말고 밖에 나가서 놀아`
  },
}
