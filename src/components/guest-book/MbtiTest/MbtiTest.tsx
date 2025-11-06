import { useState } from 'react'
import { css } from '@emotion/react'

import { useCreateMbtiTest } from '@/api/guestbook'
import MbtiChart from '@/components/guest-book/MbtiChart'
import {
  MBTI_COLOR,
  MBTI_MODIFIER,
  MBTI_TEST_DATA,
  type MbtiCode,
  type MbtiType,
} from '@/consts/MBTI'
import { theme } from '@/styles/theme'
import { calculateMbti, type MbtiScore } from '@/utils/mbti'
import WavyButton from '../WavyButton/WavyButton'

interface Props {
  isMyPage: boolean
  name: string
  communityId: number
  associateId: number
}

export default function MbtiTest({
  isMyPage,
  name,
  communityId,
  associateId,
}: Props) {
  const [step, setStep] = useState<'chart' | 'start' | 'quiz' | 'result'>(
    'chart',
  )
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [scores, setScores] = useState<MbtiScore>({
    E: 0,
    I: 0,
    N: 0,
    S: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  })
  const { mutate: createMbtiTest, isPending } = useCreateMbtiTest(
    communityId,
    associateId,
  )

  const handleAnswer = (code: MbtiCode) => {
    setScores(prev => ({
      ...prev,
      [code]: (prev[code] ?? 0) + 1,
    }))
    if (currentQuestionIdx + 1 < MBTI_TEST_DATA.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    } else {
      setStep('result')
    }
  }

  const handleSubmit = () => {
    if (isPending) return

    const mbti = calculateMbti(scores)
    createMbtiTest({ mbti })
    setCurrentQuestionIdx(0)
    setStep('chart')
  }

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        {step === 'chart' && (
          <MbtiChart communityId={communityId} associateId={associateId} />
        )}
        {step === 'start' && (
          <>
            <p>
              <em>{name}</em>
              {` MBTI 검사를 시작합니다.\n당신이 본 `}
              <em>{name}</em>
              {`의 모습을 가.감.없.이 알려주세요!`}
            </p>
            <p>
              <em>{`총 문제: ${MBTI_TEST_DATA.length}개`}</em>
            </p>
          </>
        )}
        {step === 'quiz' && (
          <div css={quizStyle}>
            <p>{`${currentQuestionIdx + 1}/${MBTI_TEST_DATA.length}`}</p>
            <p css={questionStyle}>
              {MBTI_TEST_DATA[currentQuestionIdx].question.replace(
                '{name}',
                name,
              )}
            </p>
            <p css={{ height: 16 }}></p>
          </div>
        )}
        {step === 'result' && (
          <>
            {(() => {
              const mbti = calculateMbti(scores)
              return (
                <div css={resultStyle(mbti)}>
                  <p>{`당신이 바라본 ${name}의 MBTI는`}</p>
                  <p>{MBTI_MODIFIER[mbti]}</p>
                  <p>{mbti}</p>
                </div>
              )
            })()}
          </>
        )}
      </div>
      <div css={buttonContainerStyle}>
        {step === 'chart' && !isMyPage && (
          <WavyButton
            label={`${name} MBTI 검사하러 가기`}
            onClick={() => setStep('start')}
          />
        )}
        {step === 'start' && (
          <WavyButton label='시작' onClick={() => setStep('quiz')} />
        )}
        {step === 'quiz' && (
          <>
            {MBTI_TEST_DATA[currentQuestionIdx].choices.map(choice => (
              <WavyButton
                isFullWidth
                key={choice.text}
                label={choice.text}
                onClick={() => handleAnswer(choice.code)}
              />
            ))}
          </>
        )}
        {step === 'result' && (
          <WavyButton label='완료' onClick={handleSubmit} />
        )}
      </div>
    </div>
  )
}

const containerStyle = css({
  width: '100%',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
})

const buttonContainerStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
})

const contentStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'pre-line',
  textAlign: 'center',
  gap: 10,
  flex: 1,
  em: {
    fontWeight: 900,
    fontStyle: 'normal',
  },
})

const quizStyle = css({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 800,
  gap: 12,
})

const questionStyle = css({
  fontSize: 20,
  wordBreak: 'keep-all',
  lineHeight: 1.4,
})

const resultStyle = (mbti: MbtiType) =>
  css({
    lineHeight: 1.3,
    '& p:nth-of-type(1)': {
      fontSize: 18,
      marginBottom: 8,
    },
    '& p:nth-of-type(2)': {
      fontSize: 20,
      fontWeight: 900,
    },
    '& p:nth-of-type(3)': {
      fontSize: 36,
      fontFamily: 'PressStart2P',
      fontWeight: 900,
      color: MBTI_COLOR[mbti],
      WebkitTextStroke: '1px ' + theme.colors.stone[700],
    },
  })
