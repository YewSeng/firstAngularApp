//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

//securing password
const bcrypt = require('bcrypt');

//define the express operation
const app = express();
const port = 2000;

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

//ADMIN

// add new admin
app.post('/addAdmin', async (req, res) => {
    const { name, username, password } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // SQL query
        const sql = 'INSERT INTO admin (name, username, password) VALUES (?, ?, ?)';
        db.query(sql, [name, username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error in creating the admin', err);
                res.status(500).json({ error: 'An error occurred while creating the admin' });
            } else {
                console.log('Admin added:', result);
                res.status(200).json({ message: 'Admin has been created successfully' });
            }
        });
    } catch (error) {
        console.error('Error hashing password', error);
        res.status(500).json({ error: 'An error occurred while hashing the password' });
    }
});


//to get a single admin based on if admin exist
app.get('/getAdmin/:username', (req, res) => {
    const username = req.params.username;
    const sql = 'SELECT * FROM admin WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error in fetching the admin', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Function to get admin by username from the database
function getAdminByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM admin WHERE username = ?';
      db.query(sql, [username], (err, result) => {
        if (err) {
          console.error('Error fetching admin by username', err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null); // Admin not found
          }
        }
      });
    });
}
  
// Add a new route for verifying admin credentials
app.get('/verifyAdmin/:username/:password', async (req, res) => {
    const { username, password } = req.params;
  
    try {
      const admin = await getAdminByUsername(username); // Implement this function to fetch admin by username
      if (admin) {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          res.status(200).json({ message: 'Admin verified' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(404).json({ message: 'Admin not found' });
      }
    } catch (error) {
      console.error('Error verifying admin', error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

// CLIENTS

// add new client
app.post('/addClient', async (req, res) => {
    const { clientName, email, address, postalCode, username, password } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // SQL query
        const sql = 'INSERT INTO client (clientName, email, address, postalCode, username, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [clientName, email, address, postalCode, username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error in creating the client', err);
                res.status(500).json({ error: 'An error occurred while creating the client' });
            } else {
                console.log('Admin added:', result);
                res.status(200).json({ message: 'Client has been created successfully' });
            }
        });
    } catch (error) {
        console.error('Error hashing password', error);
        res.status(500).json({ error: 'An error occurred while hashing the password' });
    }
});

//to get a single client based on username if client exist
app.get('/getClient/:username', (req,res) => {
    const username = req.params.username;
    const sql = 'SELECT * FROM client WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error in fetching the client', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(result);
        }
    });
})

//to get a single client based on clientId if client exist
app.get('/getClientById/:clientId', (req,res) => {
    const clientId = req.params.clientId; // Correct parameter name
    const sql = 'SELECT * FROM client WHERE clientId = ?';
    db.query(sql, [clientId], (err, result) => {
        if (err) {
            console.error('Error in fetching the client', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(result);
        }
    });
})

//to fetch the clients
app.get('/getClients', (req,res) => {
    const sql = 'SELECT * FROM client';
    db.query(sql, (err,result) => {
        if (err) {
            console.error('Error in fetching the clients', err);
            res.status(500).json({error: 'An error occurred'});
        } else {
            res.status(200).json(result);
        }
    }); 
});

// Function to get client by username from the database
function getClientByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM client WHERE username = ?';
      db.query(sql, [username], (err, result) => {
        if (err) {
          console.error('Error fetching client by username', err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null); // Client not found
          }
        }
      });
    });
}

// Function to get client by clientId from the database
function getClientById(clientId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM client WHERE clientId = ?';
      db.query(sql, [clientId], (err, result) => {
        if (err) {
          console.error('Error fetching client by clientId', err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null); // Client not found
          }
        }
      });
    });
}

// Add a new route for verifying client credentials
app.get('/verifyClient/:username/:password', async (req, res) => {
    const { username, password } = req.params;
  
    try {
    const client = await getClientByUsername(username); // Implement this function to fetch client by username
      if (client) {
        const passwordMatch = await bcrypt.compare(password, client.password);
        if (passwordMatch) {
          res.status(200).json({ message: 'Client verified' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      console.error('Error verifying client', error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

// Function to update client information in the database
async function updateClientInfo(updatedClient) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE client SET clientName = ?, email = ?, address = ?, postalCode = ?, username = ?, password = ? WHERE clientId = ?';
        const { clientName, email, address, postalCode, username, password, clientId } = updatedClient;
        db.query(sql, [clientName, email, address, postalCode, username, password, clientId], (err, result) => {
            if (err) {
                console.error('Error updating client info', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//to update a client
app.put('/updateClient', async (req, res) => {
    const updatedClient = req.body;
    
    try {
      const existingClient = await getClientById(updatedClient.clientId);
  
      if (!existingClient) {
        return res.status(404).json({ message: 'Client not found' });
      }
      
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(updatedClient.password, 10);
      updatedClient.password = hashedPassword;

      await updateClientInfo(updatedClient);
      res.status(200).json({ message: 'Client updated successfully' });
    } catch (error) {
      console.error('Error updating client', error);
      res.status(500).json({ error: 'An error occurred' });
    }
});  
  
//to delete a client
app.delete('/deleteClient/:clientId', (req,res) => {
    const clientId = req.params.clientId;
    const sql = 'DELETE FROM client WHERE clientId = ?';
    db.query(sql, [clientId], (err,result) => {
        if (err) {
            console.error('Error in deleting the client', err);
            res.status(500).json({error: 'An error occurred'});
        } else {
            res.status(200).json({message: 'Client deleted successfully'});
        }
    }); 
});

//Meeting

//add a meeting
app.post('/addMeeting', (req, res) => {
  const { topic, parties, startdate, starttime, enddate, endtime } = req.body;
  const sql =
    'INSERT into meeting (topic, parties, startdate, starttime, enddate, endtime) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [topic, parties, startdate, starttime, enddate, endtime], (err, result) => {
    if (err) {
      console.log('Error in creating a meeting', err); // Log the error details
      res.status(500).json({ error: 'An error occurred while creating the meeting' });
    } else {
      console.log('Meeting added: ', result);
      res.status(200).json({ message: 'Meeting has been created successfully' });
    }
  });
});

// getting a meeting
app.get('/getMeeting', (req,res) => {
  const sql = 'Select * From meeting';
  db.query(sql, (err,result) => {
      if (err) {
          console.error('Error in fetching the meeting', err);
          res.status(500).json({error: 'An error occurred'});
      } else {
          res.status(200).json(result);
      }
  }); 
});

//to get a single meeting based on meetingId
app.get('/getMeetingById/:meetingId', (req,res) => {
  const meetingId = req.params.meetingId;
  const sql = 'Select * From meeting where meetingId = ?';
  db.query(sql, [meetingId], (err,result) => {
      if (err) {
          console.error('Error in fetching the meeting', err);
          res.status(500).json({error: 'An error occurred'});
      } else {
          res.status(200).json(result);
      }
  }); 
});

// To get meetings based on names within the party
app.get('/getMeetingsByPartyName', (req, res) => {
  const { partyName } = req.query;
  console.log('Received partyName:', partyName);

  const sql = 'SELECT * FROM meeting WHERE parties LIKE ?';
  const searchString = `%${partyName}%`;
  console.log('SQL Query:', sql, searchString);

  db.query(sql, [searchString], (err, meetings) => {
    if (err) {
      console.error('Error fetching meetings', err);
      res.status(500).json({ error: 'An error occurred while fetching meetings' });
    } else {
      console.log('Fetched meetings:', meetings);
      res.status(200).json(meetings);
    }
  });
});


//to update a meeting
app.put('/updateMeeting', (req, res) => {
  const { meetingId, topic, parties, startdate, starttime, enddate, endtime } = req.body;
  const sql = 'UPDATE meeting SET topic = ?, parties = ?, startdate = ?, starttime = ?, enddate = ?, endtime = ? WHERE meetingId = ?';
  db.query(sql, [topic, parties, startdate, starttime, enddate, endtime, meetingId], (err, result) => {
    if (err) {
      console.error('Error in updating the meeting', err);
      res.status(500).json({ error: 'An error has occurred' });
    } else {
      res.status(200).json({ message: 'Meeting updated Successfully' });
    }
  });
});

//to delete a meeting
app.delete('/deleteMeeting/:meetingId', (req, res) => {
  const meetingId = req.params.meetingId; 
  const sql = 'DELETE FROM meeting WHERE meetingId = ?';
  db.query(sql, [meetingId], (err, result) => {
    if (err) {
      console.error('Error in deleting the meeting', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Meeting deleted successfully' });
    }
  });
});


