import React, { useCallback, useEffect, useState } from "react";
import { Table , Empty, Tooltip } from "antd";
import { useSelector } from "react-redux";
import Api from "../../utils/Axios";
import { getFormattedTimestamp } from "../../utils/helpers";
import { sortTime } from '../../utils/sortTime';


// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === "Disabled User",
//     // Column configuration not to be checked
//     name: record.name,
//   }),
// };
const TeamReportTable = ({ date }) => {

  const { activeOrganization } = useSelector((state) => state.auth);
  const [records, setRecords] = useState([]);
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes; // Convert time to minutes
  };
  const columns = [
    {
      title: "Member",
      dataIndex: "username",
      render: (text) => (
        <Tooltip title={text} overlayStyle={{ maxWidth: 300 }}>
          <span className="cursor-pointer">
            {text.length > 20 ? text.substring(0, 17) + "..." : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className='flex items-center gap-1'>
          <span className='ml-2'>Clock-in</span>
        </div>
      ),
      dataIndex: "clock_in",
      sorter: (a, b) => new Date(a.clock_in) - new Date(b.clock_in),
      render: (text) => getFormattedTimestamp(text, activeOrganization.timezone, 'hh:mm A')
    },
    {
      title: (
        <div className='flex items-center gap-1'>
          <span className='ml-2'>Active Time</span>
        </div>
      ),
      dataIndex: "active_time",
       sorter: sortTime("active_time"),
    },
    {
      title: (
        <div className='flex items-center gap-1'>
          <span className='ml-2'>Logged Time</span>
        </div>
      ),
      dataIndex: "logged_time",
      sorter: sortTime("logged_time"),
    },
    {
      title: "Clock out",
      dataIndex: "clock_out",
      sorter: (a, b) => new Date(a.clock_in) - new Date(b.clock_in),
      render: (text) => getFormattedTimestamp(text, activeOrganization.timezone, 'hh:mm A')
    },
    {
      title: (
        <div className='flex items-center gap-1'>
          <span className='ml-2'>Remaing-Time (hrs)</span>
        </div>
      ),
       sorter: (a, b) => {
        const remainingTimeA = a.remaining_time ?? "00:00"; // Use 0 if remaining_time is undefined
        const remainingTimeB = b.remaining_time ?? "00:00"; // Use 0 if remaining_time is undefined
        const overtimeA = a.overtime ?? "00:00"; // Use 0 if overtime is undefined
        const overtimeB = b.overtime ?? "00:00"; // Use 0 if overtime is undefined

        // Compare overtime values first
        if (overtimeA !== overtimeB) {
          return parseTime(overtimeA) - parseTime(overtimeB);
        }

        // If overtime values are equal, compare remaining time values
        return parseTime(remainingTimeA) - parseTime(remainingTimeB);
      },
      dataIndex: "remaining_time",
      render: (_, record) => (
        <div className={`px-2 py-1 ${record.remaining_time ? 'bg-primary' : 'bg-green-500'} rounded-full w-20 text-white mx-auto text-center`}>
          <p>{record.remaining_time ?? `+ ${record.overtime}`}</p>
        </div>
      ),
    },
  ];

  const getAttendance = useCallback(async () => {
    try {
      const { data } = await Api.Post(`/organization/${activeOrganization?.id}/team-report/weekly-summary`, {
        date: date.toISOString()
      })
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  }, [activeOrganization, date])

  useEffect(() => {
    getAttendance()
  }, [getAttendance])

  return (
    <div className='overflow-auto mt-2'>
      <Table
        columns={columns}
        dataSource={records}
        bordered='true'
        className='poppins-font'
            locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No Team Report Found"
                        />
                      ),
                    }}
      />
    </div>
  );
};
export default TeamReportTable;
