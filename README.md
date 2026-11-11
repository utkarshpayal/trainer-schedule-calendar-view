# Trainer Schedule – Calendar View

A training-center scheduling portal with separate views for **trainers** and **administrators**. Trainers sign in to see their own sessions on a calendar; admins see every trainer's schedule, filter by trainer, view summary stats and add new sessions.

> **Status:** front-end prototype. Login uses hard-coded demo accounts, and sessions are mock data held in React state (new sessions are lost on reload). There is no backend or persistence.

## Features

### Login
- Email/password sign-in form (`src/components/LoginPage.tsx`) that routes the user to the trainer or admin view based on role.
- Demo accounts (three trainers and one admin) are shown on the login screen and defined in `LoginPage.tsx`.

### Trainer dashboard (`Dashboard.tsx`)
- Stats: total sessions, sessions this month, total hours and students.
- "Today's Sessions" and "Upcoming" (next 7 days) lists.
- Month/week calendar (`CalendarView.tsx`) with previous/next navigation; clicking a session opens a details dialog (date, time, duration, location, participants, status, trainer).

### Admin dashboard (`AdminDashboard.tsx`)
- Header with admin identity and logout (`AdminHeader.tsx`).
- Stats cards: total sessions, active trainers, confirmed sessions, total participants (`AdminStats.tsx`).
- Trainer filter (`TrainerSelector.tsx`) and month/week calendar of all sessions.
- "Add Session" dialog (`AddSessionDialog.tsx`) with course name, trainer, date, time, duration, location, participants and status (confirmed / pending / cancelled).

## Tech stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) in `src/components/ui`
- date-fns, lucide-react icons, React Router, TanStack Query provider

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

The dev server is configured in `vite.config.ts` to listen on port **8080**. Sign in with one of the demo accounts listed on the login page.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run build:dev` | Build using development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

No test script is configured.

## Configuration

No environment variables are used.

## Project structure

```
src/
  pages/Index.tsx   # Shows LoginPage, trainer Dashboard or AdminDashboard based on the signed-in user
  components/       # LoginPage, Dashboard, AdminDashboard, CalendarView, AddSessionDialog, Admin* widgets, TrainerSelector
  components/ui/    # shadcn/ui components
```
