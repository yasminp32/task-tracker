// Add Project
async function createProject() {
    const name = document.getElementById('projectName').value;
    try {
        const response = await fetch('/api/v1/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error creating project');
    }
}

// Add Task
async function addTask(projectId) {
    document.getElementById('projectId').value = projectId;
    const modal = new bootstrap.Modal(document.getElementById('addTaskModal'));
    modal.show();
}

async function createTask() {
    const projectId = document.getElementById('projectId').value;
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;

    try {
        const response = await fetch('/api/v1/projects/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId,
                name,
                description
            })
        });
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error creating task');
    }
}

// Edit Task
function editTask(taskId, name, description, progress) {
    document.getElementById('editTaskId').value = taskId;
    document.getElementById('editTaskName').value = name;
    document.getElementById('editTaskDescription').value = description;
    document.getElementById('editTaskProgress').value = progress;
    
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

async function updateTask() {
    const id = document.getElementById('editTaskId').value;
    const name = document.getElementById('editTaskName').value;
    const description = document.getElementById('editTaskDescription').value;
    const progress = document.getElementById('editTaskProgress').value;

    try {
        const response = await fetch('/api/v1/projects/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name,
                description,
                progress
            })
        });
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error updating task');
    }
}

// Delete Task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch('/api/v1/projects/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error deleting task');
    }
}
