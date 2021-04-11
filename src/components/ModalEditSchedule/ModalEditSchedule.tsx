import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { Select, Form, SubmitButton } from 'formik-antd';
import { RestaurantInterface, RestaurantReducerInterface } from '../../interfaces/Restaurant/restaurant.interface';
import { Formik } from 'formik';
import { ScheduleSchema } from '../../schema/Schedule/schedule.schema';
import { TimePicker } from 'antd';
import moment from 'moment';

export interface ModalEditScheduleProps {
    handleOpen: () => void;
    handleSubmit: (input: Partial<RestaurantInterface>, clearState?: () => void, handleOpen?: () => void) => void;
    isVisible: boolean;
    isLoading: boolean;
    restaurant: RestaurantReducerInterface;
}

export const ModalEditSchedule = (props: ModalEditScheduleProps) => {
    return (
        <Modal footer={null} title="Schedule Config" onCancel={props.handleOpen} visible={props.isVisible}>
            <Formik
                onSubmit={(values) => {
                    props.handleSubmit(
                        {
                            scheduleDays: values.scheduleDays,
                            scheduleHour: [values.scheduleHour[0], values.scheduleHour[1]],
                        },
                        undefined,
                        props.handleOpen,
                    );
                }}
                initialValues={{
                    scheduleDays: props.restaurant.scheduleDays || [''],
                    scheduleHour: [props.restaurant.scheduleHour?.[0] || '', props.restaurant.scheduleHour?.[1] || ''],
                }}
                validationSchema={ScheduleSchema}
            >
                {({ values, setValues, setErrors, errors }) => (
                    <Form>
                        <Form.Item name="scheduleDays">
                            <label> Days </label>
                            <Select
                                style={{ width: '100%' }}
                                mode="multiple"
                                defaultValue={props.restaurant.scheduleDays}
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
                        <Form.Item name="scheduleHour">
                            <label> Schedule Hour </label>
                            <br />
                            <TimePicker.RangePicker
                                defaultValue={[
                                    moment(props.restaurant.scheduleHour?.[0], 'h:mm a'),
                                    moment(props.restaurant.scheduleHour?.[1], 'h:mm a'),
                                ]}
                                onChange={(_, stringFormat) => {
                                    setValues({ ...values, scheduleHour: stringFormat });
                                }}
                                format="h:mm a"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <SubmitButton
                            loading={props.isLoading}
                            onClick={(_) => {
                                if ((values.scheduleHour && values.scheduleHour.length !== 2) || !values.scheduleHour) {
                                    setErrors({ ...errors, scheduleHour: 'Required!' });
                                } else if (
                                    (values.scheduleDays && !values.scheduleDays.length) ||
                                    !values.scheduleDays
                                ) {
                                    setErrors({ ...errors, scheduleDays: 'Required!' });
                                } else {
                                    setErrors({});
                                }
                            }}
                        >
                            Save
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
