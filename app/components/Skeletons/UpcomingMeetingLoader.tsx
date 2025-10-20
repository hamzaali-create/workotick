import { Skeleton } from 'antd'
import React from 'react'

export default function UpcomingMeetingLoader() {
	return (
		<div className='rounded-md bg-white mt-5 p-4 py-9 space-y-2'>
			<Skeleton.Input block active className='h-7 rounded-md' >
			</Skeleton.Input>
			<Skeleton.Input block active className='h-32 rounded-md' >
			</Skeleton.Input>
			<Skeleton.Input block active className='h-10 rounded-md' >
			</Skeleton.Input>
		</div>
	)
}
