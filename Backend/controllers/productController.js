import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

// function for add products
const addProduct = async (req,res) => {
    try {
        
        const { name, description, price, rate, time, Kcal, category, recommend } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price : Number(price),
            image: imageUrl,
            rate,
            time: JSON.parse(time),
            Kcal,
            category,
            date:Date.now(),
            recommend: recommend === "true" ? true : false
        }

        console.log(productData);

        const product = new productModel(productData)
        await product.save()

        res.json({success:true,message:"Product Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// function for list product
const listProducts = async (req,res) => {
    try {
        const product = await productModel.find({});
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// function for removing product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        console.log(req.body)

        const { productId, name, description, price, rate, time, Kcal, category, recommend } = req.body;

        // Handle images if they are updated
        const image1 = req.files && req.files.image1 && req.files.image1[0];
        const image2 = req.files && req.files.image2 && req.files.image2[0];
        const image3 = req.files && req.files.image3 && req.files.image3[0];
        const image4 = req.files && req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload new images if they are provided
        let imageUrl = [];
        if (images.length > 0) {
            imageUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Prepare the updated product data
        const updatedData = {
            name,
            description,
            price: Number(price),
            rate,
            time: JSON.parse(time),
            Kcal,
            category,
            recommend: recommend === "true" ? true : false,
            image: imageUrl.length > 0 ? imageUrl : undefined // only include the image array if images are updated
        };

        // Find the product by its ID and update it
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Updated", updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// function for single product info
const singleProducts = async (req,res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addProduct,listProducts,removeProduct,singleProducts,updateProduct}