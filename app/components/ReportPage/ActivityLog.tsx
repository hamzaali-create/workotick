import React, { useCallback, useEffect, useState } from 'react';
import Api from '../../utils/Axios';
import { useSelector } from 'react-redux';
import { getFormattedTimestamp } from '../../utils/helpers';
import ActivityLogLoader from '../Skeletons/ActivityLogLoader';
import LazyLoad from '../LazyLoad';

export default function ActivityLog({ date }) {

  const [loading, setLoading] = useState(false);
  const { activeOrganization } = useSelector((state) => state.auth);
  const [logs, setLogs] = useState({});

  const getTimeLogs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.Post(`/organization/${activeOrganization?.id}/my-report/activity`, {
        date: date.toISOString()
      })
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    getTimeLogs()
  }, [getTimeLogs])

  return (
    <LazyLoad loading={loading} loader={<ActivityLogLoader />}>
      <div className="bg-white px-5 pt-5 my-3 rounded-md py-4 flex-grow">
        <p className="text-xl font-medium mt-1">
          Activity log
        </p>
        <div className='grid grid-cols-2 gap-x-2 xl:gap-x-2 gap-y-5 rounded-md my-4'>
          <div className='col-span-1 p-2 xl:p-3 bg-[#F3F3F3] rounded-md'>
            <p className='text-gray-500 font-semibold xl:my-2 capitalize'>Clock In</p>
            <p className='font-bold  xl:text-xl text-[#263238]'>{getFormattedTimestamp(logs.clock_in, activeOrganization?.timezone, 'hh:mm A')}</p>
          </div>
          <div className='col-span-1 p-2 xl:p-3 bg-[#F3F3F3] rounded-md'>
            <p className='text-gray-500 font-semibold xl:my-2 capitalize'>Clock Out</p>
            <p className='font-bold  xl:text-xl text-[#263238]'>{getFormattedTimestamp(logs.clock_out, activeOrganization?.timezone, 'hh:mm A')}</p>
          </div>
          {
            Object.keys(logs).filter(key => !['clock_in', 'clock_out'].includes(key)).map((key) => (
              <div className='col-span-1 p-2 xl:p-3 bg-[#F3F3F3] rounded-md' key={key}>
                {/* <p className='text-gray-500 font-semibold xl:my-2 capitalize'>{key == 'log_time' ? key.replace('_', ' ').split(' ').reverse().join(' ').replace('log', 'logged') : key.replace('_', ' ')}</p> */}
                <p className='text-gray-500 font-semibold xl:my-2 capitalize'>
  {key === 'log_time' ? 'Logged Time' : key.replace('_', ' ')}
</p>
                <p className='font-bold  xl:text-xl text-[#263238]'>{logs[key]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </LazyLoad>
  )
}
