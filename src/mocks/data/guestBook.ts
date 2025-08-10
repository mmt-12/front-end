export const PROFILE = {
  nickname: '멤버1',
  achievement: {
    id: 1,
    name: '시간빌게이츠',
  },
  imagePath: '/test_images/image1.png',
  introduction: '짧은 설명입니다. 짧은 설명입니다. 짧은 설명입니다.',
  birthday: '2000-01-01T00:30:00',
} as const

export const ACHIEVEMENTS = [
  {
    id: 2,
    name: '관상가',
    condition: '모든 그룹원의 MBTI 테스트 참여',
    isObtained: true,
    type: 'OPEN',
  },
  {
    id: 3,
    name: '다중인격',
    condition: '남이 본 MBTI가 6개 이상',
    isObtained: true,
    type: 'OPEN',
  },
  {
    id: 4,
    name: 'FFFFFF',
    condition: 'F가 들어간 모든 MBTI 획득',
    isObtained: false,
    type: 'RESTRICTED',
  },
  {
    id: 5,
    name: 'T발 C야?',
    condition: 'T가 들어간 모든 MBTI 획득',
    isObtained: true,
    type: 'RESTRICTED',
  },
  {
    id: 13,
    name: 'GMG',
    condition: '참가한 기억 12개 이상',
    isObtained: true,
    type: 'OPEN',
  },
  {
    id: 18,
    name: '씽씽씽',
    condition: '이모티콘 등록 시 “씽씽씽” 이름으로 등록',
    isObtained: true,
    type: 'HIDDEN',
  },
] as const

export const MBTI = {
  INFP: 0,
  INFJ: 0,
  INTP: 4,
  INTJ: 5,
  ISFP: 0,
  ISFJ: 0,
  ISTP: 3,
  ISTJ: 10,
  ENFP: 0,
  ENFJ: 0,
  ENTP: 2,
  ENTJ: 1,
  ESFP: 0,
  ESFJ: 0,
  ESTP: 0,
  ESTJ: 0,
} as const
