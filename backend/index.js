const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: 'https://e-commerce-site-frontend-tau.vercel.app',
    methods: ['POST', 'GET'],
    credentials: true
}));



const dbConnectionUrl = `mongodb+srv://greatstackdev:${process.env.MONGODB_PASSWORD}@cluster0.d77y0zg.mongodb.net/e-commerce`;
mongoose.connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(error => {
    console.error('Database connection failed', error);
    process.exit(1); // Exits the process on a failed database connection
});

// // Database Connection with MongoDB
// mongoose.connect(`mongodb+srv://greatstackdev:${process.env.MONGODB_PASSWORD}@cluster0.d77y0zg.mongodb.net/e-commerce`);

// API Creation
app.get('/', (req, res) => {
    res.send('Express App is running!')
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Creating API for adding products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log('Product removed');
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log('All products fetched:', products.length);
        res.send(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ success: false, error: 'Error fetching all products' });
    }
});

// Creating schema for User Model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating endpoint for registering the user
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: 'Existing user found with the same email address' })
    };
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    };
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: 'Wrong password' });
        }
    }
    else {
        res.json({ success: false, errors: 'Wrong email' })
    }
});

// Creating endpoint for new collection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('NewCollection fetched');
    res.send(newcollection);
});

// Creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: 'women' })
        let popular_in_women = products.slice(0, 4);
        console.log('Popular in women fetched');
        res.send(popular_in_women);
    } catch {
        console.error('Error fetching popular in women:', error);
        res.status(500).json({ success: false, error: 'Error fetching popular in women' });
    }
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: 'Please authenticate using valid token' })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: 'Please authenticate using valid token' })
        }
    }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log('Added', req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: 'Item added to cart' });
});

// Creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log('Removed', req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: 'Item removed from cart' });
})

// Creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Get cart');
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if (!error) {
        console.log('Server running on port ' + port);
    } else {
        console.log('Error : ' + error);
    };
});