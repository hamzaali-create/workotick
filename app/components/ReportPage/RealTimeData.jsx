import React from 'react'
import Member from './Member'

export default function RealTimeData({data}) {
  return (
    <div className='grid grid-cols-4 md:gap-2'>
      {data.map((member) => (
        <Member member={member} />
      ))}
    </div>
  )
}
