import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const API_URL =
    "https://wxhnketpkh.execute-api.ap-south-1.amazonaws.com/Tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Unexpected response:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!taskName.trim()) {
      alert("Please enter a task name");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: taskName,
          Status: "Pending",
        }),
      });

      const data = await response.json();

      alert(data.message);

      setTaskName("");
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  const updateTask = async (taskId) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: taskId,
          Status: "Completed",
        }),
      });

      const data = await response.json();

      alert(data.message);

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: taskId,
        }),
      });

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
        <main
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h1>🚀 Welcome to My First AWS React Project</h1>

          <h2>Hello, User 👋</h2>

          <p>You have successfully logged in using Amazon Cognito.</p>

          <label
            style={{
              fontWeight: "bold",
            }}
          >
            Task Name
          </label>

          <br />
          <br />

          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Task Name"
            style={{
              width: "320px",
              padding: "10px",
              fontSize: "16px",
            }}
          />

          <br />
          <br />

          <button
            onClick={addTask}
            disabled={!taskName.trim()}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ➕ Add Task
          </button>

          <br />
          <br />

          <h2>📋 My Tasks</h2>

          <ul style={{ paddingLeft: "20px" }}>
            {tasks.map((task) => (
              <li
                key={task.TaskId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    minWidth: "340px",
                    fontWeight: "bold",
                    color:
                      task.Status === "Completed"
                        ? "green"
                        : "darkorange",
                  }}
                >
                  {task.Title} - {task.Status}
                </span>

                {task.Status !== "Completed" && (
                  <button
                    onClick={() => updateTask(task.TaskId)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    ✅ Complete
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task.TaskId)}
                  style={{
                    padding: "6px 12px",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>

          <br />

          <button
            onClick={signOut}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🚪 Sign Out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;