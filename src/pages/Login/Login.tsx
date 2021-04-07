import React from 'react';
import { Logo } from '../../components/Logo/Logo';
import { Button } from 'antd';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { LoginSchema } from '../../schema/Login/login.schema';
import { LoginInitialValue } from '../../initial-values/Login/login.initial-value';
import { useLogin } from '../../controllers/login.controller';

export const Login = (): JSX.Element => {
    const Controller = useLogin();

    return (
        <section className="w-full flex flex-row">
            <aside className="w-2/4 h-screen relative bg-black">
                <div className="absolute h-full z-30 flex flex-col items-center justify-evenly w-full p-3">
                    <div className="flex flex-col space-y-3">
                        <Logo logoClassName="text-white text-6xl" textClassName="text-white text-2xl" />
                        <p className="text-white text-center justify-center font-light text-lg">
                            {' '}
                            Welcome back. Ready to sell and manage your orders? 😎{' '}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white font-semibold text-2xl text-center">New here?</span>
                        <Link to="/register" className="w-full text-center">
                            <Button className="w-full" type="default" ghost>
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
                <img className="h-full object-cover opacity-40" src="https://cdn.hipwallpaper.com/i/65/19/czDu80.jpg" />
            </aside>
            <main className="w-2/4 h-screen flex items-center justify-center flex-col">
                <div className="w-3/4">
                    <h1 className="text-3xl"> Sign in. </h1>
                </div>
                <br />
                <Formik
                    onSubmit={(values) => Controller.login(values)}
                    validationSchema={LoginSchema}
                    initialValues={LoginInitialValue}
                    render={() => (
                        <Form className="w-3/4">
                            <Form.Item name="email">
                                <label> Email </label>
                                <Input name="email" />
                            </Form.Item>
                            <Form.Item name="password">
                                <label> Password </label>
                                <Input.Password name="password" />
                            </Form.Item>
                            <SubmitButton loading={Controller.isLoading} className="w-full">
                                {' '}
                                Login{' '}
                            </SubmitButton>
                        </Form>
                    )}
                />
            </main>
        </section>
    );
};
