import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: "30px" }}>
          <h1>🚀 Welcome to My First AWS React Project</h1>

          <h2>Hello, {user?.signInDetails?.loginId} 👋</h2>

          <p>You have successfully logged in using Amazon Cognito.</p>

          <button onClick={signOut}>
            Sign Out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;