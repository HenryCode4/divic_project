Nextjs Backend test task

Key Features:
🔐 Nestjs
nestjs/jwt
Prisma
bcryptjs
validator
cookies

---------------------------------------------------------------------------------

Prerequisites
Nestjs

--------------------------------------------------------------------------------

Cloning the repository
https://github.com/HenryCode4/divic_project

---------------------------------------------------------------------------------

Install packages
npm i

---------------------------------------------------------------------------------

Setup .env file

DATABASE_URL=

JWT_SECRET = 


----------------------------------------------------------------------------------

Setup Prisma:

npm i --save -dev prisma prisma@latest
npm i @prisma/client@latest
npx prisma generate
npx prisma db push

----------------------------------------------------------------------------------

Start the app:
npm run start:dev

----------------------------------------------------------------------------------

postman collection of the api's

register endpoint
POST Request
http://localhost:4000/auth/signup


signin endpoint
POST Request
http://localhost:4000/auth/signin


biometric login endpoint
POST Request
http://localhost:4000/auth/biometric


signout endpoint
GET Request
http://localhost:4000/auth/signout






