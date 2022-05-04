import React from 'react'
import './account.scss'
import { Tab, Tabs } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext/AuthContext'
import Loader from 'react-ts-loaders'

const Account: React.FC = () => {
  const location = useLocation()

  const tabs = ['/account', '/account/user', '/account/password']

  const { user, loading } = useAuth()

  return (
    <section className="account">
      <div className="container">
        <div className="account-content">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={location.pathname}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Мои данные" value={tabs[0]} component={Link} to={tabs[0]} />
            <Tab
              value={tabs[1]}
              label="Смена данных"
              component={Link}
              to={tabs[1]}
            />
            <Tab label="Смена пароля" value={tabs[2]} component={Link} to={tabs[2]} />
          </Tabs>
          {loading ?
            <Loader type="dualring" size={50} /> :
            <Outlet context={{ user }} />
          }
        </div>
      </div>
    </section>
  )
}

export default Account
