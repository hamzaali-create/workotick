import { Button, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import Member from "./Member";

const labelMap = {
  total_members: "Total Team Members",
  active_members: "Active Members",
  clocked_out_members: "Clocked Out Members",
  pending_members: "Yet to start Members",
}

export default function RealTimeModal({ members, open, onClose }) {

  const [selectedType, setSelectedType] = useState('total_members');
  const [activeTypeMembers, setActiveTypeMembers] = useState([]);

  const handleTabChange = useCallback((type) => {
    setSelectedType(type);
    setActiveTypeMembers(members[type]);
  }, [members]);

  useEffect(() => {
    handleTabChange('total_members')
  }, [handleTabChange])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='w-10/12 h-28 realtime'
      footer={false}>
      <p className='text-lg font-semibold font-poppins'>Real-Time</p>
      <div className='my-3 font-poppins w-fit space-x-2'>
        {
          Object.keys(members).map(memberType => (
            <Button
              onClick={() => handleTabChange(memberType)}
              className={`rounded-md border-none h-10 ${selectedType === memberType ? "bg-primary text-white hover:text-white" : ""
                }`}>
              {labelMap[memberType]} ({members[memberType]?.length ?? 0})
            </Button>

          ))
        }
      </div>
      <div className='grid grid-cols-4 md:gap-2'>
        {activeTypeMembers?.map((member) => (
          <Member member={member} />
        ))}
      </div>
    </Modal>
  );
}
