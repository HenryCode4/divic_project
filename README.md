Nestjs Backend test task

Key Features:
🔐 Nestjs
nestjs/jwt
Prisma
bcryptjs
validator
cookies
GraphQl

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

ACCESS_TOKEN_SECRET = 

REFRESH_TOKEN_SECRET = 


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


<!-- Graphql collections -->

<!-- sign up mutations -->
mutation SignUp($input: SignUpInput!) {
  signup(signUpInput: $input) {
    accessToken
    refreshToken
    user{email name}
  }
}
<!-- query variables -->
{"input": {"email": "g@gmail.com",
  "name": "g",
  "password": "g"}}


<!-- sign up mutations -->
mutation SignIn($input: SignInInput!) {
  signin(signInInput: $input) {
    accessToken
    refreshToken
    user{name}
  }
}

<!-- query variables -->
{"input": {"email": "g@gmail.com",
  "password": "g"}}



<!-- logout mutation -->
mutation Logout($id: String!) {
  logout(id: $id) {
    loggedOut
  }
}

<!-- query variables -->
{"id": "2dc5019c-6a30-407b-867c-82d1d19a0257"}




<!-- biometricKey mutation -->
mutation Biometric($input: BiometricInInput!) {
  biometric(biometricInInput: $input) {
    accessToken
    refreshToken
    user{name}
  }
}


<!-- query variables -->
{"input": {"biometricKey": "1234567890"}}
