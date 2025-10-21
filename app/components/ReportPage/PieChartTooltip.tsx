import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import rotate from '../../assets/rotate.png';
import { getFormattedTimestamp } from '@/utils/helpers';


const PeiChartTooltip = ({ contributor, timezone = 'utc' }) => {

  return (
    <div className='flex p-1 bg-white'>
      <Badge
        offset={["-10%", "80%"]}
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#6CD818"
        }}
        dot="true"
      >
        <Avatar
          src={contributor.avatar}
          size={50}
          shape="circle"
          icon={<UserOutlined />}
          style={{ borderRadius: "30px", marginTop: "5px" }}
        />
      </Badge>
      <div className='p-2 text-black'>
        <h3 className='font-semibold py-1 text-sm'>{contributor?.name}</h3>
        {/* <p className="text-[#32186F] bg-[#9854CB] bg-opacity-30 w-fit rounded-sm px-1 my-1 font-medium text-xs">Project Workotic</p> */}
        <div className='flex justify-between'>
          <p className='text-xs'>Date:</p>
          <p className='text-xs'>{getFormattedTimestamp(dayjs().toISOString(), timezone, 'YYYY/MM/DD')}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs mr-1'>Logged Time:</p>
          <p className='text-xs'>{contributor?.time_logged}</p>
        </div>
      </div>
      <div>
        <img src={rotate} alt="" className='p-4 w-24' />
      </div>
    </div>
  );
};

export default PeiChartTooltip;
