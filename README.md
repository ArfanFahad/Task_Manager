# A Simple Overview of my App

1. User interacts with UI (click 'add task').

2. Frontend (app.js) sends a request to the backend (e.g., POST /tasks).

3. Backend processes the request (checks, validates, saves to databases).

4. Backend responds with data (e.g., newly added task).

5. Frontend updates the UI to reflect the changes. 

Example API Calls: 

# GET /tasks - fetch all tasks from backend.
# POST /tasks - add a new task.
# PUT /tasks/:id - update a task. 
# DELETE /tasks/:id - delete a task.




# What app.js Will do? 
1. Adding a new task - Taking user input 
2. Display tasks - showing existing task from the backend. 
3. Deleting a task - Removing a task when the user clicks the delete button. 
4. Marking a task as completed - Striking through the text when clicked. 
5. Renaming a task 