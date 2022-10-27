export enum BuyerStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'INACTIVE'
}

export enum UserStatus {
    CONFIRMED = 'CONFIRMED',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED',
    BANNED = 'BANNED',
    DELETED = 'DELETED'
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    EDITOR = 'EDITOR'
}

export enum LoggedInStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    AWAY = 'AWAY',
    BUSY = 'BUSY'
}

export enum TokenTypes {
    PWDRESET = 'PASSWORD_RESET'
}

