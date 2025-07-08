"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, DatePicker, Select, Spin, Typography } from "antd";
import { Card, Button, toast } from '@sudeshmagar/antd-extended-lib';
import { useParams, useRouter } from "next/navigation";
import { User, UserFormValues } from "@/types";
import dayjs from "dayjs";
import { useEffect } from "react";
import {fetchUser, updateUser} from "@/lib/mockUser";

const { Title } = Typography;

// const statuses = ['active', 'inactive', 'pending'] as const;
// const roles = ['admin', 'user', 'manager'] as const;

// const fetchUser = async (id: string): Promise<User> => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     const user = await res.json();
//     return {
//         ...user,
//         status: statuses[Math.floor(Math.random() * statuses.length)] ,
//         role: roles[Math.floor(Math.random() * roles.length)],
//     };
// };
//
// const updateUser = async ({ id, data }: { id: string; data: UserFormValues }): Promise<User> => {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve({ ...data, id: parseInt(id) } as User), 1000);
//     });
// };

export default function EditUserPage() {
    const [form] = Form.useForm<UserFormValues>();
    const { userId } = useParams<{ userId: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<User>({
        queryKey: ["user", userId],
        queryFn: () => fetchUser(userId)
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                dob: data.dob ? dayjs(data.dob) : undefined
            });
        }
    }, [data, form]);

    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            router.push("/dashboard/users");
        },
        onError: (error: Error) => {
            toast.error(`Error updating user: ${error.message}`);
        }
    });

    const onFinish = (values: UserFormValues) => {
        mutation.mutate({ id: userId, data: values });
    };

    if (isLoading) return <Spin className="flex justify-center mt-8" />;

    return (
        <div className="p-6">
            <Title level={2} className="mb-6">Edit User</Title>

            <Card className="max-w-4xl mx-auto">
                <Form<UserFormValues>
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
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
                        rules={[{ required: true, message: "Please input the address!" }]}
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
                            Update User
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