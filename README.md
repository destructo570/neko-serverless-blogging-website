# ✒️ Neko - Serverless blog website

Serverless blogging website with notion like editor. Made with Cloudflare workers, Hono and NextJs.

[Live Demo](https://neko-serverless-blogging-website-frontend.vercel.app/)
#### Test Creds
john@test.com : 123456

## Features
- Create, Read, Update and Delete blogs
- JWT auth handling with password salting using bcryptJs
- Notion like editor for writing blogs
- Search all relevant posts
- Like your favorite posts
- Code syntax highlighting support

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
- Tiptap text editor
- Amazon s3 for file storage
- Hono storage for handling multipart form data

## TODO
- [x] Post like functionality
- [x] Upload cover images to s3
- [x] Add search functionality
- [ ] Comment section
- [ ] User dashboard
- [ ] Tags and Interests system
- [ ] Dockerise the app
- [ ] Subscription model
- [ ] Follow/Unfollow functionality

<details>
  <summary><h3>🌈Screenshots</h3></summary>
  
<img src="https://imgur.com/GDx04RC.png" width=40%>
<img src="https://imgur.com/A8CXDHJ.png" width=40%>
<img src="https://imgur.com/NrZudj0.png" width=40%>
<img src="https://imgur.com/c9ZgFIC.png" width=40%>
<img src="https://imgur.com/T1QtXOe.png" width=40%>
<img src="https://imgur.com/T6hR6WF.png" width=40%>
<img src="https://imgur.com/r32e0zZ.png" width=40%>
  
</details>

### Steps to run the project locally

1. Run the following command to install all dependencies:

```sh
npm install
```

2. Create a file called wrangler.toml in apps/backend and update the variables as per the example file

3. Create a file called .env in apps/backend and update the variables as per the example file 

4. Then generate prisma client using these command

```sh
cd ./apps/backend
npx prisma generate
```

5. Then run the build command from root folder using
```sh
  npm run dev
```
