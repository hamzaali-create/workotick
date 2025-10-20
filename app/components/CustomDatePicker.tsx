"use client"
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "antd";
import CalenderIcon from "@/app/assets/calender.svg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Image from "next/image";
import { GetInitialDate } from "@/utils/getInitialDate";

const { RangePicker: AntRangePicker } = DatePicker;

const CustomDatePicker = ({ onChange, value = null }: any) => {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  // const now = dayjs().tz(activeOrganization?.timezone);
  // let initialDate = value ? dayjs(value).tz(activeOrganization?.timezone) : now;
  // if (initialDate.isAfter(now, "day")) {
  //   initialDate = now;
  // }

  let initialDate = GetInitialDate(value, activeOrganization)



  const [selectedDate, setSelectedDate] = useState<any>(initialDate);

  const handleDateChange = (date:any) => {
    if (date && date.valueOf() > Date.now()) {
      return;
    }
    setSelectedDate(dayjs(date));
  };

  const handleAddDay = () => {
    setSelectedDate((prevDate: any) => {
      const nextDate = prevDate.add(1, "day");
      // Prevent adding days beyond today
      if (nextDate.valueOf() > Date.now()) {
        return prevDate;
      }
      return nextDate;
    });
  };

  const handleSubtractDay = () => {
    setSelectedDate((prevDate: any) => prevDate.subtract(1, "day"));
  };

  useEffect(() => {
    onChange(selectedDate);
    
  }, [selectedDate]);

  return (
    <div className="flex md:px-3 md: bg-white items-center datepicker px-2 py-1 justify-end">
      <Image src={CalenderIcon}  alt="calender-icon" className="w-[50px] h-[50px]" />
      <div className="ml-2 relative">
        <DatePicker
          onChange={handleDateChange}
          format={"DD MMM, YYYY"}
          allowClear={false}
          value={selectedDate}
          autoFocus={false}
          suffixIcon
          disabledDate={(current) => {
            return current && current.valueOf() > Date.now();
          }}
        />
      </div>
      <div className="flex">
        <button onClick={handleSubtractDay}>
          <LeftOutlined />
        </button>
        <button onClick={handleAddDay}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

const WeekPicker = ({ onChange }: any) => {
  const activeOrganization = useSelector(
    (state: any) => state.auth?.activeOrganization
  );
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).tz(activeOrganization?.timezone).startOf("week")
  );

  const handleDateChange = (date: any) => {
    if (date && date.valueOf() > Date.now()) {
      return; // Prevent selecting future dates
    }
    setSelectedDate(dayjs(date));
  };

  const handleAddDay = () => {
    setSelectedDate((prevDate: any) => {
      const nextWeek = prevDate.startOf("week").add(7, "day");
      // Prevent adding weeks beyond today
      if (nextWeek.valueOf() > Date.now()) {
        return prevDate;
      }
      return nextWeek;
    });
  };

  const handleSubtractDay = () => {
    setSelectedDate((prevDate) => prevDate.endOf("week").subtract(7, "day"));
  };

  const formattedSelectedWeek = useMemo(() => {
    return (
      selectedDate.startOf("week").format("DD MMM, YYYY") +
      " - " +
      selectedDate.endOf("week").format("DD MMM, YYYY")
    );
  }, [selectedDate]);

  useEffect(() => {
    onChange(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div className="flex md:px-3 md: bg-white items-center week-picker px-2 py-1 justify-end">
      <img src={CalenderIcon} alt="calender-icon" className="" />
      <div className="ml-2 relative">
        <DatePicker
          picker="week"
          onChange={handleDateChange}
          format={["DD MMM, YYYY - DD MMM, YYYY"]}
          allowClear={false}
          value={selectedDate}
          suffixIcon
          className="opacity-0 custom-week-datepicker"
          disabledDate={(current) => {
            return current && current.valueOf() > Date.now();
          }}
        />
        <p className="p-2 font-semibold text-sm font-poppins pointer-events-none absolute top-0">
          {formattedSelectedWeek}
        </p>
      </div>
      <div className="flex">
        <button onClick={handleSubtractDay}>
          <LeftOutlined />
        </button>
        <button onClick={handleAddDay}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

// const RangePicker = ({ onChange }) => {
//   const { activeOrganization } = useSelector((state) => state.auth);
//   const today = dayjs().tz(activeOrganization?.timezone);
//   const lastDayOfCurrentMonth = today.endOf('month');
//   const lastDayOfPreviousMonth = today.startOf('month');

//   const [selectedDate, setSelectedDate] = useState([lastDayOfPreviousMonth, lastDayOfCurrentMonth]);

//   const handleOnChange = (dates, dateStrings) => {
//     setSelectedDate(dates);
//     onChange(dates);
//   };

//   const handleAddDay = () => {
//     setSelectedDate((prevDates) => [
//       prevDates[0].add(1, 'day'),
//       prevDates[1].add(1, 'day'),
//     ]);
//   };

//   const handleSubtractDay = () => {
//     setSelectedDate((prevDates) => [
//       prevDates[0].subtract(1, 'day'),
//       prevDates[1].subtract(1, 'day'),
//     ]);
//   };

//   return (
//     <div className='flex md:px-3 py-1 daterangepicker bg-white items-center px-1 cursor-pointer'>
//       <img src={CalenderIcon} alt="calender-icon" />
//       <div className="ml-2 relative">
//         <AntRangePicker
//           onChange={handleOnChange}
//           format={'DD MMM, YYYY'}
//           allowClear={false}
//           value={selectedDate}
//           autoFocus={false}
//           suffixIcon
//           separator="to"
//           disabledDate={(current) => {
//             return current && current.valueOf() > Date.now();
//           }}
//         />
//       </div>
//       <div className='flex'>
//         <button onClick={handleSubtractDay}><LeftOutlined /></button>
//         <button onClick={handleAddDay}><RightOutlined /></button>
//       </div>
//     </div>
//   );
// }

const RangePicker = ({ onChange }:any) => {
  const { activeOrganization } = useSelector((state) => state.auth);
  const today = dayjs().tz(activeOrganization?.timezone);
  const lastDayOfPreviousMonth = today.startOf("month");
  const lastDayOfCurrentMonth = dayjs(Date.now());

  const [selectedDate, setSelectedDate] = useState([
    lastDayOfPreviousMonth,
    lastDayOfCurrentMonth,
  ]);

  const handleOnChange = (dates) => {
    if (dates && dates[1] && dates[1].valueOf() > Date.now()) {
      return; // Prevent selecting future dates
    }
    setSelectedDate(dates);
    onChange(dates); // ✅ API call triggered when manually selecting dates
  };

  const handleAddDay = () => {
    setSelectedDate((prevDates) => {
      const newDates = [prevDates[0].add(1, "day"), prevDates[1].add(1, "day")];
      // Prevent adding days beyond today
      if (newDates[1].valueOf() > Date.now()) {
        return prevDates;
      }
      onChange(newDates); // ✅ Trigger API call when clicking the arrow
      return newDates;
    });
  };

  const handleSubtractDay = () => {
    setSelectedDate((prevDates) => {
      const newDates = [
        prevDates[0].subtract(1, "day"),
        prevDates[1].subtract(1, "day"),
      ];
      onChange(newDates); // ✅ Trigger API call when clicking the arrow
      return newDates;
    });
  };

  return (
    <div className="flex md:px-3 py-1 daterangepicker bg-white items-center px-1 cursor-pointer">
      <img src={CalenderIcon} alt="calender-icon" />
      <div className="ml-2 relative">
        <AntRangePicker
          onChange={handleOnChange}
          format={"DD MMM, YYYY"}
          allowClear={false}
          value={selectedDate}
          autoFocus={false}
          suffixIcon
          separator="to"
          disabledDate={(current) => current && current.valueOf() > Date.now()}
        />
      </div>
      <div className="flex">
        <button onClick={handleSubtractDay}>
          <LeftOutlined />
        </button>
        <button onClick={handleAddDay}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

CustomDatePicker.WeekPicker = WeekPicker;
CustomDatePicker.RangePicker = RangePicker;

export default CustomDatePicker;
