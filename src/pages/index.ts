import { lazy } from 'react'

import LoginPage from '@/pages/auth/LoginPage'
import LandingPage from './auth/LandingPage'
import TestPage from './TestPage'
import GuestBookPage from '@/pages/guest-book/GuestBookPage'

const CalendarPage = lazy(() => import('@/pages/CalendarPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const ProfileImageRegisterPage = lazy(
  () => import('@/pages/guest-book/ProfileImageRegisterPage'),
)
const EditProfilePage = lazy(() => import('@/pages/guest-book/ProfileEditPage'))
const MapPage = lazy(() => import('@/pages/MapPage'))
const MemoryDetailPage = lazy(() => import('@/pages/memory/MemoryDetailPage'))
const MemberListPage = lazy(() => import('@/pages/guest-book/MemberListPage'))
const MemoryListPage = lazy(() => import('@/pages/memory/MemoryListPage'))
const MemoryRegisterPage = lazy(
  () => import('@/pages/memory/MemoryRegisterPage'),
)
const PostDetailPage = lazy(() => import('@/pages/post/PostDetailPage'))
const PostRegisterPage = lazy(() => import('@/pages/post/PostRegisterPage'))
const PostEditPage = lazy(() => import('@/pages/post/PostEditPage'))
const NotificationPage = lazy(() => import('@/pages/NotificationPage'))
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'))

export {
  CalendarPage,
  ErrorPage,
  ProfileImageRegisterPage,
  EditProfilePage,
  GuestBookPage,
  MemberListPage,
  LandingPage,
  LoginPage,
  MapPage,
  MemoryDetailPage,
  MemoryListPage,
  MemoryRegisterPage,
  PostDetailPage,
  PostRegisterPage,
  PostEditPage,
  NotificationPage,
  SignupPage,
  TestPage,
}
