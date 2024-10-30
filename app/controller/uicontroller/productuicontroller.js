const Product = require('../../model/product'); // Adjust the path based on your project structure

class productuicontroller {

    // Handle POST product
    async addproduct(req, res) {
        if (req.method === 'POST') {
            try {
                const { p_name, p_size, p_color, price, image } = req.body;
                if (!p_name || !p_size || !p_color || !price) {
                    return res.status(400).send('All fields are required.');
                }
                const productData = {
                    p_name: p_name.trim(),
                    p_size: p_size.split(',').map(s => s.trim()).filter(Boolean),
                    p_color: p_color.split(',').map(c => c.trim()).filter(Boolean),
                    price: Number(price), // Use Number() for a cleaner conversion
                    image: image || "https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg",
                };
                await Product.create(productData);
                return res.redirect('/product');
            } catch (error) {
                console.error('Error saving product:', error);
                return res.status(500).send('Error saving product');
            }
        }
        res.render('productview/addproduct');
    }

    // Handle GET product
    async showproduct(req, res) {
        try {
            const products = await Product.find(); // Fetch all products from the database
            res.render('productview/product', { products }); // Render the product page with products data
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving products" });
        }
    }

    // Handle GET single product 
    async singleproduct(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('productview/editproduct', { product });
        } catch (error) {
            console.error('Error fetching product:', error);
            return res.status(500).send('Error fetching product');
        }
    }

    // Handle PUT or PATCH for update product
    async updateproduct(req, res) {
        const { id } = req.params;
        const { p_name, p_size, p_color, price, image } = req.body;
        try {
            const productData = {
                p_name: p_name.trim(),
                p_size: p_size.split(',').map(s => s.trim()),
                p_color: p_color.split(',').map(c => c.trim()),
                price: parseFloat(price),
                image: image || "https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg"
            };
            await Product.findByIdAndUpdate(id, productData);
            console.log(`Product with ID ${id} updated`);
            return res.redirect('/product'); // Redirect after updating
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).send('Error updating product');
        }
    }

    // Handle DELETE for delete product
    async deleteproduct(req, res) {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            console.log(`Product with ID ${id} deleted`);
            return res.redirect('/product'); // Redirect product after deleting data
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).send('Error deleting product');
        }
    }


}

module.exports = new productuicontroller();