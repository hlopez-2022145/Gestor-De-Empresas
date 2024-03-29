import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import Category from './src/category/category.model.js'

// Función para crear una nueva categoría
async function createCategory() {
  try {
    // Verificar si la categoría "por defecto" ya existe en la base de datos
    let categoriaExistente = await Category.findOne({ nameCategory: 'Others' });

    // Si la categoría ya existe, imprime un mensaje y devuelve sin hacer nada más
    if (categoriaExistente) {
      return console.log('The category already exists in the database');
    }

    // Crea una nueva instancia de la categoría
    let nuevaCategoria = new Category({
      nameCategory: 'Others',
      description: 'This category is default',
    });

    // Guarda la categoría en la base de datos
    const categoriaGuardada = await nuevaCategoria.save()
    console.log('Category create successfully', categoriaGuardada)
  } catch (err) {
    console.error('Error create category', err)
  }
}

initServer()
connect()
createCategory()