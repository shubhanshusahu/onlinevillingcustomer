const express=require('express')
const app= express()
const bodyParser= require ('body-parser')
const mongoose=require('mongoose')
const cors = require("cors")
require('./AdminUser')
require('./user')
require('./ProductSchema')
require('bcryptjs');
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const AdminUser= mongoose.model("admin")
const AddProduct =mongoose.model("product")
const add =mongoose.model("Customer")
const mongoUri="mongodb+srv://rishi:12345@cluster0.00f3y.mongodb.net/OnlineBilling";
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.use("/", require("./noteRoute"))
mongoose.connection.on("connected",()=> {
    console.log("connected to mongo DB!!!")
})

// app.get('/login',(req,res)=>{
//     add.find({}).then(data=>{
//         res.send(data)
//     }).catch(err=>{
//         console.log(err)
//     })
    
// })

app.get('/',(req,res)=>{
    add.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})
app.get('/product',(req,res)=>{
    AddProduct.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})



app.post('/send-data',(req,res)=> {
    console.log(req.body)
    add.findOne({'MobileNumber':req.body.MobileNumber} )
    .then(data=>{
        console.log(data)
        if(data){
    
            res.send({'success':true})

        }
        else{
            res.send({'success':false})
    const Add= new add({
        Name:req.body.Name,
        Dateofbirth:req.body.Dateofbirth,
        MobileNumber:req.body.MobileNumber,
        Password:req.body.Password
    })  
    Add.save()
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
 } 
})

// res.send("posted")
})

app.post('/sign-in',(req,res)=> {
    console.log(req.body)
       var MobileNumber=req.body.MobileNumber;
       var  Password=req.body.Password;

        add.findOne({$and:[{'MobileNumber':MobileNumber},{'Password':Password} ] } )
        .then(data=>{
            console.log(data)
            if(data){
        
                res.send({'success':true,'Name':data.Name})

            }
            else{
                
                res.send({'success':false,'message':'Customer not found check your login credential'})
                
    
            }
    
    }).catch(err=>{
        console.log(err)
    })

  
})




app.post('/AddProduct',(req,res)=> {
    console.log(req.body)

    const addpro= new AddProduct({
        Barcode:req.body.Barcode,
        ProductName:req.body.ProductName,
        Quantity:req.body.Quantity,
        ReorderQuantity:req.body.ReorderQuantity,
        Price:req.body.Price

    })  
    addpro.save()
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })

    
})

app.post('/delete',(req,res)=> {
AdminUser.findByIdAndRemove(req.body.id)
.then(data=>{

    console.log(data)
    res.send("Deleted")
})
.catch(err=>{
    console.log(err)
})



})
app.post('/search',(req,res)=>{
    console.log(req.body)
    const ProductName=req.body.ProductName;
   AddProduct.findOne({'ProductName':req.body.ProductName})
   
   .then(data=>{
    if(data){
    res.send({'success':true,'pname':data.ProductName,'price':data.Price,'quan':data.Quantity})
    }
    else{
                
        res.send({'success':false,'message':'Product not found '})
        

    }
    })
    .catch(err=>{
        console.log(err)
    })

})



app.post('/update',(req,res)=> {
    AdminUser.findByIdAndUpdate(req.body.id,{
        Name:req.body.name,
        Password:req.body.password,
        EmployeeId:req.body.employeeid,
        Role:req.body.role

    })
    .then(data=>{
    
        console.log(data)
        res.send("Updated!")
    })
    .catch(err=>{
        console.log(err)
    })
    })
    
app.listen(3000,()=>{
    console.log("server running")
})





