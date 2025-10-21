import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import { ScreenshotDetails } from "./DetailModal";
import RestrictedImages from "../RestrictedImage";

export default function FullViewModal({ show, screenshot, onClose, onNext, onPrev }) {
  const sliderRef = useRef(null);

  return (
    <Modal
      open={show}
      onCancel={onClose}
      footer={false}
      className='w-full'
      centered>
      <Slider ref={sliderRef}>
        <div
          className=''>
          <div className='relative font-poppins'>
            <RestrictedImages
              src={screenshot?.screenshot}
              className='py-5 p-3 w-full '
            />
            <div className='absolute top-1/2 transform -translate-y-1/2   rounded-full p-1 bg-white'>
              <button
                className='button'
                onClick={onPrev}>
                <LeftOutlined className='text-2xl' />
              </button>
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 -0  md:right-0 lg:right-0 bg-white rounded-full p-1'>
              <button
                className='button'
                onClick={onNext}>
                <RightOutlined className='text-2xl' />
              </button>
            </div>
          </div>
          <ScreenshotDetails screenshot={screenshot} className='bg-[#F0F4F9]' />
        </div>
      </Slider>
    </Modal>
  );
}
