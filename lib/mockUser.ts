// lib/mockUsers.ts
import { User, UserFormValues } from "@/types";

// Initialize with some mock data
let users: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-010-1234",
        status: "active",
        role: "admin",
        address: "123 Main St, New York, NY",
        dob: new Date("1985-05-15")
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-010-5678",
        status: "active",
        role: "manager",
        address: "456 Oak Ave, Los Angeles, CA",
        dob: new Date("1990-08-22")
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "555-010-9012",
        status: "inactive",
        role: "user",
        address: "789 Pine Rd, Chicago, IL",
        dob: new Date("1982-11-30")
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "555-010-3456",
        status: "active",
        role: "manager",
        address: "321 Elm St, Houston, TX",
        dob: new Date("1993-04-18")
    },
    {
        id: 5,
        name: "Michael Wilson",
        email: "michael.w@example.com",
        phone: "555-010-7890",
        status: "pending",
        role: "user",
        address: "654 Maple Dr, Phoenix, AZ",
        dob: new Date("1988-07-25")
    },
    {
        id: 6,
        name: "Sarah Brown",
        email: "sarah.b@example.com",
        phone: "555-010-2345",
        status: "active",
        role: "admin",
        address: "987 Cedar Ln, Philadelphia, PA",
        dob: new Date("1991-02-14")
    },
    {
        id: 7,
        name: "David Taylor",
        email: "david.t@example.com",
        phone: "555-010-6789",
        status: "inactive",
        role: "user",
        address: "135 Birch Blvd, San Antonio, TX",
        dob: new Date("1987-09-05")
    },
    {
        id: 8,
        name: "Jennifer Martinez",
        email: "jennifer.m@example.com",
        phone: "555-010-0123",
        status: "active",
        role: "manager",
        address: "246 Walnut St, San Diego, CA",
        dob: new Date("1994-12-08")
    },
    {
        id: 9,
        name: "Thomas Anderson",
        email: "thomas.a@example.com",
        phone: "555-010-4567",
        status: "pending",
        role: "user",
        address: "369 Spruce Ave, Dallas, TX",
        dob: new Date("1980-06-19")
    },
    {
        id: 10,
        name: "Lisa Jackson",
        email: "lisa.j@example.com",
        phone: "555-010-8901",
        status: "active",
        role: "admin",
        address: "482 Pineapple St, San Jose, CA",
        dob: new Date("1995-03-27")
    }
];
// Simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

export const fetchUsers = async (): Promise<User[]> => {
    await simulateDelay();
    return users;
};

export const fetchUser = async (id: string): Promise<User> => {
    await simulateDelay();
    const user = users.find(u => u.id === parseInt(id));
    if (!user) throw new Error("User not found");
    return user;
};

export const createUser = async (userData: UserFormValues): Promise<User> => {
    await simulateDelay();
    const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id), 0) + 1
    };
    users.push(newUser);
    return newUser;
};

export const updateUser = async ({ id, data }: { id: string; data: UserFormValues }): Promise<User> => {
    await simulateDelay();
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error("User not found");

    const updatedUser = { ...users[index], ...data, id: parseInt(id) };
    users[index] = updatedUser;
    return updatedUser;
};

export const deleteUser = async (id: number): Promise<void> => {
    await simulateDelay();
    users = users.filter(u => u.id !== id);
};