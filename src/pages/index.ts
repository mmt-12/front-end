import { lazy } from 'react'

import LoginPage from '@/pages/LoginPage'
import MemoryListPage from '@/pages/memory/MemoryListPage'

const CalendarPage = lazy(() => import('@/pages/CalendarPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const AddProfileImagePage = lazy(
  () => import('@/pages/guest-book/AddProfileImagePage'),
)
const EditProfilePage = lazy(() => import('@/pages/guest-book/EditProfilePage'))
const GuestBookPage = lazy(() => import('@/pages/guest-book/GuestBookPage'))
const MemberPage = lazy(() => import('@/pages/guest-book/MemberPage'))
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
  AddProfileImagePage,
  EditProfilePage,
  GuestBookPage,
  MemberPage,
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
