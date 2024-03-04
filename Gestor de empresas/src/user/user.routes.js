'use strict'

import express from 'express'
import { login, registerUser } from "./user.controller.js"

const api = express.Router()

api.post('/registerUser', registerUser)
api.post('/login', login)

export default api