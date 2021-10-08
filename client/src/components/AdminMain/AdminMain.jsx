import React from 'react'

export const AdminMain = ({ data }) => {
  return (
    <div>
      {data.map(item => <div>{JSON.stringify(item)}</div>)}
    </div>
  )
}
