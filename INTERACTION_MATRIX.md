# Interaction Matrix

## Navigation

| Component | Role | Action | Destination | Status |
|---|---|---|---|---|
| Dashboard | Admin | Click | Operations Center | Working in current app.js |
| Students | Admin | Click | Student Management | Working in current app.js |
| Classes | Admin | Click | Weekly Schedule | Working in current app.js |
| Attendance | Admin, Instructor, Parent | Click | Attendance View | Working in current app.js |
| Progress | Admin, Instructor, Parent | Click | Belt Passport | Working in current app.js |
| Payments | Admin, Parent | Click | Payments | Working in current app.js |
| Payments | Instructor | Click | Restricted State | Working in current app.js |
| Reports | Admin, Instructor | Click | Reports | Working in current app.js |
| Reports | Parent | Click | Restricted State | Working in current app.js |
| Settings | Admin | Click | Settings | Working in current app.js |

## Required Fixes

| Component | Issue | Required Behavior |
|---|---|---|
| Quick Actions | Buttons need explicit handlers | Mark attendance opens Attendance; Record payment opens Payments; Schedule grading opens Progress |
| Parent phone Pay | Needs handler | Opens Payments for Parent/Admin |
| Action cards | Future cards need data-action | Route to target view or show disabled state |
| Mobile nav | Must mirror sidebar | All data-view buttons should update active state |
| Role switcher | Should remove demo wording | Admin, Instructor, Parent remain available |

## Production Rule

Every visible button must either navigate, update state, or show an intentional disabled/restricted message.
