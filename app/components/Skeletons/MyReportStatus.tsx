import { Skeleton, Space } from 'antd'

export default function MyReportStatus() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-x-5'>
			{
				Array.from({ length: 3 }).map((item, index) => (
					<div className="col-span-1 bg-white rounded-xl p-4 relative" key={`status-loader-${index}`}>
						<Space>
							<Skeleton.Button active className='h-16 rounded-md' >
							</Skeleton.Button>
							<div className='space-y-2'>
								<Skeleton.Input active className='h-6 rounded-md' >
								</Skeleton.Input>
								<Skeleton.Input active className='h-8 rounded-md' >
								</Skeleton.Input>
							</div>
						</Space>
					</div>
				))
			}
		</div >
	)
}
