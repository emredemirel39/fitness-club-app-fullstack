const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());
app.options('http://localhost:3000/login', cors())

// database connection
const url = 'mongodb://localhost/';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', () => console.error(error));
db.once('open', () => console.log('DB is connected'));

// default users

db.dropCollection('users', async (err) => {

    const salt = await bcrypt.genSalt();
    
    const adminPassword = 'admin';
    const managerPassword = 'manager';
    const trainerPassword = 'trainer';
    const memberPassword = 'member';
    const chrisPassword = 'chris';
    const annaPassword = 'anna';
    const robertPassword = 'robert';
    const juliaPassword = 'julia';
    const ferryPassword = 'ferry';
    const katyPassword = 'katy';
    const johnPassword = 'john';
    const jessiePassword = 'jessie';

    const usersData = [
        {
            firstName: 'admin',
            lastName: 'admin',
            password: `${await bcrypt.hash(adminPassword, salt)}`, // for login authentication we need hashed password
            email: 'admin@admin.com',
            phoneNumber: 'admin',
            role: 'admin'
        },
        {
            firstName: 'member',
            lastName: 'member',
            password:  `${await bcrypt.hash(memberPassword, salt)}`,
            email: 'member@member.com',
            phoneNumber: 'member',
            role: 'member'
        },
        {
            firstName: 'trainer',
            lastName: 'trainer',
            password: `${await bcrypt.hash(trainerPassword, salt)}`,
            email: 'trainer@trainer.com',
            phoneNumber: 'trainer',
            role: 'trainer'
        },
        {
            firstName: 'manager',
            lastName: 'manager',
            password:  `${await bcrypt.hash(managerPassword, salt)}`,
            email: 'manager@manager.com',
            phoneNumber: 'manager',
            role: 'manager'
        },
        {
            firstName: 'Chris',
            lastName: 'Wayne',
            password: `${await bcrypt.hash(chrisPassword, salt)}`,
            email: 'chris@chris.com',
            phoneNumber: 'chris',
            role: 'trainer'
        },
        {
            firstName: 'Anna',
            lastName: 'Chloe',
            password: `${await bcrypt.hash(annaPassword, salt)}`,
            email: 'anna@anna.com',
            phoneNumber: 'anna',
            role: 'trainer'
        },
        {
            firstName: 'Robert',
            lastName: 'Down',
            password: `${await bcrypt.hash(robertPassword, salt)}`,
            email: 'robert@robert.com',
            phoneNumber: 'robert',
            role: 'member'
        },
        {
            firstName: 'Julia',
            lastName: 'Shen',
            password: `${await bcrypt.hash(juliaPassword, salt)}`,
            email: 'julia@julia.com',
            phoneNumber: 'julia',
            role: 'member'
        },
        {
            firstName: 'Ferry',
            lastName: 'Johnson',
            password: `${await bcrypt.hash(ferryPassword, salt)}`,
            email: 'ferry@ferry.com',
            phoneNumber: 'ferry',
            role: 'manager'
        },
        {
            firstName: 'Katy',
            lastName: 'Vernbloom',
            password: `${await bcrypt.hash(katyPassword, salt)}`,
            email: 'katy@katy.com',
            phoneNumber: 'katy',
            role: 'manager'
        },
        {
            firstName: 'John',
            lastName: 'Brook',
            password: `${await bcrypt.hash(johnPassword, salt)}`, // for login authentication we need hashed password
            email: 'john@john.com',
            phoneNumber: 'john',
            role: 'admin'
        },
        {
            firstName: 'Jessie',
            lastName: 'Waterman',
            password: `${await bcrypt.hash(jessiePassword, salt)}`, // for login authentication we need hashed password
            email: 'jessie@jessie.com',
            phoneNumber: 'jessie',
            role: 'admin'
        }
    ];

    if ( err ) {
        if (err.code === 26)  console.log('-- Users collection does not exists');
        else throw err;
      }
      else console.log( "-- Users collection dropped" );

      User.create ( usersData, async (err) => {
        if ( err ) throw err;
        console.log('-- Users inserted successfully' )
    })
});

// default events

db.dropCollection('events', async (err) => {

    const eventsData = [
        {
            hour: '12:00',
            day: 'tue',
            lesson: 'Yoga',
            trainer: 'Anna'
        },
        {
            hour: '17:00',
            day: 'fri',
            lesson: 'Aerobics',
            trainer: 'Anna'
        },
        {
            hour: '20:00',
            day: 'mon',
            lesson: 'Fitness',
            trainer: 'Chris'
        },
        {
            hour: '10:00',
            day: 'sun',
            lesson: 'Zumba',
            trainer: 'Chris'
        },
        {
            hour: '15:00',
            day: 'thu',
            lesson: 'Zumba',
            trainer: 'Chris'
        },
        {
            hour: '14:00',
            day: 'mon',
            lesson: 'Zumba',
            trainer: 'Chris'
        },
        {
            hour: '12:00',
            day: 'mon',
            lesson: 'Yoga',
            trainer: 'Anna'
        },
        {
            hour: '19:00',
            day: 'fri',
            lesson: 'Yoga',
            trainer: 'Anna'
        },
        {
            hour: '11:00',
            day: 'sat',
            lesson: 'Aerobics',
            trainer: 'Anna'
        }
    ];

    if ( err ) {
        if (err.code === 26)  console.log('-- Events collection does not exists');
        else throw err;
    }
    else console.log( "-- Events collection dropped" );

    Event.create ( eventsData, async (err) => {
        if ( err ) throw err;
        console.log('-- Events inserted successfully' )
    })
});


// routers
const usersRouter = require('./routers/users');
const eventsRouter = require('./routers/events');
const Event = require('./models/Event');


app.get('/', (req, res) => res.send('Node Mongo Express!'));

app.use('/users', usersRouter);
app.use('/events', eventsRouter);



app.listen('3001', () => console.log('Server is working...'))