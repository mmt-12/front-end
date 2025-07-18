export const BADGES: { [name: string]: IBadge } = {
  프로참석러: {
    name: '프로참석러',
    color: '#f0f',
    backgroundColor: '#323',
    border: '#f00',
  },
}

interface IBadge {
  name: string
  color: string
  backgroundColor: string
  border: string
}
