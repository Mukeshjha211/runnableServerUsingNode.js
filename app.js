const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize= require('./util/database');

const Product = require('./models/product');
const User = require('./models/product');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const sequelize = require('./util/database');


app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    User.findById(1)
    .then(user=>{
        req.user = user;
        }
    ).catch(err=>{
        console.log(err)
    })
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, {
    constraints:true, onDelete:'CASCADE'
});
User.hasMany(Product);
// app.use(errorController.get404);

sequelize
.sync()
.then(result =>{
    // console.log(result)
    return User.findById(1);
}).then(user=>{
    if(!user){
        return User.create({name:'Max', email:"max@gmail.com"})
    }
    return user;
}).then(user=>{
    app.listen(3000)
})
.catch(err =>{
    console.log(err)
});

