import type { IVoice } from '@/types/reaction'

export const voices: IVoice[] = [
  {
    id: 1,
    url: '/test_voices/voice1.mp3',
    content: '하.하.하.하.하.',
    amount: 12,
    iReacted: true,
    name: 'hahaha',
  },
  {
    id: 2,
    url: '/test_voices/voice2.mp3',
    content: '뭐라는거야~',
    amount: 12,
    name: 'mworana',
  },
  {
    id: 3,
    url: '/test_voices/voice3.mp3',
    content: '인지용~?',
    amount: 12,
    name: 'injiyong',
  },
]

export const emojies = [
  {
    id: 10000,
    url: '/test_images/image1.png',
    amount: 15,
    iReacted: true,
    name: 'like',
  },
  { id: 20000, url: '/test_images/image2.png', amount: 15, name: 'love' },
  {
    id: 30000,
    url: '/test_images/image1.png',
    amount: 14,
    iReacted: true,
    name: 'haha',
  },
  {
    id: 40000,
    url: '/test_images/image1.png',
    amount: 13,
    iReacted: true,
    name: 'sad',
  },
  { id: 50000, url: '/test_images/image2.png', amount: 11, name: 'angry' },
  { id: 60000, url: '/test_images/image1.png', amount: 10, name: 'surprised' },
  { id: 70000, url: '/test_images/image1.png', amount: 12, name: 'neutral' },
  { id: 110000, url: '/test_images/image3.png', amount: 5, name: 'confused' },
]
