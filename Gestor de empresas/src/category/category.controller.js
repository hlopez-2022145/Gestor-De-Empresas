'use strict'

import Category from './category.model.js'
import Company from '../company/company.model.js'

//ADD 
export const addCategory = async(req, res) => {
    try{
        let data = req.body
        let category = new Category(data)

        await category.save()
        return res.send({msg: 'Category added successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({msg: 'Error added category '})
    }
}

//UPDATE 
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateCategory = await Category.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateCategory) return res.status(401).send({ msg: 'Category not found and not updated' })
        return res.send({ msg: 'Update category', updateCategory })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error updating category' })
    }
}

//LIST OF CATEGORY
export const getCategory = async(req, res) => {
    try{
        let listOfCategory = await Category.find({})
        if(listOfCategory.length == 0) return res.status(404).send({msg: 'No category found'}) 
        return res.send({listOfCategory})
    }catch(err){
        console.error(err)
        return res.status(500).send({msg: 'Error gettind category '})
    }
}

export const deleteCategory = async (req, res) => {
    try {
        let idCategory = req.params.id

        // Encuentra la categoría que será eliminada
        let deleteCatego = await Category.findOne({_id: idCategory})

        //Verifica si la categoría si existe
        if (!deleteCatego) {
            return res.status(404).send({ msg: 'Category not found, not deleted' })
        }

        /// Encuentra la categoría predeterminada
        let defaultCategory = await Category.findOne({ nameCategory: 'Others' });

        // Verifica si se encontró la categoría predeterminada
        if (!defaultCategory) {
            return res.status(404).send({ msg: 'Default category not found' });
        }

        await Company.updateMany(
            {category: deleteCatego._id},
            {category: defaultCategory._id},
            {multi: true}
        )
            await deleteCatego.deleteOne()
        return res.send({ msg: 'Deleted category successfully' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Error deleting category' })
    }
}
