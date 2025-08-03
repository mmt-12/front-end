export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/login/signup',
  MEMORY_LIST: '/',
  MEMORY_DETAIL: (id: string | number) => `/memory/${id}`,
  MAP: '/map',
  CALENDAR: '/calendar',
  GUEST_BOOK: '/guest-book',
  NOTIFICATION: '/notification',
}
