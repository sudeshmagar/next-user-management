"use client";
import { useQuery } from "@tanstack/react-query";
import { Table, Input, Space, Typography, Tag } from "antd";
import {Button, Card} from "@sudeshmagar/antd-extended-lib"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { User } from "@/types";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import ProtectedRoute from "@/components/protected-route";

const { Title } = Typography;

const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
};

export default function UsersPage() {
    const [searchText, setSearchText] = useState("");
    const { data, isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers
    });

    const filteredData = data?.map(user => ({
        ...user,
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'pending',
        role: ['admin', 'user', 'manager'][Math.floor(Math.random() * 3)] as 'admin' | 'user' | 'manager'
    })).filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const statusColors = {
        active: 'green',
        inactive: 'red',
        pending: 'orange'
    };

    const roleColors = {
        admin: 'purple',
        user: 'blue',
        manager: 'cyan'
    };

    const columns: ColumnType<User>[] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Tag color={statusColors[record.status || 'active']}>
                    {record.status?.toUpperCase()}
                </Tag>
            )
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (_, record) => (
                <Tag color={roleColors[record.role || 'user']}>
                    {record.role?.toUpperCase()}
                </Tag>
            )
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Link href={`/dashboard/users/${record.id}`}>
                        <Button size="small">Edit</Button>
                    </Link>
                    <Button size="small" customVariant="danger">
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <ProtectedRoute>
            <div className="p-6">
                <Title level={2} className="mb-6">User Management</Title>

                <Card
                    className="mb-6 !rounded-2xl"
                >
                    <Card.Header extra={
                        <Link href="/dashboard/users/create">
                            <Button customVariant="success" icon={<PlusOutlined />}>
                                Add User
                            </Button>
                        </Link>
                    } />
                    <div className="mb-4">
                        <Input
                            placeholder="Search users..."
                            prefix={<SearchOutlined />}
                            style={{ width: 300 }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                    </div>

                    <Table<User>
                        columns={columns}
                        dataSource={filteredData}
                        loading={isLoading}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: true }}
                    />
                </Card>
            </div>
        </ProtectedRoute>
    );
}