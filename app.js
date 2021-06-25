const {connection} = require('./DbConfig');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./src/model/User');
const port = 8080

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

try {
    connection.authenticate();
    console.log('We are in !!!');
} catch (err) {
    console.log(err);
    console.log('something happen :/');
}

app.get('/test', (req,res) => {
    res.send('Ola Khe Ase...');
});

app.post('/create/user',(req,res) => {
    let body = req.body;
    console.log(body);

    User.create({
        name: body.name,
        user: body.user,
        pass: body.pass
    })

    res.send('User Created!');
});

app.get('/find/all/user',(req,res) => {
    User.findAll().then((users) => {
        res.send(users.map(user => {
            return {
                id: user.id,
                name: user.name
            }
        }));
    });
});

app.get('/find/user/:id', (req, res) => {
    let id = req.params.id;

    User.findByPk(id).then(user => {
        if(user != null) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }

    })
})

app.delete('/delete/user/:id', (req, res) => {
    let id = req.params.id;

    User.destroy({
        where: {
            id: id
        }
    }).then((rowsAffected) => {
        if (rowsAffected > 0) {
            res.send('Delete complete...');
        } else {
            res.sendStatus(404);
        }
    })
})

connection.sync().then(() => {
    console.log("DB sync started!");
});

app.listen(port, () => {
    console.log('Hi Im running on '+ port +' :D');
})