import { Skeleton, Space } from 'antd'
import React from 'react'

export default function ScreenshotsLoader({ cards = 3 }) {
  return (
    <div className='rounded bg-white'>
      <div className="grid grid-cols-3 gap-3">
        {
          Array.from({ length: cards }).map((item, index) => (
            <div className="rounded-md col-span-3 md:col-span-1" key={`status-loader-${index}`}>
              <Space className='my-3'>
                <Skeleton.Avatar active>
                </Skeleton.Avatar>
                <Skeleton.Input active className='h-6 rounded-md'>
                </Skeleton.Input>
              </Space>
              <div className="space-y-2">
                <Skeleton.Button block active className='h-32 rounded-md' >
                </Skeleton.Button>
                <Skeleton.Input block active className='h-6 rounded-md'>
                </Skeleton.Input>
                <Skeleton.Input block active className='h-4 rounded-md mt-1'>
                </Skeleton.Input>
                <Skeleton.Input block active className='h-4 rounded-md'>
                </Skeleton.Input>
                <Skeleton.Input block active className='h-4 rounded-md'>
                </Skeleton.Input>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  )
}
