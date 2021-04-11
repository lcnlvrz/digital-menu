import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { Badge, Rate, Tabs, Dropdown, Typography, Button } from 'antd';
import { AiFillPhone } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaCalendarDay } from 'react-icons/fa';
import { GiAlarmClock } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/root-state.reducer';
import { ModalEditProfilePhoto } from '../../components/ModalEditProfilePhoto/ModalEditProfilePhoto';
import { MenuOptionsPhoto } from '../../components/MenuOptionsPhoto/MenuOptionsPhoto';
import { ModalUpdatePhoto } from '../../components/ModalUpdatePhoto/ModalUpdatePhoto';
import { useMyRestaurant } from '../../controllers/my-restaurant.controller';
import { FcEditImage } from 'react-icons/fc';
import { ModalConfirm } from '../../components/ModalConfirm/ModalConfirm';
import { ModalEditSchedule } from '../../components/ModalEditSchedule/ModalEditSchedule';

export const MyRestaurant = (): JSX.Element => {
    const controller = useMyRestaurant();

    const leftSide = (
        <div className="flex flex-row space-x-2">
            <Dropdown
                overlay={
                    <MenuOptionsPhoto
                        executeInRender={controller.profile}
                        handleDelete={controller.handleOpenDeletePhoto}
                        handleUpdate={controller.handleOpenUpdatePhoto}
                    />
                }
            >
                <Avatar
                    className="cursor-pointer"
                    shape="square"
                    style={{ width: '10rem', height: '7rem' }}
                    src={
                        controller.restaurant.profilePhoto ||
                        'https://i2.wp.com/news.microsoft.com/wp-content/themes/microsoft-news-center-2016/assets/img/default-avatar.png?ssl=1'
                    }
                />
            </Dropdown>
            <div className="flex flex-col w-full">
                <Typography.Paragraph
                    title="name"
                    style={{
                        width: '100%',
                        color: 'white',
                        fontSize: '1.5rem',
                        margin: 0,
                        fontWeight: 'bolder',
                        background: 'transparent',
                    }}
                    editable={{
                        autoSize: { maxRows: 1, minRows: 1 },
                        onChange: (value) =>
                            value &&
                            value !== controller.restaurant.name &&
                            controller.updateRestaurant.execute({ name: value }),
                    }}
                >
                    {controller.restaurant.name}
                </Typography.Paragraph>
                <Typography.Paragraph
                    title="name"
                    style={{
                        color: 'white',
                        width: '100%',
                        fontSize: '0.9rem',
                        margin: 0,
                        fontWeight: 'lighter',
                        background: 'transparent',
                    }}
                    editable={{
                        autoSize: { maxRows: 1, minRows: 1 },
                        onChange: (value) =>
                            value &&
                            value !== controller.restaurant.location &&
                            controller.updateRestaurant.execute({ location: value }),
                    }}
                >
                    {controller.restaurant.location}
                </Typography.Paragraph>
                <div className="flex flex-row items-end space-x-3 justify-start">
                    <Rate defaultValue={4.5} />
                    <span className="text-white"> 4.5 </span>
                </div>
            </div>
        </div>
    );

    const rightSide = (
        <section className="flex flex-col space-y-3">
            <Dropdown
                overlay={
                    <MenuOptionsPhoto
                        executeInRender={controller.banner}
                        handleDelete={controller.handleOpenDeletePhoto}
                        handleUpdate={controller.handleOpenUpdatePhoto}
                    />
                }
            >
                <FcEditImage className="w-full inline-block text-3xl opacity-50 hover:opacity-100 transition-all cursor-pointer" />
            </Dropdown>
            <div className="flex flex-col items-center text-white">
                <AiOutlineClockCircle className="text-green-300 text-2xl" />
                <span className="text-sm"> Open until 10:30 </span>
            </div>
            <hr className="text-white my-2 opacity-20" />
            <div className="flex flex-col items-center text-white">
                <AiFillPhone className="text-2xl" />
                <span> {controller.restaurant.cellphone} </span>
            </div>
        </section>
    );

    const information = (
        <div className="my-5 p-5">
            <Tabs type="card">
                <Tabs.TabPane tab="About" key="1">
                    <strong> What is {controller.restaurant.name}? </strong>
                    <Typography.Paragraph
                        title="name"
                        style={{
                            fontSize: '0.9rem',
                            margin: 0,
                            width: '100%',
                            fontWeight: 'lighter',
                            background: 'transparent',
                        }}
                        editable={{
                            onChange: (value) =>
                                value &&
                                value !== controller.restaurant.description &&
                                controller.updateRestaurant.execute({ description: value }),
                        }}
                    >
                        {controller.restaurant.description}
                    </Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane className="flex flex-row justify-between" tab="Information" key="2">
                    <section>
                        <strong> Schedule </strong>
                        <div className="my-1">
                            <div className="w-full flex flex-row space-x-2 items-center">
                                <FaCalendarDay className="text-green-500" />
                                <p className="m-0">
                                    {controller.restaurant.scheduleDays?.map((day, index) => {
                                        if (controller.restaurant.scheduleDays?.length === index + 1) return day;
                                        return day + ', ';
                                    })}
                                </p>
                            </div>
                            <div className="flex flex-row space-x-1 items-center">
                                <GiAlarmClock className="text-lg text-yellow-500" />
                                <p className="m-0">
                                    {' '}
                                    {controller.restaurant.scheduleHour?.[0]} -{' '}
                                    {controller.restaurant.scheduleHour?.[1]}{' '}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <Button onClick={controller.handleOpenEditSchedule} type="primary">
                            {' '}
                            Edit{' '}
                        </Button>
                    </section>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );

    return (
        <section className="p-5">
            <div className="bg-white rounded">
                <div className="banner w-full h-44 relative bg-black">
                    <div className="absolute z-30 w-full h-full flex items-center top-0 p-5 flex-row justify-between">
                        {leftSide}
                        {rightSide}
                    </div>
                    <img
                        className="h-full w-full object-cover object-center rounded opacity-60"
                        src={
                            controller.restaurant.bannerPhoto ||
                            'https://josephliu.co/wp-content/uploads/2019/06/10-ferdinand-stohr-149422-unsplash.jpg'
                        }
                    />
                </div>
                {information}
            </div>
            <ModalUpdatePhoto
                bannerOrPhoto={controller.bannerOrPhoto}
                handleOpen={controller.handleOpenUpdatePhoto}
                isOpen={controller.openUpdatePhoto}
            />
            <ModalConfirm
                cancelHandle={controller.handleOpenDeletePhoto}
                okHandle={controller.removePhoto}
                visible={controller.openDeletePhoto}
                isLoading={controller.isLoadingDeletePhoto}
            />
            <ModalEditSchedule
                isLoading={controller.isLoadingEditSchedule}
                handleSubmit={controller.updateRestaurant.execute}
                restaurant={controller.restaurant}
                handleOpen={controller.handleOpenEditSchedule}
                isVisible={controller.openEditSchedule}
            />
        </section>
    );
};
