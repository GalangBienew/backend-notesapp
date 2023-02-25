const { handlerNotesapp,
    GetAllhandler, 
    editByhandler, 
    getnoteByhandler, 
    deleteHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: handlerNotesapp,

    },
    {
        method: 'GET',
        path: '/notes',
        handler: GetAllhandler
    },
    
    {
        method:'PUT',
        path:'/notes/{id}',
        handler: editByhandler
    },
    {
        method:'GET',
        path:'/notes/{id}',
        handler: getnoteByhandler
    },
    {
        method:'DELETE',
        path: '/notes/{id}',
        handler: deleteHandler
    }
    

]



module.exports = routes