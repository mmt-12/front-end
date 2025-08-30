import { lazy } from 'react'

import LoginPage from '@/pages/LoginPage'
import MemoryListPage from '@/pages/memory/MemoryListPage'

const CalendarPage = lazy(() => import('@/pages/CalendarPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const ProfileImageRegisterPage = lazy(
  () => import('@/pages/guest-book/ProfileImageRegisterPage'),
)
const EditProfilePage = lazy(() => import('@/pages/guest-book/ProfileEditPage'))
const GuestBookPage = lazy(() => import('@/pages/guest-book/GuestBookPage'))
const MemberListPage = lazy(() => import('@/pages/guest-book/MemberListPage'))
const MapPage = lazy(() => import('@/pages/MapPage'))
const MemoryDetailPage = lazy(() => import('@/pages/memory/MemoryDetailPage'))
const MemoryRegisterPage = lazy(
  () => import('@/pages/memory/MemoryRegisterPage'),
)
const PostDetailPage = lazy(() => import('@/pages/memory/PostDetailPage'))
const PostRegisterPage = lazy(() => import('@/pages/memory/PostRegisterPage'))
const NotificationPage = lazy(() => import('@/pages/NotificationPage'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))

export {
  CalendarPage,
  ErrorPage,
  ProfileImageRegisterPage,
  EditProfilePage,
  GuestBookPage,
  MemberListPage,
  LoginPage,
  MapPage,
  MemoryDetailPage,
  MemoryListPage,
  MemoryRegisterPage,
  PostDetailPage,
  PostRegisterPage,
  NotificationPage,
  SignupPage,
}
