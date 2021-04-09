import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { Badge, Rate, Tabs } from 'antd';
import { AiFillPhone } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaCalendarDay } from 'react-icons/fa';
import { GiAlarmClock } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/root-state.reducer';
import { useMyRestaurant } from '../../controllers/my-restaurant.controller';
import { ModalEditProfilePhoto } from '../../components/ModalEditProfilePhoto/ModalEditProfilePhoto';

export const MyRestaurant = (): JSX.Element => {
    const restaurant = useSelector((state: RootState) => state.restaurant);

    const controller = useMyRestaurant();

    return (
        <section className="p-5">
            <div className="bg-white rounded">
                <div className="banner w-full h-44 relative bg-black">
                    <div className="absolute z-30 w-full h-full flex items-center top-0 p-5 flex-row justify-between">
                        <div className="flex flex-row space-x-2">
                            {controller.isChangeProfilePhoto && (
                                <ModalEditProfilePhoto
                                    handleProfilePhoto={controller.handleProfilePhoto}
                                    isChangeProfilePhoto={controller.isChangeProfilePhoto}
                                />
                            )}
                            <Avatar
                                icon={
                                    <button
                                        className="opacity-0 h-full w-full"
                                        onClick={() => controller.handleProfilePhoto()}
                                    >
                                        {' '}
                                        Change profile photo
                                    </button>
                                }
                                className="cursor-pointer"
                                shape="square"
                                style={{ width: '6rem', height: '6rem' }}
                                src={restaurant.bannerPhoto}
                            />

                            <div className="flex flex-col">
                                <h1 className="text-white text-lg m-0 font-semibold"> {restaurant.name} </h1>
                                <span className="text-white  text"> {restaurant.location} </span>
                                <div className="flex flex-row items-end space-x-3 justify-center">
                                    <Rate defaultValue={4.5} />
                                    <span className="text-white"> 4.5 </span>
                                </div>
                            </div>
                        </div>
                        <section className="flex flex-col">
                            <div className="flex flex-col items-center text-white">
                                <AiOutlineClockCircle className="text-green-300 text-2xl" />
                                <span className="text-sm"> Open until 10:30 </span>
                            </div>
                            <hr className="text-white my-2 opacity-20" />
                            <div className="flex flex-col items-center text-white">
                                <AiFillPhone className="text-2xl" />
                                <span> {restaurant.cellphone} </span>
                            </div>
                        </section>
                    </div>
                    <img
                        className="h-full w-full object-cover object-center rounded opacity-60"
                        src={restaurant.bannerPhoto}
                    />
                </div>
                <div className="my-5 p-5">
                    <Tabs type="card">
                        <Tabs.TabPane tab="About" key="1">
                            <strong> What is {restaurant.name}? </strong>
                            <p className="font-light">{restaurant.description}</p>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Information" key="2">
                            <strong> Schedule </strong>
                            <div className="w-full flex flex-row space-x-2 items-center">
                                <FaCalendarDay />
                                <p className="m-0">
                                    {restaurant.scheduleDays?.map((day, index) => {
                                        if (restaurant.scheduleDays?.length === index + 1) return day;
                                        return day + ', ';
                                    })}
                                </p>
                            </div>
                            <div className="flex flex-row space-x-1 items-center">
                                <GiAlarmClock className="text-lg" />
                                <p className="m-0">
                                    {' '}
                                    {restaurant.scheduleHour?.[0]} - {restaurant.scheduleHour?.[1]}{' '}
                                </p>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};
