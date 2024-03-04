'use strict'

import express from 'express'

import { addCompany, deleteCompany, getCompanyYears,getCompanyZA, update, getCompanyAZ, getCompaniesCategory, getDocumentExcel } from './company.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/addCompany', [validateJwt, isAdmin], addCompany)
api.get('/getCompanyYears', [validateJwt, isAdmin], getCompanyYears)
api.get('/getCompanyAZ', [validateJwt, isAdmin], getCompanyAZ)
api.get('/getCompanyZA', [validateJwt, isAdmin],getCompanyZA)
api.get('/getCompaniesCategory',[validateJwt, isAdmin], getCompaniesCategory)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteCompany)
api.get('/getDocumentExcel', getDocumentExcel)

export default api