import React from "react";

export default function TimeSummaryData({ projects, total }) {

  return (
    <div>
      <div className="flex justify-between border-t border-b border-[#F2F2F2] my-2">
        <p className="text-[#263238] mt-2 font-medium text-md mb-3">Project</p>
        <p className="text-[#263238] mt-2 font-medium text-md mb-3">
          Logged Time 
        </p>
      </div>
      {projects.map((data) => (
        <div
          className="flex justify-between border-b border-[#F2F2F2]"
          key={data.id}
        >
          <p className="text-[#757575] mt-2 font-medium text-md mb-3 ">
            {data.project}
          </p>
          <p className="text-[#277418] bg-[#E1F0DE] rounded-full px-2 mt-2 font-medium text-md mb-3">
            {data.time_logged}
          </p>
        </div>
      ))}
      <div className="flex justify-between">
        <p className="text-[#263238] mt-2 font-bold text-md mb-3">Total</p>
        <p className="text-[#263238] mt-2 font-bold text-md mb-3 px-2">
          {total}
        </p>
      </div>
    </div>
  );
}
