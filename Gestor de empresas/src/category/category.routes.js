'use strict'

import express from 'express'

import { addCategory, update, getCategory, deleteCategory } from './category.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/addCategory', validateJwt, addCategory)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.get('/getCategory', [validateJwt, isAdmin], getCategory)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteCategory)

export default api