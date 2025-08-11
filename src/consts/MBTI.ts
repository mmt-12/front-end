export type MbtiCode = 'E' | 'I' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'

export type MbtiType =
  | 'ISTJ'
  | 'ISFJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISTP'
  | 'ISFP'
  | 'INFP'
  | 'INTP'
  | 'ESTP'
  | 'ESFP'
  | 'ENFP'
  | 'ENTP'
  | 'ESTJ'
  | 'ESFJ'
  | 'ENFJ'
  | 'ENTJ'

export interface Choice {
  text: string
  code: MbtiCode
}

export interface Question {
  question: string
  choices: Choice[]
}

export const MBTI_TEST_DATA: Question[] = [
  {
    question: '{name}는(은) 회식에 참석하여 주로',
    choices: [
      { text: '점점 신이 나서 거의 끝까지 남는 편이다', code: 'E' },
      { text: '적당한 시간이 지나면 그만 끝냈으면 한다', code: 'I' },
    ],
  },
  {
    question: '{name}는(은) 주로',
    choices: [
      { text: '생각하고 나서 말한다', code: 'I' },
      { text: '말하면서 생각한다', code: 'E' },
    ],
  },
  {
    question: '{name}는(은) 남들과 연극을 함께 만든다면',
    choices: [
      { text: '주인공을 하고 싶어할 것 같다', code: 'E' },
      {
        text: '연극을 위해 무대장치나 대본을 다듬는 일을 하고 싶어할 것 같다',
        code: 'I',
      },
    ],
  },
  {
    question: '{name}는(은) 친구가 이직을 고민한다고 할 때',
    choices: [
      { text: '지금 회사의 구체적인 조건을 먼저 따져본다', code: 'S' },
      { text: '새로운 곳에서의 성장 가능성을 먼저 떠올린다', code: 'N' },
    ],
  },
  {
    question: '{name}는(은) 남을 볼 때',
    choices: [
      { text: '그 사람의 유능한 점을 본다', code: 'N' },
      { text: '그 사람이 사물을 어떻게 보는가를 본다', code: 'S' },
    ],
  },
  {
    question: '{name}는(은) 새로운 프로젝트를 할 때',
    choices: [
      { text: '전체적인 큰 그림부터 떠올릴 것 같다', code: 'N' },
      { text: '무엇부터 시작해야 할지를 먼저 생각할 것 같다', code: 'S' },
    ],
  },
  {
    question: '{name}는(은) 무엇을 결정할 때',
    choices: [
      { text: '원칙에 근거하여 판단한다', code: 'T' },
      { text: '사실에 의해 판단한다', code: 'F' },
    ],
  },
  {
    question: '{name}는 친구가 슬퍼할 때',
    choices: [
      { text: '상황을 분석하고 해결 방법을 제시한다.', code: 'T' },
      { text: '감정을 공감하며 같이 마음을 나눈다.', code: 'F' },
    ],
  },
  {
    question: '친구가 갑자기 “우리 얘기 좀 해”라고 했을 때',
    choices: [
      { text: '뭘 잘못했는지 먼저 머릿속으로 정리한다.', code: 'T' },
      { text: '마음이 먼저 쿵 내려앉고 걱정된다.', code: 'F' },
    ],
  },
  {
    question: '{name}은 새 드라마나 넷플릭스 시리즈를 볼 때',
    choices: [
      { text: '끝까지 다 볼 시간 있을지 고려하고 시작한다.', code: 'J' },
      { text: '일단 재미있어 보이면 바로 본다.', code: 'P' },
    ],
  },
  {
    question: '{name}은 사이드 프로젝트에 새로운 기능을 추가할 때 먼저',
    choices: [
      { text: '목업을 구현한다.', code: 'P' },
      { text: '테스트 코드를 작성한다.', code: 'J' },
    ],
  },
  {
    question: '{name}는(은) 여행 떠나기 전날 밤',
    choices: [
      {
        text: '짐 다 쌌고, 동선도 정리했고, 체크리스트 확인 완료.',
        code: 'J',
      },
      { text: '대충 가방 던져놓고 내일 아침에 챙기면 되지~', code: 'P' },
    ],
  },
]

export const MBTI_COLOR: Record<MbtiType, string> = {
  INFP: '#7A9EFF',
  INFJ: '#FF9F6A',
  INTP: '#A463C9',
  INTJ: '#3FA36D',
  ISFP: '#FF7FCF',
  ISFJ: '#B5D53E',
  ISTP: '#3ED3D3',
  ISTJ: '#4A90E2',
  ENFP: '#FFDD95',
  ENFJ: '#61C4B7',
  ENTP: '#FF6B35',
  ENTJ: '#9B1F60',
  ESFP: '#C074F8',
  ESFJ: '#FBBF4B',
  ESTP: '#E9DAC3',
  ESTJ: '#8F8F8F',
}

export const MBTI_MODIFIER: Record<MbtiType, string> = {
  ISTJ: '고지식한 모범생',
  ISFJ: '융통성 없는 모범생',
  INFJ: '통찰력 있는 은둔형 사색가',
  INTJ: '지식에 몰두하는 전략가',
  ISTP: '냉철한 해결사',
  ISFP: '게으른 예술가',
  INFP: '엉뚱한 몽상가',
  INTP: '이상한 분석가',
  ESTP: '거친 모험가',
  ESFP: '즉흥적인 엔터테이너',
  ENFP: '망상하는 자유인',
  ENTP: '산만한 발명가',
  ESTJ: '딱딱한 일잘러',
  ESFJ: '친목하는 인싸',
  ENFJ: '말 잘하는 호갱',
  ENTJ: '독단적인 리더',
}
