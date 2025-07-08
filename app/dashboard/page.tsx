import { Col, Row, Statistic, Button, Card } from "antd";
import { TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import ProtectedRoute from "@/components/protected-route";

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div className="p-6">
                <h1 className="text-center mb-6 text-3xl font-bold">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((item) => (
                        <Card key={item} className="!rounded-2xl">
                            <Statistic
                                title={`Metric ${item}`}
                                value={Math.floor(Math.random() * 1000)}
                            />
                        </Card>
                    ))}
                </div>

                <Card className="mb-6 !rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">User Management</h2>
                        <Link href="/dashboard/users/create">
                            <Button type="primary" icon={<UserAddOutlined />}>
                                Add New User
                            </Button>
                        </Link>
                    </div>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Card className="text-center hover:shadow-lg transition-shadow !rounded-2xl">
                                <TeamOutlined className="text-4xl mb-4 text-blue-500" />
                                <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                                <p className="mb-4">View, edit, and manage all user accounts</p>
                                <Link href="/dashboard/users">
                                    <Button type="primary">Go to User List</Button>
                                </Link>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="text-center hover:shadow-lg transition-shadow !rounded-2xl">
                                <UserAddOutlined className="text-4xl mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Create Users</h3>
                                <p className="mb-4">Add new users to the system</p>
                                <Link href="/dashboard/users/create">
                                    <Button type="primary">Create New User</Button>
                                </Link>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="text-center hover:shadow-lg transition-shadow !rounded-2xl">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">User Analytics</h3>
                                <p className="mb-4">View detailed user statistics and reports</p>
                                <Button disabled>Coming Soon</Button>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        </ProtectedRoute>
    );
}