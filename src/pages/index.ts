import LandingPage from './auth/LandingPage'
import TestPage from './TestPage'

import CalendarPage from '@/pages/CalendarPage'
import ErrorPage from '@/pages/ErrorPage'
import EditProfilePage from '@/pages/guest-book/ProfileEditPage'

import EntrancePage from '@/pages/auth/EntrancePage'
import MapPage from '@/pages/MapPage'

import MemoryDetailPage from '@/pages/memory/MemoryDetailPage'
import MemberListPage from '@/pages/guest-book/MemberListPage'
import MemoryListPage from '@/pages/memory/MemoryListPage'
import MemoryRegisterPage from '@/pages/memory/MemoryRegisterPage'
import MemoryEditPage from '@/pages/memory/MemoryEditPage'

import PostDetailPage from '@/pages/post/PostDetailPage'
import PostRegisterPage from '@/pages/post/PostRegisterPage'
import PostEditPage from '@/pages/post/PostEditPage'
import ProfileImageRegisterPage from '@/pages/guest-book/ProfileImageRegisterPage'

import NotificationPage from '@/pages/NotificationPage'
import SocialSignupPage from '@/pages/auth/SocialSignupPage'
import { lazy } from 'react'

const GuestBookPage = lazy(() => import('@/pages/guest-book/GuestBookPage'))

export {
  CalendarPage,
  ErrorPage,
  ProfileImageRegisterPage,
  EditProfilePage,
  GuestBookPage,
  MemberListPage,
  LandingPage,
  EntrancePage,
  MapPage,
  MemoryDetailPage,
  MemoryEditPage,
  MemoryListPage,
  MemoryRegisterPage,
  PostDetailPage,
  PostRegisterPage,
  PostEditPage,
  NotificationPage,
  SocialSignupPage,
  TestPage,
}
