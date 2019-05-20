import { User } from '../models/user.type';
import { Issue } from '../models/issue.type';
import { Status } from '../models/status.type';
import { Category } from '../models/category.type';
import { Priority } from '../models/priority.type';
import { Note } from '../models/note.type';

// export let Users: User[] = [
//     { id: 1, email: "admintester@issuetracker.com", username: "admin", password: "admin", firstName: "Admin", lastName: "Tester", userLevelId: 1 },
//     { id: 2, email: "tester@issuetracker.com", username: "test", password: "test", firstName: "Test", lastName: "Tester", userLevelId: 2 }
// ];

// export let Issues: Issue[] = [
//     { id: 1, createdOn: new Date("2019-05-01"), title: "In CTR (Click through ratio) ‘Total’ row calculation is wrong", description: "1) Go to page: (Provide URL of page where bug occurs)\n2) Click on ‘Publisher stats’ link to view publisher’s revenue detail stats date wise.\n3) On page (Provide URL of page where bug occurs) check CTR value in ‘Total’ row of CTR stats table.\n\nActual result: Calculation of ‘Total’ row in CTR table is wrong. Also Individual row CTR for each publisher is not truncated to 2 digits after decimal point. It’s showing CTR like 0.042556767.\n\nExpected result: Total CTR= (Total clicks/Total searches)*100\n\nPlease fix the bug", assignedToId: 100, createdById: 101, statusId: 100, categoryId: 101, priorityId: 101, dueOn: new Date("2019-06-01") },
//     { id: 2, createdOn: new Date("2019-05-05"), title: "Application crash on clicking the SAVE button while creating a new user", description: "Application crash on clicking the SAVE button while creating a new user, hence unable to create a new user in the application.\n\nSteps To Reproduce:\n1) Logon into the application\n2) Navigate to the Users Menu > New User\n3) Filled all the fields\n4) Clicked on ‘Save’ button\n5) Seen an error page “ORA1090 Exception: Insert values Error…”\n6) See the attached logs for more information\n7) And also see the attached screenshot of the error page.\n\nExpected: On clicking SAVE button should be prompted to a success message “New User has been created successfully”.", assignedToId: 100, createdById: 101, statusId: 100, categoryId: 101, priorityId: 100, dueOn: new Date("2019-06-01") }
// ];

// export let Statuses: Status[] = [
//     { id: 100, name: "Created" },
//     { id: 101, name: "In Progress" },
//     { id: 102, name: "Done" },
//     { id: 103, name: "Closed" }
// ];

// export let Categories: Category[] = [
//     { id: 1, name: "Task" },
//     { id: 2, name: "Bug" }
// ];

// export let Priorities: Priority[] = [
//     { id: 1, name: "Higher", delay: 100 },
//     { id: 2, name: "Medium", delay: 200 },
//     { id: 3, name: "Lower", delay: 300 }
// ]

export let Notes: Note[] = [
    {id: 1, createdOn: new Date("2019-05-01 19:38"), issueId: 2, userId: 1, statusId: 100, text: "Created this ticket for you, please hit it first thing in the morning."},
    {id: 2, createdOn: new Date("2019-05-02 09:22"), issueId: 2, userId: 2, statusId: 101, text: "Starting to work on this now. Will keep you updated."}
]

export let FakeDb: any = {
    // Users: Users,
    // Issues: Issues,
    // Statuses: Statuses,
    // Categories: Categories,
    // Priorities: Priorities,
    Notes: Notes
};