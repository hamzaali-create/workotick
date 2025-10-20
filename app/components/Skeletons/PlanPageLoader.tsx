import { Skeleton } from 'antd'

export default function PlanPageLoader() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-5'>
      {
        Array.from({ length: 3 }).map((item, index) => (
          <div className="col-span-1 bg-white rounded-xl p-4 relative" key={`status-loader-${index}`}>
            <div className="space-y-2">
              <Skeleton.Button active className='h-20 w-20 rounded-full' >
              </Skeleton.Button>
              <Skeleton.Input active className='h-8 rounded-md block w-full' >
              </Skeleton.Input>
              <Skeleton.Input active className='h-6 rounded-md block' >
              </Skeleton.Input>
            </div>
            <ul className='space-y-2 mt-5'>
              {
                Array.from({ length: 8 }).map((_, index) => (
                  <li key={`feature-${index}`} className='flex gap-x-1 items-center'>
                    <Skeleton.Avatar active className='h-10 rounded-md'>
                    </Skeleton.Avatar>
                    <Skeleton.Input active className='h-6 rounded-md w-full'>
                    </Skeleton.Input>
                  </li>
                ))
              }
            </ul>
            <div className='mt-5 w-[290px]'>
              <Skeleton.Button active className='h-10 rounded-md w-full' >
              </Skeleton.Button>
            </div>
          </div>
        ))
      }
    </div >
  )
}
