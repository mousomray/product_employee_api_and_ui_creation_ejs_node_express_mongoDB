const Product = require('../../model/product');

class ProductController {

    // POST API 
    async create(req, res) {
        try {
            const productdata = new Product(req.body);
            const data = await productdata.save();
            res.status(200).json({ message: "Product added successfully", data });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "An unexpected error occurred" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // GET API 
    async getall(req, res) {
        try {
            const data = await Product.find();
            res.status(200).json({
                message: "Product list Fetched successfully",
                total: data.length,
                products: data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving product data" });
        }
    }

    // GET Single API
    async getsingle(req, res) {
        try {
            const id = req.params.id;
            const data = await Product.findById(id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving product data" });
        }
    }

    // PUT or PATCH For Update Data
    async productupdate(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
            res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating product data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // DELETE Api For Delete product
    async productdelete(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            res.status(deletedProduct ? 200 : 404).json(
                deletedProduct ? { message: "Product deleted successfully" } : { message: "Product not found" }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting product" });
        }
    }
}

module.exports = new ProductController();
