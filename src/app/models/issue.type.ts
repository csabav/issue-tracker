export interface Issue {
    id: number,
    createdOn: Date,
    title: string,
    description: string,
    assignedToID: number,
    createdByID: number,
    statusID: number,
    categoryID: number,
    priorityID: number
    dueOn: Date
}