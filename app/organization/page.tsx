"use client"
import React, { useCallback, useEffect, useState } from "react";
import Paragraph from "antd/es/typography/Paragraph";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import Empty from "antd/es/empty";
import Select from "antd/es/select";
import { useForm } from "antd/es/form/Form";


import { useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import { useRouter } from "next/navigation";
import Auth from "../middleware/Auth";

import FullScreenLoader from "@/app/components/loader/FullScreenLoader";
import Api from "@/utils/Axios";
import { setActiveOrganization } from "../redux/slices/authSlice";
import LogoutModal from "../components/modal/LogoutModal";



export default function Organization() {
  const [showLogout, setShowLogout] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [isLoadingOrganizationSelect, setIsLoadingOrganizationSelect] = useState(true);
  const [selectedOrganizationName , setSelectedOrganizationName] = useState(null);
  const [organizationForm] = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFormSubmit = ({ organization }:any) => {
    const activeOrg = organizations.find((item:any) => item.id === organization);
    setSelectedOrganizationName(activeOrg?.name)
    delayFuntion(1000);
    console.log(activeOrg, "handleFormSubmit=>")
    // dispatch(setActiveOrganization(activeOrg));
    // navigate("/");
  };

  const delayFuntion = (time:any) =>{
    setIsLoadingOrganizationSelect(true);
    setTimeout(() => {
      setIsLoadingOrganizationSelect(false);
    //   router.push("/");
    }, time);
 
  }

  const delayFuntionWihtoutNavigate = (time:any) =>{
    setIsLoadingOrganizationSelect(true);
    setTimeout(() => {
      setIsLoadingOrganizationSelect(false);
    }, time);
 
  }

  const getOrganizations = useCallback(async () => {
    try {
      const { data } = await Api.Get("/organization");
      setOrganizations(data);
    } catch (error) {
      console.error("Something went wrong");
    }
  }, []);

  const contentStyle = {
    padding: 50,
    // background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;

  useEffect(() => {
    getOrganizations();
  }, [getOrganizations]);

  useEffect(() => {
    if (organizations.length === 1 && !organizations[0].disabled) {
      dispatch(setActiveOrganization(organizations[0]));
      setSelectedOrganizationName(organizations[0]?.name);
      delayFuntion(1000);
      // navigate("/");
    }
    else if (organizations.length > 1) {
      setIsLoadingOrganizationSelect(false);
      // navigate("/");
    }
    else if(organizations.length === 0){
      delayFuntionWihtoutNavigate(1000);
      //setIsLoadingOrganizationSelect(false);
    }
  }, [organizations, router, dispatch]);

  return (
    <Auth>
      {/* { isLoadingOrganizationSelect ?   
  //      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
  //   <Spin tip={
  //   <span className="whitespace-pre-line text-center">
  //     Loading...{"\n"}{selectedOrganizationName ? selectedOrganizationName : ""}
  //   </span>
  // }  size="large" >
  //   {content}
  //   </Spin>
  // </div> 
  <FullScreenLoader/> */}
   
      <AuthLayout>
      { isLoadingOrganizationSelect && <FullScreenLoader></FullScreenLoader>}   
        <div className="mt-10 mb-5">
          <Typography.Title
            level={2}
            className="text-left text-dark font-semibold font-poppins"
          >
            Select your <span className="text-secondary">Workotick</span>{" "}
            organization
          </Typography.Title>
          <Typography.Paragraph className="font-poppins font-light">
            You're part of multiple innovative teams! Please select the
            organization you wish to access today.
          </Typography.Paragraph>
        </div>
        <Form
          layout="vertical"
          className="mt-0 "
          onFinish={handleFormSubmit}
          form={organizationForm}
        >
          <div className="">
            <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
              Your organization*
            </Typography.Paragraph>
            <Form.Item
              name="organization"
              rules={[{ required: true, message: "Select Organization" }]}
            >
              <Select
                className="h-12"
                allowClear
                placeholder="Select your organization"
                notFoundContent = {<Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Department Found"
                />}
              >
                {organizations.map((organization:any) => {
                  return (
                    <Select.Option
                      value={organization.id}
                      key={`organization-${organization.id}`}
                      className="py-2 border-b"
                      disabled={organization.disabled}
                 
                    >
                      <div className="flex">
                        <img src={organization.logo} alt="" width={30} />
                        <p className="m-1 mt-1">{organization.name}</p>
                      </div>
                    </Select.Option>
                  );
                })}
                {/*<Select.Option value="" key="new-org-link" className="py-2">
                  <Link to="/create-organization">
                    <Typography.Paragraph className="text-primary font-poppins mb-0">
                      + Create new organization
                    </Typography.Paragraph>
                  </Link>
                </Select.Option>*/}
              </Select>
            </Form.Item>
          </div>
          <Form.Item className="mt-6 mb-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-primary text-white font-poppins text-medium"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
        <div className="text-right">
          <Button
            className="font-poppins py-0"
            type="link"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </Button>
        </div>
        {/*<div className="sf-new-org-hr relative mt-5">
          <Link to="/create-organization">
            <Typography.Paragraph className="font-poppins text-center mx-auto max-w-[200px] bg-white">
              Create new <span className="text-primary">Organization</span>
            </Typography.Paragraph>
          </Link>
        </div>*/}
        <LogoutModal show={showLogout} onClose={() => setShowLogout(false)} />
      </AuthLayout>
    </Auth>
  );
}
