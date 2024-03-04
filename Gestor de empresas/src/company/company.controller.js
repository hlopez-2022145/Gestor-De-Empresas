'use strict'

import Category from '../category/category.model.js'
import Company from './company.model.js'
import { checkUpdate } from '../utils/validator.js'

import Workbook from 'xlsx-populate/lib/Workbook.js'

//ADD 
export const addCompany = async (req, res) => {
    try {
        let data = req.body
        let company = new Company(data)

        await company.save()
        return res.send({ msg: 'Company added successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error added company' })
    }
}

//LIST OF COMPANY FOR YEARS
export const getCompanyYears = async (req, res) => {
    try {
        let listOfCompany = await Company.find().populate('category', ['nameCategory', '-_id']).select('-__v')
            .sort({ yearsOfTrayectory: -1 })
        if (listOfCompany.length == 0) return res.status(404).send({ message: 'Not found' })
        return res.send({ listOfCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error getting companies' })
    }
}
//LIST OF COMPANY FOR A-Z
export const getCompanyAZ = async (req, res) => {
    try {
        let listOfCompany = await Company.find().populate('category', ['nameCategory', '-_id']).select('-__v')
            .sort({ companyName: 1 })
        if (listOfCompany.length == 0) return res.status(404).send({ message: 'Not found' })
        return res.send({ listOfCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error getting companies' })
    }
}
//LIST OF COMPANY FOR ZA
export const getCompanyZA = async (req, res) => {
    try {
        let listOfCompany = await Company.find().populate('category', ['nameCategory', '-_id']).select('-__v')
            .sort({ companyName: -1 })
        if (listOfCompany.length == 0) return res.status(404).send({ message: 'Not found' })
        return res.send({ listOfCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error getting companies' })
    }
}
//LIST OF COMPANY FOR CATEGORY
export const getCompaniesCategory = async (req, res) => {
    try {
        let { search } = req.body;
        let category = await Category.findOne({ nameCategory: search });
        if (!category) return res.status(404).send({ message: 'Category not found' });
        let companies = await Company.find({ category: category._id }).populate('category', ['nameCategory', '-_id']);
        if (companies.length == 0) return res.status(404).send({ message: 'Companies not found' });
        return res.send({ companies });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error getting companies' });
    }
}

//UPDATE 
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'have submitted some data tahat cannot be updated or missing data' })
        let updateCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateCompany) return res.status(401).send({ msg: 'Company not found and not updated' })
        return res.send({ msg: 'Update company', updateCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error updating company' })
    }
}

//DELETE
export const deleteCompany = async (req, res) => {
    try {
        let { id } = req.params
        let deleteCompa = await Company.findOneAndDelete({ _id: id })
        if (!deleteCompa) return res.status(404).send({ msg: 'Company not found, not deleted' })
        return res.send({ msg: 'Deleted company successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error deleting company' })
    }
}

//EXCEL 

import xlsxPopulate from 'xlsx-populate'

export const getDocumentExcel = async(req, res) => {
    try {
        let workbook = await xlsxPopulate.fromBlankAsync()
        let sheet = workbook.sheet(0)

        // Escribir cabeceras
        sheet.cell('A1').value('companyName')
        sheet.cell('B1').value('impactLevel')
        sheet.cell('C1').value('yearsOfTrayectory')
        sheet.cell('D1').value('category')

        // Obtener datos de la base de datos
        let companies = await Company.find().populate('category', ['nameCategory'])

        // Escribir datos de las empresas en el archivo Excel
        companies.forEach((company, index) => {
            sheet.cell(`A${index + 2}`).value(company.companyName)
            sheet.cell(`B${index + 2}`).value(company.impactLevel)
            sheet.cell(`C${index + 2}`).value(company.yearsOfTrayectory)
            sheet.cell(`D${index + 2}`).value(company.category.nameCategory)
        })

        // Guardar el archivo Excel
        await workbook.toFileAsync("./salida.xlsx")

        return res.status(200).send({message: 'SE ha creado con exito su documento excel'})
    }catch(err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al agregar documento' })
    }
}
