import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Typography } from 'antd';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export function LayoutTheme({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" >
            imagem
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
            <Title level={3} style={{ color: '#000', textAlign: 'center' }}>WEB SCRAPING LINUX IMÓVEIS</Title>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          TG Software ©2023 Created by TG Software
        </Footer>
      </Layout>
    </Layout>
  );
};