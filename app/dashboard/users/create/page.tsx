"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, DatePicker, Select, Typography } from "antd";
import { Button, Card, toast} from "@sudeshmagar/antd-extended-lib"
import { useRouter } from "next/navigation";
import { UserFormValues} from "@/types";
import {createUser} from "@/lib/mockUser";

const { Title } = Typography;

// const createUser = async (user: UserFormValues): Promise<User> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 ...user,
//                 id: Math.floor(Math.random() * 10000),
//             });
//         }, 1000);
//     });
// };

export default function CreateUserPage() {
    const [form] = Form.useForm<UserFormValues>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            router.push("/dashboard/users");
        },
        onError: (error: Error) => {
            toast.error(`Error creating user: ${error.message}`);
        }
    });

    const onFinish = (values: UserFormValues) => {
        mutation.mutate(values);
    };

    return (
        <div className="p-6">
            <Title level={2} className="mb-6">Create New User</Title>

            <Card className="max-w-4xl mx-auto">
                <Form<UserFormValues>
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        status: "active",
                        role: "user"
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[{ required: true, message: "Please input the name!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input the email!" },
                                { type: "email", message: "Please enter a valid email!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: "Please input the phone number!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Birth Date"
                            name="dob"
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                                <Select.Option value="pending">Pending</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="user">Regular User</Select.Option>
                                <Select.Option value="manager">Manager</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={mutation.isPending}
                            className="mr-4"
                        >
                            Create User
                        </Button>
                        <Button onClick={() => router.push("/dashboard/users")}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}