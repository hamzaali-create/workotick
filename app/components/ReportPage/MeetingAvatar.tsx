import React from "react";

export default function MeetingAvatar({ user }) {
  return (
    <div className="flex items-center gap-1">
      <img src={user?.avatar} className="w-10 h-10 rounded-full object-cover" alt="member" />
      <div>
        <p className="font-semibold leading-4">{user?.name}</p>
        <p className="text-smtext text-xs">{user?.job_title}</p>
      </div>
    </div>
  );
}
