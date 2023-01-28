// import  library
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// read product.json file
const fs = require('fs');
const data = fs.readFileSync('data/products.json', 'utf8');
const items = JSON.parse(data);

// read user.json file
const userData = fs.readFileSync('data/user.json', 'utf8');
const users = JSON.parse(userData);

// set area
app.set("view engine", "ejs");

// user area
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

// home page
app.get("/", (req, res)=>{
    console.log("[+]---> Server is activated\n[+]---> PORT: 3000");

    const productsItems = {
        p1: items[1],
        p2: items[2],
        p3: items[3],
        p4: items[4]
    }
    
    res.render("index", {product: productsItems});
})


// login page
app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", (req, res)=>{
    const userEmail = req.body['email'];
    const userPassword = req.body['password'];

    // check user for each element in the user.json
    for (let i = 0; i < users.length; i++) {
        const element = users[i];

        if (element['user-email'] == userEmail && element['password'] == userPassword) {
            
            const productsItems = {
                p1: items[1],
                p2: items[2],
                p3: items[3],
                p4: items[4]
            }
            res.render("index", {product: productsItems});

        }else {
            res.render("login")
        }
    }
})


// register page
app.get("/register", (req, res)=>{
    res.render("register");
});

// port
app.listen(3000);