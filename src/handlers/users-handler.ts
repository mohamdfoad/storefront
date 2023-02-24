import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../types/user-type'
import userStore from '../models/users_model'
import checkAuth from '../middleware/authentication-middleware'

import {
  userBodyValidationRules,
  checkFunc,
} from '../middleware/validation-middleware'

const store = new userStore()
const tokenSecret = process.env.TOKEN_SECRET

const registerUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }

  try {
    const newUserRec = await store.register(user)
    console.log(user)
    // const token = jwt.sign(newUserRec, tokenSecret as string)
    // res.json(token)
    res.json(newUserRec)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// const Authenticate_user = async (req: Request , res:Response) => {

//       try {
//     const u = await store.authenticate(req.body.username , req.body.password)
//     console.log(u);
//     const token = jwt.sign({user:u},tokenSecret as string)
//     res.json(token);
//     //res.json(newUserRec)
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// };

const Authenticate_user = async (req: Request, res: Response) => {
  try {
    const user = (await store.authenticate(
      req.body.username,
      req.body.password
    )) as User
    // console.log(user)
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
      tokenSecret as string
    )

    res.json(token)
  } catch (err) {
    console.log(err)
    res.status(401)
    res.json({ err: 'Incorrect credentials' })
  }
}

const index = async (_req: Request, res: Response) => {
  try {
      const users = await store.index()
      res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

   const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.username);
     res.json(user);
   } catch (err) {
    res.status(400)
     res.json(err)
    }

 };

   const user_delete = async(req: Request , res: Response) => {
 try {
     const deleteRec = await store.delete(req.params.username)
     res.json(deleteRec)
 } catch (err) {
   res.status(400)
   res.json(err)
 }

   };

const userRoutes = (app: express.Application) => {
  app.post('/register', userBodyValidationRules, checkFunc, registerUser)
  app.post('/login', Authenticate_user) //username & password expected to be in req body
  //listing all users at least a user must be authenticated - and (must be admin) - but roles are not in scope of project.
  app.get('/users', checkAuth, index)
 app.get('/users/username/:username',checkAuth,show)
 app.delete('/users/:username',checkAuth,user_delete)
}

export default userRoutes
