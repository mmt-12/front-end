export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/login/signup',
  MEMORY_LIST: '/memory',
  MEMORY_DETAIL: (id: string | number) => `/memory/${id}`,
  MAP: '/map',
  CALENDAR: '/calendar',
  GUEST_BOOK: '/guest-book',
  NOTIFICATION: '/notification',
}
