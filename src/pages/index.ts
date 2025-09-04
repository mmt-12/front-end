import { lazy } from 'react'

import LoginPage from '@/pages/auth/LoginPage'
import MemoryListPage from '@/pages/memory/MemoryListPage'
import LandingPage from './auth/LandingPage'
import TestPage from './TestPage'

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
  NotificationPage,
  SignupPage,
  TestPage,
}
