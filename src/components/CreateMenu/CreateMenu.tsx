import React, { Fragment } from 'react';
import { Button, Modal } from 'antd';
import { useCreateMenu } from '../../controllers/create-menu.controller';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { MenuSchema } from '../../schema/Menu/menu.schema';

export const CreateMenu = () => {
    const controller = useCreateMenu();

    const modal = (
        <Modal
            footer={null}
            okText="Create"
            title="Create Menu"
            onCancel={controller.handleOpen}
            visible={controller.isOpenModal}
        >
            <Formik
                onSubmit={(values) => controller.createMenu(values)}
                validationSchema={MenuSchema}
                initialValues={{ name: '', description: '' }}
            >
                {({ values, setValues }) => (
                    <Form layout="vertical">
                        <Form.Item
                            name="name"
                            required
                            label={<span className="font-semibold">Name</span>}
                            labelAlign="right"
                        >
                            <Input name="name" placeholder="Recommend start with Menu of..." />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            required
                            label={<span className="font-semibold">Description</span>}
                            labelAlign="right"
                        >
                            <Input.TextArea
                                onChange={(e) => setValues({ ...values, description: e.target.value })}
                                name="description"
                                autoSize={{ minRows: 5, maxRows: 5 }}
                                minLength={25}
                                maxLength={100}
                                placeholder="Shorter, as much as possible"
                            />
                        </Form.Item>
                        <br />
                        <SubmitButton loading={controller.isLoading} type="primary">
                            {' '}
                            Create{' '}
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </Modal>
    );

    return (
        <Fragment>
            <Button onClick={controller.handleOpen} type="primary">
                {' '}
                Create{' '}
            </Button>
            {modal}
        </Fragment>
    );
};
