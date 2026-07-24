import { useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  const [taskName, setTaskName] = useState("");

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
      setTaskName("");

      console.log(data);

    } catch (error) {

      console.error(error);
      alert("Failed to add task");

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

<input
  type="text"
  value={taskName}
  onChange={(e) => setTaskName(e.target.value)}
  placeholder="Enter Task Name"
/>

<br />
<br />

          <button onClick={addTask}>
            Add Task
          </button>

          <br /><br />

          <button onClick={signOut}>
            Sign Out
          </button>

        </main>
      )}
    </Authenticator>
  );
}

export default App;