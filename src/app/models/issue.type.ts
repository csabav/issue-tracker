export interface Issue {
    id: number,
    createdOn: Date,
    title: string,
    description: string,
    assignedToId: number,
    createdById: number,
    statusId: number,
    categoryId: number,
    priorityId: number,
    dueOn: Date
}