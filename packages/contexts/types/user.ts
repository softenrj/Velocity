
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    authType: AuthType;
    role: UserRole;
    package: UserPackage;
    createdAt: Date;
    updatedAt: Date;
}

export enum AuthType {
    TOKEN = "jwt-token"
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export enum UserPackage {
    DEFAULT = 'default',
    PREMIUM = 'premium',
    ELITE = 'elite'
}