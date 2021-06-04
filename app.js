const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true });
const bodyparser = require("body-parser");

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
  });

const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

 // ENDPOINTS
 app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => { //save data and req.body will return promise so to handle it we write .then() as in node everything wrriten is asynchronous
        res.send("This item has been saved to the database")
    }).catch(() => { //if there is an error, catch it
        res.status(400).send("Item was not saved to the database")
    })
    
})



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
