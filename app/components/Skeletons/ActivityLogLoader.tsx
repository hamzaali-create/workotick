import { Skeleton } from 'antd'
import React from 'react'

export default function ActivityLogLoader() {
  return (
    <div className="bg-white px-5 pt-5 my-3 rounded-md py-4">
      <Skeleton.Input block active className='h-7 rounded-md' >
      </Skeleton.Input>
      <div className="grid grid-cols-2 mt-3 gap-2">
        {
          Array.from({ length: 5 }).map((item, index) => (
            <div className="col-span-1  rounded-md" key={`activity-log-${index}`}>
              <Skeleton.Input block active className='h-20 rounded-md' >
              </Skeleton.Input>
            </div>
          ))
        }
      </div>
    </div>
  )
}
