import { Modal, Select, Empty } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import PieChartContainer from './PieChart';
import { useSelector } from 'react-redux';
import Api from '../../utils/Axios';
import dayjs from 'dayjs';

export default function Contribution({ projects, date, open, onClose }) {


  const { activeOrganization } = useSelector((state) => state.auth);
  const [contributions, setContributions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [totalTime, setTotalTime] = useState(0);

  const getContributions = useCallback(async () => {
    try {
      const { data } = await Api.Post(`organization/${activeOrganization.id}/team-report/time-summary/contribution`, {
        project_id: selectedProject,
        date
      });

      setTotalTime(data.total)
      setContributions(data.contributions)
    } catch (error) {
      console.error(error);
    }
  }, [activeOrganization, selectedProject, date])

  useEffect(() => {
    getContributions()
  }, [getContributions])

  return (
    <div>
      <Modal
        open={open}
        onCancel={onClose}
        className='font-poppins'
        footer={false}
        width={1000}
        centered
      >
        <div className='grid grid-cols-3  pb-3  mt-8 items-center justify-between mx-5'>
          <h2 className='col-span-3 lg:col-span-1 pb-3 text-lg font-semibold w-full'>Contribution by project</h2>
          <Select
            placeholder="Select Project"
            style={{ height: 40 }}
            onChange={(value) => {
              setSelectedProject(value)
            }}
            className='col-span-3 lg:col-span-1 '
            options={projects}
            allowClear
            notFoundContent = {<Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Project Found"
            />}
          />
          <div className='col-span-3 lg:col-span-1 py-3  items-end flex flex-col'>
            <h2 className='text-lg font-semibold'>Today, {dayjs(date).format('DD, MMMM')}</h2>
            <div className='flex items-center gap-2 mt-3'>
              <p>Total Hours :</p>
              <p className="text-[#32186F] bg-[#9854CB] bg-opacity-30 rounded-full px-3 font-medium text-md">{totalTime}</p>
            </div>
          </div>

        </div>
        <PieChartContainer data={contributions} />
      </Modal>
    </div>
  )
}
