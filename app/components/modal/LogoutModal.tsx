"use client"
import Typography from "antd/es/typography";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import logoutSvg from "@/app/assets/logout.svg";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { useLogoutMutation } from "@/app/redux/services/auth";
import { useRouter } from "next/navigation";


interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
}

export default function LogoutModal({ show, onClose }: LogoutModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await logout().unwrap();
      router.push("/login");
    } catch (errors) {
      console.error(errors);
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  return (
    <Modal open={show} onCancel={onClose} footer={false} centered>
      <div className="logout-wrapper mt-5 max-w-xs mx-auto">
        <div className="text-center">
          <img
            src={logoutSvg}
            alt="logout"
            className="mx-auto mt-5"
            width={40}
            height={40}
          />
          <Typography.Title
            level={3}
            className="font-poppins text-dark font-medium mt-3"
          >
            Logout
          </Typography.Title>
          <Typography.Paragraph className="font-poppins text-dark font-medium mt-3 text-base">
            Are you sure you want to logout ?
          </Typography.Paragraph>
          <div className="grid grid-cols-2 gap-x-5">
            <Button
              className="rounded-sm col-span-1 font-poppins font-medium h-10"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="rounded-sm col-span-1 bg-primary font-poppins font-medium h-10"
              onClick={handleLogout}
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
