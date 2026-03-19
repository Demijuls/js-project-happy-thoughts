# Happy Thoughts project, Front-End

[Check out the demo!](https://happy-thoughts-byjd.netlify.app/)
No sign-up needed to see the feed, but register a user to submit and manage your own thoughts.

## Simple social media messaging app built in React

Simple social media messaging app where users can post, like, edit and delete short happy thoughts. Built in React with Vite, featuring optimistic UI updates, animations, and full authentication flow.

### Features

- Browse thoughts — paginated feed of happy thoughts, newest first
- Post a thought — authenticated users can submit new thoughts with live character count (max 140)
- Like a thought — heart button with optimistic update so the UI responds instantly
- Edit & delete — authenticated users can manage their own thoughts
- Auth flow — sign up and log in
- Loading states — Lottie animation shown while the feed loads from the API
- Form validation — inline error messages for empty, too short, or too long submissions

### Tech Stack

- React + Vite
- Styled Components for styling
- Lottie (lottie-react) for animations
- ESLint + Prettier (for readabiity)
- Deployed on Netlify

---

[Backend for the project leaves in this repo here](https://github.com/Demijuls/js-project-api)

[And deployed at Render here](https://get-thoughts-out-api.onrender.com/)

> (OBS! It is deployed on Render, and API goes to sleep after 50 sec on inactivity. Allow some time for it to respond for the first time)
