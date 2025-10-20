import { Avatar } from 'antd'
import React from 'react'

export default function GroupedAvatar({users}) {

  return (
    <div>
    {users && (
      <>
        {users.length === 1 && (
          <div className='mt-6'>
            <Avatar src={users[0]?.avatar} className='w-10 h-10 object-cover' />
          </div>
        )}
        {users.length > 1 && (
          <div className='mt-6 '>
            <Avatar.Group
              maxCount={2}
              maxPopoverTrigger='click'
              size='default'
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                cursor: 'pointer',
              }}
            >
              {users.map((item, index) => (
                <Avatar key={index} src={item?.avatar} className='w-10 h-10 object-cover' />
              ))}
            </Avatar.Group >
          </div>
        )}
      </>
    )}
  </div>
  )
}
