/**
 * The Issue interface
 *
 */
export interface Issue {
    id: number,
    createdOn: Date,
    title: string,
    description: string,
    dueOn: Date,
    assignedToId?: number,
    createdById: number,
    statusId: number,
    categoryId: number,
    priorityId: number
}