import React, { Fragment } from 'react';
import { Collapse, Button, Image, Rate, Typography, Menu, Dropdown, Divider, Checkbox } from 'antd';
import { BiFoodMenu } from 'react-icons/bi';
import { BiFoodTag, BiCalendar } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateMenu } from '../../components/CreateMenu/CreateMenu';
import { AddPlate } from '../../components/AddPlate/AddPlate';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/root-state.reducer';

export const MyMenus = (): JSX.Element => {
    const restaurant = useSelector((state: RootState) => state.restaurant);

    const title = (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-2">
                <BiFoodMenu className="text-2xl text-blue-600" />
                <h1 className="text-3xl m-0"> My Menus </h1>
            </div>
            <CreateMenu />
        </div>
    );

    const cardPlate = (
        <div className="w-full flex flex-row items-start space-x-4">
            <div className="h-52 flex items-center justify-center">
                <Checkbox />
            </div>
            <Image
                width="25rem"
                height="15rem"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                src="https://i1.wp.com/www.eatthis.com/wp-content/uploads/2020/02/mcdonalds-hamburger.jpg?fit=1200%2C879&ssl=1"
            />
            <div className="w-full flex flex-col items-start space-y-5">
                <div className="w-full">
                    <Typography.Title style={{ fontSize: '1.25rem' }} editable={true}>
                        {' '}
                        Hamburguer Extra Cheese{' '}
                    </Typography.Title>
                    <Typography.Paragraph style={{ margin: 0 }} editable={true}>
                        What&apos;s in a McDonald&apos;s hamburger? A 100% beef patty that&apos;s seasoned with a pinch
                        of salt and pepper, topped with melty cheese, tangy pickles, minced onions, and (of course)
                        ketchup and mustard.
                    </Typography.Paragraph>
                </div>
                <Collapse className="w-full" defaultActiveKey={['1']}>
                    <Collapse.Panel
                        className="w-full"
                        header={
                            <div className="w-full flex flex-row justify-between items-center">
                                <Typography.Title style={{ fontSize: '1rem' }}>Ingredients</Typography.Title>
                                <Button onClick={(e) => e.stopPropagation()} type="primary">
                                    Update
                                </Button>
                            </div>
                        }
                        key="1"
                    >
                        <ul className="flex flex-row space-x-5 items-center">
                            <li className="font-semibold"> Cheese </li>
                            <Divider style={{ fontWeight: 800 }} type="vertical" />
                            <li className="font-semibold"> Meat </li>
                            <Divider type="vertical" />
                            <li className="font-semibold"> Ketchup </li>
                            <Divider type="vertical" />
                            <li className="font-semibold"> Bread </li>
                        </ul>
                    </Collapse.Panel>
                </Collapse>
                <div className="flex flex-row items-center space-x-4 w-full">
                    <Typography.Text className="text-2xl m-0 font-semibold">$500</Typography.Text>
                    <Divider type="vertical" />
                    <Typography.Text style={{ color: 'black' }} className="text-lg m-0 font-semibold">
                        {' '}
                        10 minutes{' '}
                    </Typography.Text>
                    <Divider type="vertical" />
                    <Rate style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={4} />
                </div>
            </div>
        </div>
    );

    const menuActions = (
        <Menu>
            <Menu.Item> Publish </Menu.Item>
            <Menu.Item> Hide </Menu.Item>
            <Menu.Item danger> Delete </Menu.Item>
        </Menu>
    );

    return (
        <section className="p-5 flex flex-col space-y-5">
            {title}
            {restaurant.menus?.length &&
                restaurant.menus.map((menu, index) => {
                    const headerPanel = (
                        <section className="flex flex-row justify-between">
                            <h2 className="text-lg"> {menu.name} </h2>
                            <div className="flex flex-col font-semibold text-gray-500">
                                <div className="flex flex-row items-center space-x-1">
                                    <BiFoodTag />
                                    <span>
                                        {' '}
                                        {menu.plates?.length || 0}{' '}
                                        {menu.plates && menu.plates?.length > 1 ? 'plates' : 'plate'}{' '}
                                    </span>
                                </div>
                                <div className="flex flex-row items-center space-x-1">
                                    <BiCalendar />
                                    <span> 15/05/2021 </span>
                                </div>
                            </div>
                        </section>
                    );
                    return (
                        <Collapse key={index} defaultActiveKey={['1']}>
                            <Collapse.Panel header={headerPanel} key={index}>
                                <div className="w-full flex items-center flex-row justify-between">
                                    <Dropdown overlay={menuActions}>
                                        <Button> Actions </Button>
                                    </Dropdown>
                                    <AddPlate menuId={menu.id} />
                                </div>
                                <br />
                                <br />
                                <Checkbox.Group>
                                    {menu.plates?.length ? (
                                        menu.plates.map((plate, index) => {
                                            if (menu.plates?.length === index + 1) {
                                                return <Fragment key={index}>{cardPlate}</Fragment>;
                                            } else {
                                                return (
                                                    <Fragment key={index}>
                                                        {cardPlate}
                                                        <Divider />
                                                    </Fragment>
                                                );
                                            }
                                        })
                                    ) : (
                                        <h1 className="text-lg"> There aren&apos;t any plate in this menu. </h1>
                                    )}
                                </Checkbox.Group>
                            </Collapse.Panel>
                        </Collapse>
                    );
                })}
        </section>
    );
};
