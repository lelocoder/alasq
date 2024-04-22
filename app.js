const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
 
 
 
 //express app
const app=express();
 
 const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ala123',
    database:'tenzdb'
    
    
 })
 con.connect((err)=>{
    if (err) {
      console.log(err);  
    }
    console.log('connected');
})
 
 app.listen(3000);

 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({extended:false}))
 
    //GET REQUEST FOR

     app.get('/patients',(req,res)=>{
        con.query("SELECT * FROM patients", (err,result)=>{
            if (err) {
                console.log(err);
            }
            res.send(result)
        })
           
     });
     //GETING PATIENT BY ID
     app.get('/patients/:id',(req,res)=>{
        const {id}=req.params;
        con.query("SELECT * FROM patients WHERE id = ?",[id], (err,result)=>{
           
            if (err) {
                console.log(err);
            }
            res.send(result[0])
        })
        })
        //CREATING NEW
        app.post('/patients',(req,res)=>{
             const {name,age,adress}=req.body; //parsing body post and put request
        
   
            con.query("INSERT INTO patients (name, age, adress) VALUES (?,?,?)",[name, age, adress], 
            (err,result)=>{
               
                if (err) {
                    console.log(err);
                }
                res.send({ message: 'User added successfully', id:result.insertID})
            })
            })

    
app.use((req,res)=>{
    res.status(400).render('404',{title:'404'})
});
 
 