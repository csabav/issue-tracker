export interface User {
    id: number,
    email: string,
    username: string,
    password?: string,
    firstName: string,
    lastName: string,
    userLevelID: number,
    token?: string
}