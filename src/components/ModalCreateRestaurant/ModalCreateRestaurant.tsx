import React from 'react';
import { Modal, TimePicker, Steps, Button, message } from 'antd';
import { useModalCreateRestaurant } from '../../controllers/modal-create-restaurant';
import { Form, Input, SubmitButton, InputNumber, Switch, DatePicker, Radio, Select } from 'formik-antd';
import { Formik } from 'formik';
import { RestaurantSchema } from '../../schema/Restaurant/restaurant.schema';
import { RestaurantInitialValue } from '../../initial-values/Restaurant/restaurant.initial-value';

export const ModalCreateRestaurant = (): JSX.Element => {
    const controller = useModalCreateRestaurant();

    return (
        <Modal
            footer={null}
            title={<h1 className="font-semibold text-2xl"> Create Restaurant </h1>}
            closeIcon={null}
            visible={controller.isOpen}
        >
            <p className="text-black">
                {' '}
                It seems like it&apos;s your first time here. First of all, create your restaurant!{' '}
            </p>
            <Formik
                onSubmit={(values) => controller.createRestaurant(values)}
                initialValues={RestaurantInitialValue}
                validationSchema={RestaurantSchema}
            >
                {({ setValues, values, setErrors, errors, touched, setTouched }) => (
                    <Form>
                        <Form.Item name="name">
                            <label> Name </label>
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item name="description">
                            <label> Description </label>
                            <Input.TextArea autoSize={{ maxRows: 3, minRows: 3 }} name="description" />
                        </Form.Item>
                        <Form.Item name="location">
                            <label> Location </label>
                            <Input name="location" />
                        </Form.Item>
                        <Form.Item name="scheduleHour">
                            <label> Schedule Hour </label>
                            <br />
                            <TimePicker.RangePicker
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setErrors({ ...errors, scheduleHour: 'Required!' });
                                        setTouched({ ...touched, scheduleHour: true });
                                    }
                                }}
                                onChange={(_, timeString) => {
                                    setValues({ ...values, scheduleHour: timeString });
                                }}
                                format=""
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <label> Schedule Days </label>
                        <br />
                        <Form.Item name="scheduleDays">
                            <Select
                                style={{ width: '100%' }}
                                mode="multiple"
                                defaultValue={RestaurantInitialValue.scheduleDays}
                                name="scheduleDays"
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                                    (day, index) => (
                                        <Select.Option value={day} key={index}>
                                            {day}
                                        </Select.Option>
                                    ),
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item name="cellphone">
                            <label> Cellphone </label>
                            <br />
                            <InputNumber style={{ width: '100%' }} name="cellphone" />
                        </Form.Item>
                        <label> Delivery </label>
                        <br />
                        <Switch name="isDelivery" />
                        <br />
                        <br />
                        <SubmitButton loading={controller.isLoading}> Create Restaurant </SubmitButton>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
