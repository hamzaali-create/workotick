import React, { useCallback, useEffect, useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import ResponsiveSidebar from "../Layout/ResponsiveSidebar";
import { Avatar, Badge, Button, Input, Tooltip } from "antd";
import Fuse from 'fuse.js'

export default function MemberSelection({
  members,
  className,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [fuseInstance, setFuseInstance] = useState(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMemberSelection = useCallback((member) => {
    setSelectedMembers(prev => {
      let ref;
      if (prev.includes(member.id)) {
        ref = prev.filter(item => item !== member.id);
      } else {
        ref = [...prev, member.id];
      }

      return Array.from(new Set(ref));
    });
    setOpen(false);

  }, []);

  const handleSearch = useCallback((event) => {
    const value = event.target.value;
    if (!value || value === '') {
      setFilteredMembers(members);
      return
    }
    const results = fuseInstance.search(value);
    setFilteredMembers(results.map(item => item.item));
  }, [members, fuseInstance]);

  const handleMembersSelection = useCallback(() => {
    if (selectedMembers.length > 0) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(item => item.id))
    }
  }, [selectedMembers, members]);

  useEffect(() => {
    if (members.length > 0) {
      setSelectedMembers(prev => {
        return members.map(item => item.id);
      });
    }
  }, [members]);

  useEffect(() => {
    onChange(selectedMembers)
  }, [selectedMembers, onChange])

  useEffect(() => {
    const fuse = new Fuse(members ?? [], {
      keys: ['name'],
    });
    setFilteredMembers(members);
    setFuseInstance(fuse);
  }, [members])

  return (
    <div className={className}>
      <button
        className=' lg:hidden bg-primary text-white w-36   mb-2 p-2  rounded-md mx-2 hover:bg-slate-300'
        onClick={showDrawer}>
        Select Member
      </button>
      <ResponsiveSidebar
        close={onClose}
        open={open}
        width='100%'
        className='rounded-md'>
        <div className='screenshot font-poppins p-2 rounded-md'>
          <Input
            placeholder='search'
            size='large'
            suffix={<SearchOutlined />}
            className='font-poppins'
            onChange={handleSearch}
          />
          <div className='my-3'>
            <div className='flex items-center justify-between border-b-2 py-1 mb-1.5'>
              <p className='font-slightly-bold text-sm'>Members</p>
              <Button
                type='ghost'
                className='font-slightly-bold text-sm text-primary'
                onClick={handleMembersSelection}
              >
                {selectedMembers.length > 0 ? 'Clear Selection' : 'Select All'}
              </Button>

            </div>
            <div className="space-y-1">
              {filteredMembers?.length > 0 &&
                filteredMembers.map((member) => (
                  <button
                    className={`hover:bg-[#F0F0FA] w-full ${selectedMembers.includes(member.id)
                      ? "bg-gray-200"
                      : "bg-white"
                      } rounded-md`}
                    onClick={() => handleMemberSelection(member)}
                    key={member.id}>
                    <div className='flex justify-between p-2 items-center'>
                      <div className='flex items-center gap-2 line-clamp-1'>
                        <Badge
                          offset={["-10%", "85%"]}
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: member.clocked_in_at
                              ? "#6CD818"
                              : "#A8A8A8",
                          }}
                          dot='true'>
                          <Avatar
                            src={member.avatar}
                            size={40}
                            shape='circle'
                            icon={<UserOutlined />}
                            style={{ borderRadius: "30px" }}
                          />
                        </Badge>

                        <div>
                        <Tooltip title={member.name} overlayStyle={{ maxWidth: 300 }}>
  <h3 className="font-semibold text-left w-60 text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer">
    {member.name.length > 20 ? member.name.substring(0, 20) + "..." : member.name}
  </h3>
</Tooltip>
                          <p className='text-xs text-left '>{member?.job_title}</p>
                        </div>
                      </div>
                      <div className='text-right '>
                        <p className='text-xs font-slightly-bold text-[#263238]'>
                          {member?.clocked_in_at}
                        </p>
                        <p className='text-xs text-center bg-primary rounded-full my-1 text-white h-6 w-6 flex justify-center items-center'>
                          {member.screenshots_count}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
            {(members.length === 0 || filteredMembers.length === 0) && (
              <div className='font-slightly-bold text-center my-2'>
                No Member Found
              </div>
            )}
          </div>
        </div>
      </ResponsiveSidebar>
    </div>
  );
}
