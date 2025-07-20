import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import type { JSX } from '@emotion/react/jsx-runtime'
import {
  AddCircle,
  BookBookmark,
  Box,
  CalendarMinimalistic,
  PointOnMap,
} from '@solar-icons/react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div css={navBarStyle}>
      <Navigation
        title='기억'
        icon={<Box weight='Bold' size={24} />}
        to='/memories'
      />
      <Navigation
        title='지도'
        icon={<PointOnMap weight='Bold' size={24} />}
        to='/map'
      />
      <button css={addButtonStyle}>
        <AddCircle size={40} />
      </button>
      <Navigation
        title='달력'
        icon={<CalendarMinimalistic weight='Bold' size={24} />}
        to='/calendar'
      />
      <Navigation
        title='방명록'
        icon={<BookBookmark weight='Bold' size={24} />}
        to='/guest-book'
      />
    </div>
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

const navBarStyle = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
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
