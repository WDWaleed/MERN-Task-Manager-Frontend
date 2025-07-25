## Bugs, Issues, Features to Be Added, Performance Improvement Ideas, etc

#### 25th July, 2025

1. (Done) Getting an error on password reset. It says password reset successfully and runs onSuccess logic even though an error was thrown by axios because the OTP didn't match.

2. (Done) Create handlers for verifying the reset OTP and then moving on to getting the new password and updating it in the db. Would need to reconfigure the controller for this

3. Find out how to use toast.promise() with how my current async logic is written. Is it even possible?

#### 24th July, 2025

1. Refreshing on /account leads you to /not-found. My guess is that the user is navigated before initializeAuth finishes running. This leads to another big issue which is the following one

2. I think right now, the user is being logged in based on the initializeAuth Query's response, instead of the state in Zustand. What's the point of using an isLoggedIn state if I'm not using it as intended.

3. Add icons in name, email, and password fields for a better UI.

4. Add a spinner for loading state

5. Add a spinner for loading state of TodoList

6. Create a better theme
