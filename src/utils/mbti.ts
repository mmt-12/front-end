import type { MbtiCode, MbtiType } from '@/consts/MBTI'

export type MbtiScore = Record<MbtiCode, number>

export function calculateMbti(score: MbtiScore) {
  const mbti = [
    score.E >= score.I ? 'E' : 'I',
    score.N >= score.S ? 'N' : 'S',
    score.T >= score.F ? 'T' : 'F',
    score.J >= score.P ? 'J' : 'P',
  ]

  return mbti.join('') as MbtiType
}
