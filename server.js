const express = require('express');
const {readProducts, writeProducts, updateProduct, deleteProduct} = require('./fileUtils');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/products', (req, res) => {

    try {
        const products = readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener productos', error: error.message});

    }
});

app.post('/products', (req, res) => {
    const { id, name, price, quantity } = req.body;

    
    if (!id || !name || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: 'Faltan datos requeridos (id, name, price, quantity).' });
    }

    const products = readProducts();

    
    if (products.some(p => p.id === id)) {
        return res.status(409).json({ message: `El producto con ID ${id} ya existe.` });
    }

    const newProduct = { id, name, price, quantity };
    products.push(newProduct);

    try {
        writeProducts(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el producto.', error: error.message });
    }
});


app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, quantity } = req.body;

    
    const newData = {};
    if (name !== undefined) newData.name = name;
    if (price !== undefined) newData.price = price;
    if (quantity !== undefined) newData.quantity = quantity;

    
    if (Object.keys(newData).length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron campos para actualizar (name, price, quantity).' });
    }
    
    try {
        const updatedProduct = updateProduct(id, newData);

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto.', error: error.message });
    }
});

app.delete('/products/:id', (req,res) => {

    const id = parseInt(req.params.id);

    try{
        const wasDeleted = deleteProduct(id);
         if(wasDeleted) {

            res.status(204).send();
         } else {
            res.status(404).json({message: `Producto con ID ${id} no encontrado`});
         }

    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el producto', error: error.message});
    }

});

app.listen(PORT, () => {

    console.log(`🚀 El servidor de inventario escuchando en http://localhost:${PORT}`);
    console.log(`Rutas disponibles:`);
    console.log(`-GET /products`);
    console.log(`-POST /products`);
    console.log(`-PUT /products/:id`);
    console.log(`-DELETE /products/:id`);

}); 