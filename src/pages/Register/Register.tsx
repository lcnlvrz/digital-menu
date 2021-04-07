import React from 'react';
import { Logo } from '../../components/Logo/Logo';
import { RegisterInitialValue } from '../../initial-values/Register';
import { RegisterSchema } from '../../schema/Register';
import { Button } from 'antd';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useRegister } from '../../controllers/register.controller';

export const Register = (): JSX.Element => {
    const controller = useRegister();

    return (
        <section className="w-full flex flex-row">
            <aside className="w-2/4 h-screen relative bg-black">
                <div className="absolute h-full z-30 flex flex-col items-center justify-evenly w-full p-3">
                    <div className="flex flex-col space-y-3">
                        <Logo logoClassName="text-white text-6xl" textClassName="text-white text-2xl" />
                        <p className="text-white text-center justify-center font-light text-lg">
                            {' '}
                            The first free application for manage restaurant orders in LATAM.{' '}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white font-semibold text-2xl text-center">Known around here?</span>
                        <Link to="/login" className="w-full text-center">
                            <Button className="w-full" type="default" ghost>
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
                <img className="h-full object-cover opacity-40" src="https://wallpaperaccess.com/full/3353887.jpg" />
            </aside>
            <main className="w-2/4 h-screen flex items-center justify-center flex-col">
                <div className="w-3/4">
                    <h1 className="text-3xl"> Sign Up. </h1>
                </div>
                <br />
                <Formik
                    onSubmit={(values) => controller.register(values)}
                    validationSchema={RegisterSchema}
                    initialValues={RegisterInitialValue}
                    render={() => (
                        <Form className="w-3/4">
                            <Form.Item name="firstName">
                                <label> First Name </label>
                                <Input name="firstName" />
                            </Form.Item>
                            <Form.Item name="lastName">
                                <label> Last Name </label>
                                <Input name="lastName" />
                            </Form.Item>
                            <Form.Item name="email">
                                <label> Email </label>
                                <Input name="email" />
                            </Form.Item>
                            <Form.Item name="password">
                                <label> Password </label>
                                <Input.Password name="password" />
                            </Form.Item>
                            <SubmitButton loading={controller.isLoading} className="w-full">
                                {' '}
                                Register{' '}
                            </SubmitButton>
                        </Form>
                    )}
                />
            </main>
        </section>
    );
};
