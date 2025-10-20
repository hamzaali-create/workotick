"use client";
import Navbar from "@/app/components/layout/navbar";
import SidebarContent from "@/app/components/layout/SidebarContent";
import Auth from "@/app/middleware/Auth";
import Subscriber from "@/app/middleware/Subscriber";

import { Layout } from "antd";

import React from "react";

const { Header, Content } = Layout;

function MainLayout({ children }: any) {
  return (
    <>
      <Auth>
        <Subscriber>
          <Layout>
            <Header
              style={{
                display: "flex",
                justifyContent: "end",
                backgroundColor: "white",
                padding: "0px",
              }}
              className="font-poppins"
            >
              <Navbar />
            </Header>
            <Layout className="font-poppins">
              <SidebarContent />
              <Layout>
                <Content>{children}</Content>
              </Layout>
            </Layout>
          </Layout>
        </Subscriber>
      </Auth>
    </>
  );
}

export default MainLayout;
