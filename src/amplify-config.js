import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_QZ90bWgOY",
      userPoolClientId: "2mtsv4kf0qod7ri3p4v3ro41p6",
      loginWith: {
        email: true,
      },
    },
  },
});