
import useScreenSize from '@/app/hooks/useScreenSize';
import { Drawer } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { memo } from 'react';
const ResponsiveSidebar = memo(
  ({ children, width, open, className, close, placement = 'left' }:any) => {
    const { isMobile } = useScreenSize();
    return isMobile ? (
      <Drawer
        width={300}
        open={open}
        placement={placement}
        style={{ padding: 0}}
        onClose={close}
        className={className}
      >
        {children}
      </Drawer>
    ) : (
      <Sider width={width} className={className} style={{ backgroundColor: 'white' }}>
        {children}
      </Sider>
    );
  }
);
ResponsiveSidebar.displayName = ResponsiveSidebar;
export default ResponsiveSidebar;