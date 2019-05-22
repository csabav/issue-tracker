/**
 * The User interfcae
 *
 */
export interface User {
    id: number,
    username: string,
    password?: string,
    firstName: string,
    lastName: string,
    
    /**
     * The JWT token used to authorize users
     *
     */
    token?: string
}