export interface Repositories {
    _id: string;
    userId: string;
    title: string;
    icon: string | null;
    pin: boolean;
    archieve: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}