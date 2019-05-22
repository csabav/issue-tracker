/**
 * The Note interface
 *
 */
export interface Note {
    id?: number,
    createdOn?: Date,
    issueId: number,
    userId: number,
    statusId: number,
    text: string
}