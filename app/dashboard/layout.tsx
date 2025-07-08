"use client";
import { Layout, Menu, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, DashboardOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/protected-route";
import {Toaster} from "@sudeshmagar/antd-extended-lib";
import {useSession} from "next-auth/react";

const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
    {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
        key: "users",
        icon: <UserSwitchOutlined />,
        label: <Link href="/dashboard/users">User Management</Link>,
    },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {

    const {data: users} = useSession();
    return (
        <ProtectedRoute>
            <Toaster position={"top-right"} />
            <Layout className="!min-h-screen">
                <Sider collapsible>
                    <div className="h-8 m-4 text-white text-lg font-bold">Admin Panel</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["dashboard"]}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header className="!bg-white flex justify-between items-center px-6">
                        <div></div>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: "Logout",
                                        icon: <LogoutOutlined />,
                                        onClick: () => signOut({ callbackUrl: "/login" }),
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            <Button type="text" icon={<UserOutlined />} size="large">
                                {users?.user?.name}
                            </Button>
                        </Dropdown>
                    </Header>
                    <Content className="p-6">{children}</Content>
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
}