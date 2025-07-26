## Bugs, Issues, Features to Be Added, Performance Improvement Ideas, etc

The dates are for when I ADDED these to the list, not when I completed them. The date for when they were completed can only be determined from the commit history

#### 26th July, 2025

1. Limit OTP requests to one every minute

#### 25th July, 2025

1. (Done) Getting an error on password reset. It says password reset successfully and runs onSuccess logic even though an error was thrown by axios because the OTP didn't match.

2. (Done) Create handlers for verifying the reset OTP and then moving on to getting the new password and updating it in the db. Would need to reconfigure the controller for this

3. (Done. Needed to use mutateAsync instead of mutate) Find out how to use toast.promise() with how my current async logic is written. Is it even possible?

#### 24th July, 2025

1. (Done) Refreshing on /account leads you to /not-found. My guess is that the user is navigated before initializeAuth finishes running. This leads to another big issue which is the following one
   - I've made it so that, if there's an error while fetching the user's data, it's probably going to be because the user's logged out or is unauthorized. This shows him a toast message and navigates to "/login". But if the user IS logged in, it only takes a few ms to fetch their data during which time, a loading state is shown as it should be.

2. (Nothing to change. It was using Zustand state as it should) I think right now, the user is being logged in based on the initializeAuth Query's response, instead of the state in Zustand. What's the point of using an isLoggedIn state if I'm not using it as intended.

3. (Done) Add icons in name, email, and password fields for a better UI.

4. (Done) Add a spinner for loading state

5. (Done) Add a spinner for loading state of TodoList, Account, and other components if necessary

6. Create a better theme
