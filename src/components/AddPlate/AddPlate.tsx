import { Button, TimePicker, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { Fragment } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAddPlate } from '../../controllers/add-plate.controller';
import { InputNumber, Tag, Input as InputAntd } from 'antd';
import { Input, Form, SubmitButton } from 'formik-antd';
import { BsPlus } from 'react-icons/bs';
import { Formik } from 'formik';
import { PlateSchema } from '../../schema/Plate/plate.schema';
import { Upload, message } from 'antd';
import { BsFillImageFill } from 'react-icons/bs';
import { RcFile } from 'antd/lib/upload';
import moment from 'moment';

export interface CreatePlate {
    title: string;
    description: string;
    price: string;
    ingredients: string[];
    preparationTime: string[];
    image?: string;
}

export interface AddPlateProps {
    menuId: number;
}

export const AddPlate = (props: AddPlateProps) => {
    const controller = useAddPlate();

    return (
        <Fragment>
            <Button onClick={controller.handleOpen} type="primary">
                <div className="flex flex-row items-center space-x-2">
                    <AiOutlinePlus />
                    <span> Add Plate </span>
                </div>
            </Button>
            <Modal footer={null} onCancel={controller.handleOpen} visible={controller.visible}>
                <Formik
                    onSubmit={(values, children) => controller.createPlate(values, props.menuId, children)}
                    validationSchema={PlateSchema}
                    initialValues={
                        {
                            title: '',
                            description: '',
                            price: '',
                            ingredients: controller.tags.tags,
                            preparationTime: [],
                            image: undefined,
                        } as CreatePlate
                    }
                >
                    {({ values, setValues, errors, touched, setTouched, handleReset }) => {
                        const ingredients = (
                            <>
                                {controller.tags.tags.map((tag, index) => {
                                    if (controller.tags.editInputIndex === index) {
                                        return (
                                            <InputAntd
                                                ref={controller.inputRef}
                                                key={tag}
                                                size="small"
                                                className="tag-input transition-all"
                                                value={controller.tags.editInputValue}
                                                onChange={controller.handleEditInputChange}
                                                onBlur={() => controller.handleEditInputConfirm(setValues)}
                                                onPressEnter={() => controller.handleEditInputConfirm(setValues)}
                                            />
                                        );
                                    }

                                    const isLongTag = tag.length > 20;

                                    const tagElem = (
                                        <Tag
                                            className="edit-tag transition-all"
                                            key={tag}
                                            closable
                                            onClose={() => controller.handleClose(tag, setValues)}
                                        >
                                            <span onDoubleClick={(e) => controller.handleDoubleClick(index, tag, e)}>
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </span>
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {controller.tags.inputVisible && (
                                    <InputAntd
                                        placeholder="Type some ingredient..."
                                        ref={controller.inputRef}
                                        type="text"
                                        size="small"
                                        className="tag-input transition-all"
                                        value={controller.tags.inputValue}
                                        onChange={controller.handleInputChange}
                                        onBlur={() => controller.handleInputConfirm(setValues)}
                                        onPressEnter={() => controller.handleInputConfirm(setValues)}
                                    />
                                )}
                                {!controller.tags.inputVisible && (
                                    <Button size="small" style={{ padding: '0px 5px' }} onClick={controller.showInput}>
                                        <div className="flex flex-row items-center space-x-1">
                                            <BsPlus />
                                            <span className="text-xs">New Ingredient</span>
                                        </div>
                                    </Button>
                                )}
                            </>
                        );
                        return (
                            <Form layout="vertical">
                                <Form.Item name="title" required label="Title">
                                    <Input name="title" />
                                </Form.Item>
                                <Form.Item name="description" required label="Description">
                                    <Input.TextArea
                                        onChange={(e) => setValues({ ...values, description: e.target.value })}
                                        name="description"
                                        autoSize={{ minRows: 5, maxRows: 5 }}
                                    />
                                </Form.Item>
                                <Form.Item name="price" required label="Price" className="w-full">
                                    <Input
                                        name="price"
                                        prefix="$"
                                        suffix="USD"
                                        style={{ width: '100%' }}
                                        className="w-full"
                                    />
                                </Form.Item>
                                <Form.Item label="Ingredients" required name="ingredients">
                                    {ingredients}
                                </Form.Item>
                                <TimePicker.RangePicker
                                    onFocus={() => setTouched({ ...touched, preparationTime: true })}
                                    onChange={(moment, stringValue) =>
                                        setValues({ ...values, preparationTime: stringValue })
                                    }
                                    name="preparationTime"
                                    format="h:mm"
                                    style={{
                                        width: '100%',
                                        borderColor: errors.preparationTime && touched.preparationTime ? 'red' : '',
                                    }}
                                />
                                {errors.preparationTime && touched.preparationTime && (
                                    <span className="text-red-500">{errors.preparationTime}</span>
                                )}
                                <br />
                                <br />
                                <Form.Item
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    name="image"
                                >
                                    <div className="w-full flex flex-col items-center justify-center full-w-children">
                                        <Upload.Dragger
                                            className="inline-block w-full"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                width: '100%',
                                                borderColor: errors.image ? 'red' : '',
                                            }}
                                            onRemove={() => controller.handleRemovePhoto(setValues)}
                                            listType="picture"
                                            fileList={
                                                controller.fileList
                                                    ? [
                                                          {
                                                              originFileObj: controller.fileList,
                                                              name: controller.fileList.name,
                                                              size: controller.fileList.size,
                                                              type: controller.fileList.type,
                                                              uid: controller.fileList.uid,
                                                          },
                                                      ]
                                                    : undefined
                                            }
                                            beforeUpload={(file) => controller.beforeUpload(file, setValues)}
                                        >
                                            {controller.previewImage ? (
                                                <img className="inline-block" src={controller.previewImage} />
                                            ) : (
                                                <div className="w-full">
                                                    <BsFillImageFill className="inline-block text-6xl" />
                                                    <p className="ant-upload-text">
                                                        Click or drag file to this area to upload
                                                    </p>
                                                    <p className="ant-upload-hint">
                                                        Only images smaller than 2 MegaBytes.
                                                    </p>
                                                </div>
                                            )}
                                        </Upload.Dragger>
                                    </div>
                                </Form.Item>
                                <br />
                                <SubmitButton loading={controller.isLoading}>Submit</SubmitButton>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </Fragment>
    );
};
