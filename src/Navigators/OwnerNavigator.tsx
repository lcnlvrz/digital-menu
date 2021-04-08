import React from 'react';
import { Layout } from 'antd';
import { ModalCreateRestaurant } from '../components/ModalCreateRestaurant/ModalCreateRestaurant';

export const OwnerNavigator = (): JSX.Element => {
    return (
        <Layout style={{ height: '100vh' }}>
            <ModalCreateRestaurant />
            <Layout.Sider>Sider</Layout.Sider>
            <Layout>
                <Layout.Header>Header</Layout.Header>
                <Layout.Content>Content</Layout.Content>
                <Layout.Footer>Footer</Layout.Footer>
            </Layout>
        </Layout>
    );
};
