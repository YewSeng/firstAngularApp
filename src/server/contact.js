//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

//define the express operation
const app = express();
const port = 3000;

//defining the cors - cross origin by receiving the data in json format
app.use(cors());
app.use(bodyParser.json())

//establishing connection with dB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '(2Hard2PK)',
    database: 'ui'
});

//Verifying whether db is connected or not
db.connect(err => {
    if (err) {
        console.error('Connection is not established with the dB', err);
    } else {
        console.log('Connected to db');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/addEnquiries', (req, res) => {
    const { responseId, name, email, enquiries } = req.body; 
    
    
    const sql = 'Insert into contact (name, email, enquiries) values (?, ?, ?)';
    db.query(sql, [name, email, enquiries], (err, result) => {
        if (err) {
            console.error('Error in adding the Enquiries', err);
            res.status(500).json({ error: 'An error has occurred' });
        } else {
            res.status(200).json({ message: 'Enquiries added Successfully' });
        }
    });
});

