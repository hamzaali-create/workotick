"use client";
import Api from "@/utils/Axios";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Guest from "../middleware/guest";
import AuthLayout from "@/layouts/AuthLayout";

import Link from "next/link";
import { setAuthenticated } from "../redux/slices/authSlice";
function Login() {
  const [emailDisabled, setEmailDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean | string>(
    false
  );
  const [rememberMe, setRememberMe] = useState<boolean | null>(true);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [loginForm] = (Form as any).useForm();
  const router = useRouter();

  const redirectedFromInvite = useMemo(() => {
    return searchParams.has("token") && searchParams.get("token") !== "";
  }, [searchParams]);

  const autoFill = useCallback(() => {
    if (searchParams.has("email") && searchParams.get("email") !== "") {
      loginForm.setFieldValue("email", searchParams.get("email"));
    }

    if (searchParams.has("token") && searchParams.get("token") !== "") {
      setEmailDisabled(true);
    }
  }, [searchParams, loginForm]);

  useEffect(() => {
    autoFill();
  }, [autoFill]);

  const handleFormSubmit = useCallback(
    async (values: any) => {
      console.log(values, "postData");
      try {
        setLoading(true);
        // const { data, message } = await Api.Post("/login", values);
        // console.log(data, "data" , message)

        const { data, message }: any = await Api.Post({
          url: "/login",
          postData: values,
        });
        dispatch(setAuthenticated(data));
        if (redirectedFromInvite) {
          // false condition alwayes
          router.push(searchParams.get("redirectTo") as any);
        } else {
          router.push("/");
        }
        // Notify.success(message);
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            const validationErrors = Object.keys(errors).map((key) => ({
              name: key,
              errors: errors[key],
            }));
            loginForm.setFields(validationErrors);
          } else if (error.response.status === 404) {
            setGeneralError(error.response.data.message);
          }
        } else {
          console.error(error);
          // Notify.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch, loginForm, router, redirectedFromInvite, searchParams]
  );

  return (
    <>
      <Guest>
        <AuthLayout>
          <div className="mt-10 mb-5">
            <Typography.Title
              level={2}
              className="text-left text-dark font-semibold font-poppins"
            >
              Login to your <span className="text-secondary">Workotick</span>{" "}
              account
            </Typography.Title>
            <Typography.Paragraph className="font-poppins text-left font-light">
              Enter Your Gateway to Innovation — Your Activity Portal Awaits.
            </Typography.Paragraph>
          </div>

          <Form
            layout="vertical"
            className="mt-0 "
            onFinish={handleFormSubmit}
            loading={loading}
            form={loginForm}
          >
            <div className="">
              <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
                Email*
              </Typography.Paragraph>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your work email",
                  },
                  {
                    validator: (_, value) => {
                      setGeneralError("");
                      if (value && !value.includes("@")) {
                        return Promise.reject(
                          "Please enter a valid email address with '@' and a domain name."
                        );
                      }

                      const regex =
                        /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
                      if (value && !regex.test(value)) {
                        return Promise.reject(
                          "Please enter a valid email address."
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  className="w-full px-4 py-3 border rounded-md"
                  placeholder="Enter your work email"
                  autoFocus={false}
                  disabled={emailDisabled}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="">
              <Typography.Paragraph className="font-poppins text-dark text-sm mb-1.5">
                Password*
              </Typography.Paragraph>
              <Form.Item
                className="mb-1"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                  {
                    validator: (_, value) => {
                      setGeneralError("");
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border rounded-md"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              {generalError && (
                <span className="text-red-500 text-sm mt-1">
                  {generalError}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mb-3">
              <Form.Item name="should_remember" className="mb-0">
                <div className="flex items-center">
                  <Checkbox
                    className="mb-0"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Typography.Paragraph className="mb-0 font-poppins font-normal inline-block ml-1 mt-1">
                    Remember Me
                  </Typography.Paragraph>
                </div>
              </Form.Item>
              <Link
                href="/forgot-password"
                className="font-medium font-poppins text-primary"
              >
                Forgot Password?
              </Link>
            </div>
            <Form.Item className="mt-8">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-primary text-white font-poppins text-medium"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="text-center font-poppins font-medium mt-3">
            Not yet registered?
            <br />
            Contact us at{" "}
            <a href="mailto:support@workotick.com">support@workotick.com</a> to
            create your account.
          </Typography.Paragraph>
        </AuthLayout>
      </Guest>
    </>
  );
}

export default Login;
