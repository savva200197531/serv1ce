import React, { useEffect, useState } from 'react'
import './orders.scss'
import { ref } from '@firebase/database'
import { db } from '../../firebase-config'
import { onValue } from 'firebase/database'
import { Order } from '../../types/orders'
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-ts-loaders'
import OrderLayout from './components/OrderLayout'

const Orders = () => {
  const commentsRef = () => ref(db, 'orders')

  const [search, setSearch] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const filterOrders = () => {
    setFilteredOrders(orders.filter(order => Object.values(order).filter(item =>
      item?.toLowerCase().includes(search.trim().toLowerCase())).length,
    ))
  }

  const setValues = (value: Order[]) => {
    setOrders(value)
    setFilteredOrders(value)
  }

  const watchOrders = () => {
    setLoading(true)

    onValue(commentsRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setValues([])
        return setLoading(false)
      }
      const value = snapshot.val()

      setValues(Object.keys(value).map(key => ({
        id: key,
        ...value[key],
      })).reverse())

      setLoading(false)
    })
  }

  useEffect(() => {
    filterOrders()
  }, [search])

  useEffect(() => {
    watchOrders()
  }, [])

  return (
    <section className="orders">
      <div className="container">
        <div className="orders-content">
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="search">Поиск</InputLabel>
            <Input
              id="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              endAdornment={
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faMagnifyingGlass as any} size="sm"/>
                </InputAdornment>
              }
            />
          </FormControl>

          <div className="orders-list">
            {loading ?
              <Loader type="dualring" size={50}/> :
            filteredOrders.length ?
              filteredOrders.map(order => <OrderLayout order={order} key={order.id} />) :
              <div className="tea-c">Ничего не найдено</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders
