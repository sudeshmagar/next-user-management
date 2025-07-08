"use client";
import { Form, Input } from "antd";
import {toast} from '@sudeshmagar/antd-extended-lib'
import {Card, Button} from '@sudeshmagar/antd-extended-lib'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValues = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const router = useRouter();

    const onFinish = async (values: FormValues) => {
        const result = await signIn("credentials", {
            redirect: false,
            ...values
        });

        if (result?.error) {
            toast.error("Invalid credentials");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-96 shadow-xl !rounded-2xl">
                <Card.Header title="Login to your account" description="admin@sudeshmagar.com / Admin@123"/>
                <Card.Content>
                    <Form
                        name="login"
                        initialValues={{ remember: true}}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item<FormValues>
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FormValues>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter your password!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button customVariant="success" size="large" htmlType="submit" block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card.Content>

            </Card>
        </div>
    );
}