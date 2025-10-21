"use client";
import React, { useCallback, useEffect, useState } from "react";
// import {
//   Link, userouter,
//   useSearchParams
// } from "react-router-dom";

import { Button, Checkbox, Form, Input, Typography, message } from "antd";
const Title = dynamic(() => import('antd/es/typography/Title'), { ssr: false });

import PasswordStrengthBar from "react-password-strength-bar";
import { useForm, useWatch } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import Guest from "../middleware/guest";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthenticated } from "../redux/slices/authSlice";
import Link from "next/link";
import Api from "@/utils/Axios";
import { RegisterApiResponse, RegisterFormValues } from "@/type/register";
import dynamic from "next/dynamic";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerForm] = useForm();
  const searchParams = useSearchParams();
  const password = useWatch("password", registerForm);
  const [disableEmail, setDisableEmail] = useState<boolean>(false);

  const handleFormSubmit = useCallback(
    async (values: RegisterFormValues) => {
      try {
        console.log("working", values);
        setLoading(true);

        const registerValues: RegisterFormValues = {
          ...values,
          ...(searchParams.has("token") &&
            searchParams.get("token") !== "" && {
              token: searchParams.get("token") as string,
            }),
        };

        const { data, message }: any = await Api.Post({
          url: "/register",
          postData: registerValues,
        });

        dispatch(setAuthenticated(data));
        //   Notify.success(message);

        //   window?.dataLayer?.push({
        //     event: "signup_lead",
        //     user_email: values.email,
        //     user_name: values.name,
        //   });

        router.push("/");
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;

          const validationErrors = Object.keys(errors).map((key) => ({
            name: key,
            errors: errors[key] as string[],
          }));
          registerForm.setFields(validationErrors);
        } else {
          console.error(error);
          // Notify.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router, registerForm, searchParams]
  );

  //   useEffect(() => {
  //     if (
  //       !(
  //         searchParams.has("token") &&
  //         searchParams.get("token") !== "" &&
  //         searchParams.has("email") &&
  //         searchParams.get("email") !== ""
  //       )
  //     ) {
  //       router.push("/");
  //     }
  //   }, [searchParams]);

  const autoFill = useCallback(() => {
    if (searchParams.has("email") && searchParams.get("email") !== "") {
      registerForm.setFieldValue("email", searchParams.get("email"));
    }
    if (searchParams.has("token") && searchParams.get("token") !== "") {
      setDisableEmail(true);
    }
  }, [searchParams, registerForm]);

  useEffect(() => {
    autoFill();
  }, [autoFill]);

  return (
    <>
      <Guest>
        <AuthLayout>
          <div className="mt-5 mb-5">
            <Title
              level={2}
              className="text-left text-dark font-semibold font-poppins"
            >
              Create new account
            </Title>
            <Typography.Paragraph className="font-poppins font-light">
              Sign Up, Stay Ahead — Begin Your Activity Journey Today.
            </Typography.Paragraph>
          </div>
          <Form
            layout="vertical"
            className="mt-0 "
            onFinish={handleFormSubmit}
            form={registerForm}
            disabled={loading}
          >
            <Form.Item name="token">
              <Input type="hidden" />
            </Form.Item>
            <div className="">
              <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
                Full Name*
              </Typography.Paragraph>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your full name" },
                ]}
              >
                <Input
                  className="w-full px-4 py-3 border rounded-md"
                  placeholder="Enter your full name"
                  // autoComplete={false}
                />
              </Form.Item>
            </div>
            <div className="">
              <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
                Email*
              </Typography.Paragraph>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your work email",
                    type: "email",
                  },
                ]}
              >
                <Input
                  disabled={disableEmail}
                  className="w-full px-4 py-3 border rounded-md"
                  placeholder="Enter your work email"
                  // autoComplete={false}
                />
              </Form.Item>
            </div>
            <div className="">
              <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
                Create Password*
              </Typography.Paragraph>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Enter password" }]}
              >
                <Input.Password
                  placeholder="Enter 8 or more characters"
                  className="w-full px-4 py-3 border rounded-md mb-2"
                  name="password"
                />
              </Form.Item>

              <PasswordStrengthBar
                className="password-strength-checker"
                password={password}
                barColors={["#ddd", "#ddd", "#ef4836", "#f6b44d", "#53B12F"]}
                scoreWords={[
                  "😭",
                  "Too weak 😟",
                  "Weak 😕",
                  "Normal 🙂",
                  "Strong 😎",
                ]}
              />
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please accept the terms and privacy",
                },
              ]}
              name="terms"
              className="mb-0 flex gap-x-3"
              valuePropName="checked"
            >
              <Checkbox>
                <div className="flex items-center">
                  <Typography.Paragraph className="mb-0 font-poppins font-normal inline-block ml-1 mt-1">
                    I agree to the{" "}
                    <Link
                      href="https://workotick.com/terms-of-use/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="https://workotick.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Privacy Policy
                    </Link>
                  </Typography.Paragraph>
                </div>
              </Checkbox>
            </Form.Item>
            <Form.Item className="mt-8">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-primary text-white font-poppins text-medium"
                loading={loading}
              >
                Create my account
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph className="text-center font-poppins font-medium mt-3">
            Already a registered user?{" "}
            <Link
              href="/login"
              className="text-secondary underline text-sm mt-1"
            >
              Login
            </Link>
          </Typography.Paragraph>
        </AuthLayout>
      </Guest>
    </>
  );
}
