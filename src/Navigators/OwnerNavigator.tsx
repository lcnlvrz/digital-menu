import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Header } from '../components/Header';
import { MyMenus } from '../pages/MyMenus/MyMenus';
import { MyRestaurant } from '../pages/MyRestaurant/MyRestaurant';

export const OwnerNavigator = (): JSX.Element => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider collapsible>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="9">Files</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout className="site-layout">
                <Header />
                <Layout.Content style={{ margin: '0 16px' }}>
                    <MyRestaurant />
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
            </Layout>
        </Layout>
    );
};
