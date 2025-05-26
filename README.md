<<<<<<< HEAD
# Daily-Updates-App

A simple full-stack app built with the T3 Stack that lets a single user("fakeuser") sign in via local storage, 
submit daily updates, and view them and analytics on a dahboard. 
Authentication is mocked: only the hardcoded acount "fakeuser" can log in. 

# Setup Steps
1. Clone Repository:
   
     git clone https://github.com/aaronhxb/Daily-Updates-App.git

     cd Daily-Updates-App
 
2. Intall Dependencies: 


     npm install

   
3. Environment Variables:
   Copy the example file and create your own .env in the project root:

   
   cp .env.example .env

   
4. Prisma Setup:


   npx prisma db push
   
5. Start Development Server:

    
   npm run dev

   
6. Open App:
  Visit http://localhost:3000 in your browser.

# 
