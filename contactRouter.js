const router = require('express').Router()
const {
    getAllContacts,
    getSingleContact,
    createNewContact,
    updateContact,
    deleteContact
} = require('./contactController')

router.get('/', getAllContacts)
//for both create and update 
router.post('/', createNewContact)
router.get('/:id', getSingleContact)
router.get('/delete/:id', deleteContact) //for delete
//router.put('/:id', updateContact)
//router.delete('/:id', deleteContact)

module.exports = router