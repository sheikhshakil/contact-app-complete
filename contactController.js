const Contact = require('./Contact')
const mongoose = require('mongoose')

exports.getAllContacts = (req, res) => {
    Contact.find().then(contacts => {
        res.render('index', { contacts, error: {} })
    }).catch(e => {
        console.log(e);
    })
}

exports.getSingleContact = (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
}

exports.createNewContact = (req, res) => {
    let { name, phone, email, id } = req.body

    //error handler
    let error = {}
    if (!name) {
        error.name = "Please Input Your Name"
    }
    if (!phone) {
        error.phone = "Please Input Your Phone"
    }
    if (!email) {
        error.email = "Please Input Your Email"
    }
    let isError = Object.keys(error).length > 0

    if (isError) {
        Contact.find()
            .then(contacts => {
                res.render('index', { contacts, error })
            })
            .catch(e => {
                console.log(e);
            })

    }

    else {
        //check if id is available
        if (!id) {
            let contact = new Contact({ name, phone, email })
            contact.save()
                .then(() => {
                    Contact.find()
                        .then(contacts => {
                            res.render('index', { contacts, error: {} })
                        })
                        .catch(e => {
                            console.log(e);
                        })
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            //if id comes for update, then update
            //ekhane onk jotil ekta error chilo, id er sthe Whitespace ashtesilo, tai otake trim kore object id
            //te convert kora lagsilo, obossho convert na korleo hoy, sthe xtra update button o add korsi
            //cast error ashtesilo
            Contact.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id.trim()) }, { $set: { name, phone, email } }, { new: true, useFindAndModify: false })
                .then(() => {
                    Contact.find()
                        .then(contacts => {
                            res.render('index', { contacts, error: {} })
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }).catch(e => {
                    console.log(e)
                })
        }
    }
}

exports.deleteContact = (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', { contacts, error: {} })
                })
                .catch(e => {
                    console.log(e);
                })
        })
        .catch(e => {
            console.log(e)
        })
}

// exports.updateContact = (req, res) => {
//     let { id } = req.params
//     let { name, phone, email } = req.body
//     Contact.findOneAndUpdate({ _id: id }, { $set: { name, phone, email } }, { new: true, useFindAndModify: false })
//         .then(contact => {
//             res.json(contact)
//         })
//         .catch(e => {
//             console.log(e)
//         })
// }