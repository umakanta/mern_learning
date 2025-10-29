import { Tabs } from 'antd'
import React from 'react'
import TheaterList from './TheaterList';

function Partner() {

  const items = [
    {
      key: "theaters",
      label: "Theaters",
      children: <TheaterList/>
    },
  ];
  return (
    <div style={{margin: "20px", padding: "10px"}}>
      <h1>Partner Page</h1>
      <Tabs defaultActiveKey='theaters' items={items} />
    </div>
  )
}

export default Partner