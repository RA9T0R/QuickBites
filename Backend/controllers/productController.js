import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

// function for add products
const addProduct = async (req,res) => {
    try {
        const {name, description, price, rate, time, Kcal, category, recommend} = req.body;

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
        res.json({success:false,message:error.message})
    }
}

// function for list product
const listProducts = async (req,res) => {
    try {
        const product = await productModel.find({});
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// function for removing product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId, name, description, price, rate, time, Kcal, category, recommend, image1, image2, image3, image4 } = req.body;

        const uploadedImage1 = req.files && req.files.image1 && req.files.image1[0];
        const uploadedImage2 = req.files && req.files.image2 && req.files.image2[0];
        const uploadedImage3 = req.files && req.files.image3 && req.files.image3[0];
        const uploadedImage4 = req.files && req.files.image4 && req.files.image4[0];

        let imageUrls = [];

        if (uploadedImage1) {
            let result = await cloudinary.uploader.upload(uploadedImage1.path, { resource_type: 'image' });
            imageUrls.push(result.secure_url);
        } else if (image1 && image1 !== "") { 
            imageUrls.push(image1);
        }

        if (uploadedImage2) {
            let result = await cloudinary.uploader.upload(uploadedImage2.path, { resource_type: 'image' });
            imageUrls.push(result.secure_url);
        } else if (image2 && image2 !== "") { 
            imageUrls.push(image2);
        }

        if (uploadedImage3) {
            let result = await cloudinary.uploader.upload(uploadedImage3.path, { resource_type: 'image' });
            imageUrls.push(result.secure_url);
        } else if (image3 && image3 !== "") { 
            imageUrls.push(image3);
        }

        if (uploadedImage4) {
            let result = await cloudinary.uploader.upload(uploadedImage4.path, { resource_type: 'image' });
            imageUrls.push(result.secure_url);
        } else if (image4 && image4 !== "") { 
            imageUrls.push(image4);
        }

        const updatedData = {
            name,
            description,
            price: Number(price),
            rate,
            time: JSON.parse(time),
            Kcal,
            category,
            recommend: recommend === "true" ? true : false,
            image: imageUrls.length > 0 ? imageUrls : undefined 
        };

        const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Updated", updatedProduct });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const singleProducts = async (req,res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export {addProduct,listProducts,removeProduct,singleProducts,updateProduct}