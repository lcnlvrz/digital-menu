import React from 'react';
import { Modal, TimePicker, Steps, Button, message } from 'antd';
import { useModalCreateRestaurant } from '../../controllers/modal-create-restaurant';
import { Form, Input, SubmitButton, InputNumber, Switch, Select } from 'formik-antd';
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
            <p className="text-black text-lg">
                {' '}
                It seems like it&apos;s your first time here. First of all, create your restaurant!{' '}
            </p>
            <Formik
                onSubmit={(values) => controller.createRestaurant(values)}
                initialValues={RestaurantInitialValue}
                validationSchema={RestaurantSchema}
            >
                {({ setValues, values, errors, setErrors }) => (
                    <Form>
                        <Form.Item name="name">
                            <label> Name </label>
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item id="description" name="description">
                            <label> Description </label>
                            <Input.TextArea
                                onChange={(e) => {
                                    setValues({ ...values, description: e.target.value });
                                }}
                                autoSize={{ maxRows: 3, minRows: 3 }}
                                name="description"
                            />
                        </Form.Item>
                        <Form.Item name="location">
                            <label> Location </label>
                            <Input name="location" />
                        </Form.Item>
                        <Form.Item name="scheduleHour">
                            <label> Schedule Hour </label>
                            <br />
                            <TimePicker.RangePicker
                                onChange={(_, stringFormat) => {
                                    setValues({ ...values, scheduleHour: stringFormat });
                                }}
                                format="h:mm a"
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
                        <SubmitButton
                            onClick={(_) => {
                                if (values.scheduleHour.length !== 2) {
                                    setErrors({ ...errors, scheduleHour: 'Required!' });
                                } else if (!values.scheduleDays.length) {
                                    setErrors({ ...errors, scheduleDays: 'Required!' });
                                } else {
                                    setErrors({});
                                }
                            }}
                            loading={controller.isLoading}
                        >
                            {' '}
                            Create Restaurant{' '}
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
