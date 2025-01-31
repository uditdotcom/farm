const express = require('express');
const users = require('./sample.json');
const fs = require('fs');
const { error } = require('console');
const app = express();
const PORT = 8000;

// Middleware for parsing json request bodies
app.use(express.urlencoded({ extended:false}));

// Fetch User Data
app.get('/api/users',(req,res)=>{
    res.json(users);
})

// Fetch in form of Html
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// Fetch dynamically with id
app.route('/api/users/:userid').get((req, res) => {
    const userid = Number(req.params.userid);
    const user = users.find(user => user.id === userid);

    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ message: "User not found" });
    }

}).patch((req,res)=>{

    // TODO : Update a new User
   return  res.json({status: 'success'})

}).delete((req,res)=>{

    // TODO : Delete a new User
    return res.json({status: 'success'})
})

// Add New Data In Json Through POST 

app.post('/api/users',(req,res)=>{
    // TODO : Create a new User
    const body = req.body;
    // console.log(body);
    users.push({...body, id : users.length+1});
    fs.writeFile('./sample.json',JSON.stringify(users),(error)=>{
        if(error){
            console.error("Failed To Save Data")
        }
        else {
            return res.json({status : "Success Fully Added",id: users.length});
        }
    })
    
})

app.listen(PORT,()=> console.log(` Server is listening on ${PORT}`));