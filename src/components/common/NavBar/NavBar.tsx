import { ROUTES } from '@/routes/ROUTES'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import type { JSX } from '@emotion/react/jsx-runtime'
import {
  AddCircle,
  BookBookmark,
  Box,
  CalendarMinimalistic,
  PointOnMap,
  SmileSquare,
  Soundwave,
  UsersGroupRounded,
} from '@solar-icons/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import BottomDrawer from '../BottomDrawer'
import Button from '../Button'
import { theme } from '@/styles/theme'

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
      <div css={navBarStyle}>
        <Navigation
          title='기억'
          icon={<Box weight='Bold' size={24} />}
          to={ROUTES.MEMORY_LIST}
        />
        <Navigation
          title='지도'
          icon={<PointOnMap weight='Bold' size={24} />}
          to={ROUTES.MAP}
        />
        <button css={addButtonStyle} onClick={() => setIsDrawerOpen(true)}>
          <AddCircle size={40} />
        </button>
        <Navigation
          title='달력'
          icon={<CalendarMinimalistic weight='Bold' size={24} />}
          to={ROUTES.CALENDAR}
        />
        <Navigation
          title='방명록'
          icon={<BookBookmark weight='Bold' size={24} />}
          to={ROUTES.GUEST_BOOK}
        />
      </div>
      <BottomDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: theme.stone[800],
          }}
        >
          생성하기
        </span>
        <div css={contentStyle}>
          <Button
            type='primary'
            size='md'
            label='기억'
            icon={<Box weight='Bold' size={28} />}
          />
          <Button
            type='secondary'
            size='md'
            label='이모티콘'
            icon={<SmileSquare weight='Bold' size={28} />}
          />
          <Button
            type='disabled'
            size='md'
            label='약속'
            icon={<UsersGroupRounded weight='Bold' size={28} />}
          />
          <Button
            type='secondary'
            size='md'
            label='보이스'
            icon={<Soundwave weight='Bold' size={28} />}
          />
        </div>
      </BottomDrawer>
    </>
  )
}

interface INavigationProps {
  title: string
  icon: JSX.Element
  to: string
}

function Navigation(props: INavigationProps) {
  return (
    <NavLink to={props.to} css={{ width: '100%' }}>
      {({ isActive }) => (
        <div css={navLinkStyle}>
          <span className={`icon ${isActive && 'active'}`}>{props.icon}</span>
          <span className={`title ${isActive && 'active'}`}>{props.title}</span>
        </div>
      )}
    </NavLink>
  )
}

const navBarStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: theme.maxWidth,
    display: 'flex',
    alignItems: 'center',
    backdropFilter: 'blur(3px)',
    backgroundColor: theme.whiteBlur,
    height: '56px',
  })

const navLinkStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '12px',
    gap: '2px',
    padding: '8px',
    'span.icon': {
      color: theme.stone[300],
    },
    'span.title': {
      color: theme.stone[400],
    },
    'span.icon.active': {
      color: theme.stone[600],
    },
    'span.title.active': {
      color: theme.stone[800],
    },
  })

const addButtonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    border: 'none',
    color: theme.sky[500],
    backgroundColor: 'transparent',
  })

const contentStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  width: '100%',
})
