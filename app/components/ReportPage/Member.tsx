import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Tag, Tooltip } from "antd";
import React from "react";

export default function Member({ member }) {

  const firstTwoDepartments = member.department.slice(0, 2);
  const restDepartments = member.department.slice(2);

  return (
    <div className='col-span-4 my-1 md:my-0  md:col-span-2 lg:col-span-1 font-poppins'>
      <div className='flex border rounded-md lg:p-1 items-center gap-2'>
        <Badge
          offset={["-10%", "80%"]}
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: member?.is_online ? "#6CD818" : "#A8A8A8",
          }}
          dot='true'>
          <Avatar
            src={member.avatar}
            size={50}
            shape='circle'
            icon={<UserOutlined />}
            style={{ borderRadius: "50px" }}
          />
        </Badge>
        <div>
        <Tooltip className="cursor-pointer" title={member.name} overlayStyle={{ maxWidth: 300 }}>
          <h3 className='font-semibold'>
          {member.name.length > 15 ? member.name.substring(0, 20) + "..." : member.name}
            </h3>
            </Tooltip>
          <>
            {firstTwoDepartments.map((department, index) => (
              <Tag color='purple' className='font-poppins mt-1' key={index}>
                {department.name}
              </Tag>
            ))}
            {restDepartments.length > 0 && (
              <Tooltip title={restDepartments.map(department => department.name).join(', ')}>
                <Tag color='purple' className='font-poppins mt-1'>
                  +{restDepartments.length}
                </Tag>
              </Tooltip>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
