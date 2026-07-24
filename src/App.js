import { Authenticator } from '@aws-amplify/ui-react';

function App() {

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
            Title: "Learn AWS Full Stack",
            Status: "Pending",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

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