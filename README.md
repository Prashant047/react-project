This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

### OR

### Running with Docker
```bash
cd react-project
docker build -t book-keeper .
docker run -p 3000:3000 book-keeper
```

### OR

### Running with docker-compose

```bash
cd react-project
docker-compose up
```

Project runs on [http://localhost:3000](http://localhost:3000)


## Project Overview

**Book_Keeper** is a simple application designed to help you track your book reading progress. This app allows you to keep a detailed record of the books you're reading, have read, or plan to read in the future.

### Tech Stack

- **Next.js:**  
  The application is built using Next.js, a powerful React framework that provides rich set of features out of the box. It ensures that the app is fast, scalable, and easy to maintain.

- **Tailwind CSS:**  
  Tailwind CSS is used for styling the application

- **Shadcn/UI:**  
  Shadcn/UI is utilized for UI components, providing a collection of pre-designed components that integrate seamlessly with Tailwind CSS.
- **Formik:**  
  Formik is integrated for form management, making it simple to handle form state, validation, and submission.
  
- **JSON File for Data Persistence:**  
  Instead of using a traditional database, this application uses a plain JSON file as the data persistence layer. It was simple and easy to implement for rapid testing
