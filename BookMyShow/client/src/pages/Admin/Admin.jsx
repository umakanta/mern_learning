import { Tabs } from 'antd'
import React from 'react'
import { Children } from 'react'
import MovieTable from "./MovieTable"
import TheaterTable from './TheaterTable'

export const Admin = () => {
  const tabItems = [
    {
      key: "movies",
      label: "Movies",
      children: <MovieTable/>
    },
    {
      key: "theater",
      label: "Theater",
      children: <TheaterTable />
    }
  ]

  return (
    <div style={{margin: "20px", padding: "10px"}}>
      <h1> Admin Dashboard</h1>
      <Tabs defaultActiveKey='' items={tabItems} />
    </div>
  )
}
