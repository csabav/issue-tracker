/**
 * The Priority interface
 *
 */
export interface Priority {
    id: number,
    name: string,
    /**
     * It is a pre-defined value for assuring the order of priorities
     *
     * @type {number}
     */
    delay: number
}