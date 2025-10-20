import { Skeleton, Space } from 'antd'
import RecentActivities from './RecentActivities'

export default function TImesheetDrawerLoader() {
	return (
		<>
			<Space className='justify-between w-full'>
				<Skeleton.Button active className='h-12 rounded-md w-10 mr-10' >
				</Skeleton.Button>
				<Space align='center' className=' justify-between w-full'>
					<Skeleton.Input active className='h-12 rounded-md' >
					</Skeleton.Input>
					<Skeleton.Input active className='h-12 rounded-md' >
					</Skeleton.Input>
					<Skeleton.Input active className='h-12 rounded-md' >
					</Skeleton.Input>
				</Space>
			</Space>
			<RecentActivities cards={6} />
		</>
	)
}
