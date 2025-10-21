
import Skeleton from "antd/es/skeleton";
import React from 'react'

export default function TimeSummaryLoader() {
  return (
    <div className='bg-white p-5 my-3 rounded-md space-y-2'>
      <div className="space-y-2">
        <Skeleton.Input block active className='h-7 rounded-md' >
        </Skeleton.Input>
        {
          Array.from({ length: 5 }).map((item, index) => (
            <div className='flex justify-between' key={`project-log-${index}`}>
              <Skeleton.Input active className='h-8 rounded-md' >
              </Skeleton.Input>
              <Skeleton.Input active className='h-8 rounded-md' >
              </Skeleton.Input>
            </div>
          ))
        }
        <Skeleton.Input block active className='h-7 rounded-md' >
        </Skeleton.Input>
      </div>
      <div className="space-y-3">
        <Skeleton.Input block active className='h-40 block rounded-md' >
        </Skeleton.Input>
      </div>
    </div>
  )
}
