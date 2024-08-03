# ✒️ Kumo - Serverless blog website

Serverless blogging website with notion like editor. Made with Cloudflare workers, Hono and NextJs.

## Features
- Create, Update, Delete blogs
- JWT auth handling with password salting using bcryptJs
- Notion like editor for writing blogs
- Dark/Light theme using next themes

## Tech Stack
- NextJs
- Hono
- Postgres
- Cloudflare workers
- ShadCN UI
- Prisma ORM
- Turbo repo
- TypeScipt
- Novel editor
- Tailwind CSS

## TODO
- Likes counter
- Comment section
- User dashboard
- Tags and Interests system
- Dockerise the app
- Subscription model
- Follow/Unfollow functionality

### Steps to run the project locally

1. Run the following command to install all dependencies:

```sh
npm i
```

2. Create a file called wrangler.toml in apps/backend and update the variables as per the example file

3. Create a file called .env in apps/backend and update the variables as per the example file 

4. Then generate prisma client using these command

```sh
cd ./apps/backend
npx prisma generate
```

5. Then run the build from root using
```sh
  npm run dev
```
