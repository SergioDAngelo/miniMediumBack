import express from 'express'

import {routerPost} from './routes/post'
import {routerUser} from './routes/user'

const app = express();
const PORT = process.env.PORT || 8080;



app.use(express.json())
app.use('/user', routerUser)
app.use('/post', routerPost)


app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`)
})

