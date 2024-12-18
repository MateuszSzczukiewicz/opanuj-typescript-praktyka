export enum UserPermission {
    "VIEW",
    "READ",
    "WRITE",
    "DELETE"
}

export enum UserRole {
    "ADMIN",
    "EDITOR",
    "VIEWER",
}

export interface User {
    role: UserRole;
    permissions: UserPermission[];
}

export function hasAccess(user: User, requiredPermission: UserPermission): boolean {
    if (user.role === UserRole.ADMIN) return true;
    return user.permissions.includes(requiredPermission);
}
