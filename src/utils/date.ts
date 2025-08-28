export const dateToId = (date: Date): string => {
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const formatDateTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

export const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const start = formatDate(startDate)
  const end = endDate ? formatDate(endDate) : start
  return start === end ? start : `${start} - ${end}`
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  // if future date
  if (diffMs < 0) return date.toLocaleString()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)

  if (diffMinutes < 1) {
    return '방금 전'
  }
  if (diffHours < 1) {
    return `${diffMinutes}분 전`
  }
  if (diffDays < 1) {
    return `${diffHours}시간 전`
  }
  if (diffMonths < 1) {
    return `${diffDays}일 전`
  }

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
