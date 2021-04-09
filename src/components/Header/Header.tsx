import React from 'react';
import { Layout, Input, Avatar } from 'antd';
import { Logo } from '../Logo/Logo';

export const Header = (): JSX.Element => {
    return (
        <Layout.Header className="flex flex-row items-center justify-between space-x-5">
            <Logo textClassName="text-white text-sm" logoClassName="text-white text-3xl" />
            <Input.Search placeholder="Search anything in your restaurant" />
            <Avatar
                style={{ width: '3.5rem' }}
                size="large"
                src="http://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.ar/files/mobile.png"
            />
        </Layout.Header>
    );
};
