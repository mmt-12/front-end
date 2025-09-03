import type { IMember } from '@/types'
import { BADGES } from '../../src/consts/BADGES'

export const MEMBERS: IMember[] = [
  {
    id: 1,
    nickname: '김지훈',
    imageUrl: '/test_images/image1.png',
    achievement: {
      id: 1,
      name: BADGES[1].name,
    },
    introduction:
      '초콜릿을 보면 참을 수 없습니다. 내 인생의 목표는 모든 종류의 초콜릿을 먹어보는 것!',
  },
  {
    id: 2,
    nickname: '박수진',
    imageUrl: 'asdas',
    achievement: {
      id: 2,
      name: BADGES[5].name,
    },
    introduction:
      '아침에 알람을 5번이나 끄는 게 특기입니다. 침대와의 이별이 가장 힘들어요.',
  },
  {
    id: 3,
    nickname: '이현우',
    imageUrl: '/test_images/image3.png',
    achievement: {
      id: 3,
      name: BADGES[8].name,
    },
    introduction: '치킨은 언제나 옳아요. 치킨 없는 세상은 상상할 수 없습니다!',
  },
  {
    id: 4,
    nickname: '최민정',
    imageUrl: '/test_images/image4.png',
    achievement: {
      id: 4,
      name: BADGES[4].name,
    },
    introduction:
      '고양이 사진을 하루에 100장씩 보는 게 취미입니다. 집사 꿈나무!',
  },
  {
    id: 5,
    nickname: '정우성',
    imageUrl: undefined,
    achievement: {
      id: 5,
      name: BADGES[5].name,
    },
    introduction:
      '피자 한 판을 혼자 다 먹은 적이 있습니다. 도전 정신은 누구에게도 뒤지지 않아요.',
  },
  {
    id: 6,
    nickname: '오세훈',
    imageUrl: '/test_images/image1.png',
    achievement: {
      id: 1,
      name: BADGES[1].name,
    },
    introduction: '비 오는 날에는 꼭 라면을 먹어야 한다고 믿는 사람입니다.',
  },
  {
    id: 7,
    nickname: '윤지아',
    imageUrl: 'asdas',
    achievement: {
      id: 2,
      name: BADGES[2].name,
    },
    introduction:
      '길거리에서 강아지 보면 무조건 인사합니다. 동물 친구들과 친해지고 싶어요.',
  },
  {
    id: 8,
    nickname: '장민수',
    imageUrl: '/test_images/image3.png',
    achievement: {
      id: 3,
      name: BADGES[8].name,
    },
    introduction: '아이스크림을 4계절 내내 먹는 아이스크림 러버입니다.',
  },
  {
    id: 9,
    nickname: '한예린',
    imageUrl: '/test_images/image4.png',
    achievement: {
      id: 4,
      name: BADGES[4].name,
    },
    introduction: '노래방에서 마이크 잡으면 2시간은 기본! 숨겨진 노래왕이에요.',
  },
  {
    id: 10,
    nickname: '서준혁',
    imageUrl: '/test_images/image5.png',
    achievement: {
      id: 5,
      name: BADGES[7].name,
    },
    introduction: '아무리 바빠도 낮잠은 꼭 챙깁니다. 낮잠 없으면 힘이 안 나요.',
  },
  {
    id: 11,
    nickname: '이태경',
    imageUrl: '/test_images/image1.png',
    achievement: {
      id: 1,
      name: BADGES[1].name,
    },
    introduction: '영화관 팝콘을 혼자 다 먹는 게 특기입니다. 팝콘 사랑꾼!',
  },
  {
    id: 12,
    nickname: '최유진',
    imageUrl: 'asdas',
    achievement: {
      id: 2,
      name: BADGES[2].name,
    },
    introduction: '식물 키우기에 도전 중인데, 아직까지 살아남은 식물이 없어요.',
  },
  {
    id: 13,
    nickname: '백승우',
    imageUrl: '/test_images/image3.png',
    achievement: {
      id: 3,
      name: BADGES[8].name,
    },
    introduction: '여행 가면 꼭 현지 음식부터 먹어봅니다. 미식가를 꿈꿔요!',
  },
  {
    id: 14,
    nickname: '정하윤',
    imageUrl: '/test_images/image4.png',
    achievement: {
      id: 4,
      name: BADGES[9].name,
    },
    introduction: '아침에 일어나면 가장 먼저 하는 일은 냉장고 확인입니다.',
  },
  {
    id: 15,
    nickname: '문지훈',
    imageUrl: '/test_images/image5.png',
    achievement: {
      id: 5,
      name: BADGES[11].name,
    },
    introduction: '웃긴 밈을 보면 하루 종일 생각나요. 밈 수집가입니다!',
  },
]
