import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://wxhnketpkh.execute-api.ap-south-1.amazonaws.com/Tasks"
      );

      const data = await response.json();

      setTasks(data);
      console.log("Tasks received:", data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await fetch(
        "https://wxhnketpkh.execute-api.ap-south-1.amazonaws.com/Tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Title: taskName,
            Status: "Pending",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
      fetchTasks();
      setTaskName("");

      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  const updateTask = async (taskId) => {
    try {
      const response = await fetch(
        "https://wxhnketpkh.execute-api.ap-south-1.amazonaws.com/Tasks",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TaskId: taskId,
            Status: "Completed",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        "https://wxhnketpkh.execute-api.ap-south-1.amazonaws.com/Tasks",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TaskId: taskId,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: "30px" }}>
          <h1>🚀 Welcome to My First AWS React Project</h1>

          <h2>Hello, {user?.signInDetails?.loginId} 👋</h2>

          <p>You have successfully logged in using Amazon Cognito.</p>

          <label>Task Name</label>

          <br />
          <br />

          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Task Name"
          />

          <br />
          <br />

          <button onClick={addTask}>Add Task</button>

          <br />
          <br />

          <h2>📋 My Tasks</h2>

          <ul>
            {tasks.map((task) => (
              <li key={task.TaskId}>
                {task.Title} - {task.Status}

                <button
                  onClick={() => updateTask(task.TaskId)}
                  style={{ marginLeft: "10px" }}
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteTask(task.TaskId)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button onClick={signOut}>Sign Out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;