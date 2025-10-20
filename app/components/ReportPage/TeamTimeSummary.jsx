import React, { useCallback, useEffect } from 'react'
import TimeSummaryData from './TimeSummaryData'
import TopPerformersChart from './TopPerformerChart'
import eye from '../../assets/eye.svg'
import { Button } from 'antd'
import { useState } from 'react'
import Contribution from './Contribution'
import { useSelector } from 'react-redux'
import Api from '../../utils/Axios'
import TimeSummaryLoader from '../Skeletons/TimeSummaryLoader'
import LazyLoad from '../LazyLoad'

export default function TeamTimeSummary({ date }) {
  const [loading, setLoading] = useState(false);
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [timeLog, setTimeLog] = useState([]);
  const [projects, setProjects] = useState([]);
  const { activeOrganization } = useSelector((state) => state.auth);
  const getTimeLog = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await Api.Post(
        `/organization/${activeOrganization?.id}/team-report/time-summary`,
        {
          date: date.toISOString()
        }
      );

      setProjects(data.projects.map(item => ({
        value: item.id,
        label: item.project
      })));

      setTimeLog(data);
    } catch (error) {
      console.error('Something went wrong');
    } finally {
      setLoading(false)
    }
  }, [activeOrganization, date]);

  useEffect(() => {
    getTimeLog()
  }, [getTimeLog])

  return (
    <LazyLoad loading={loading} loader={<TimeSummaryLoader />}>
      <div className="bg-white px-5 pt-5 my-3 rounded-md">
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-lg font-semibold mt-1'>Time Summary</p>
            <Button
              type='primary'
              onClick={() => setShowContributionModal(true)}
              className='bg-primary rounded-md flex justify-center items-center gap-1 font-poppins'
              icon={<img src={eye} alt="eye-icon" />}
            >
              Contribution
            </Button>
          </div>
          <Contribution
            date={date}
            projects={projects}
            open={showContributionModal}
            onClose={() => setShowContributionModal(false)}
          />
        </div>
        <div>
        </div>

        <TimeSummaryData projects={timeLog?.projects ?? []} total={timeLog.total ?? null} />
        <p className="text-lg font-semibold mt-10">Top Performers of the day</p>
        <TopPerformersChart date={date} />
      </div>
    </LazyLoad>
  )
}
