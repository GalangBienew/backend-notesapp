const { nanoid } = require("nanoid");
const notes = require('./notes')


// 
const GetAllhandler = () => ({
    status: 'succes',
    data: {
        notes,
    }
})

// 

const deleteHandler = (request,h) => {
    const {id} = request.params

    const indexid = notes.findIndex((note) => note.id === id)

    if(indexid !== -1) {
        notes.splice(indexid,1)
        const response = h.response({
            status:'succces',
            messege: 'data sudah di hapus'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status:'failed',
        messege:'data gagal di hapus'
    })
    response.code(404)
    return response
}

// edit data
const editByhandler = (request, h) => {
    const { id } = request.params

    const { title, tags, body } = request.payload

    const updateAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)


    if (index != -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,

        }

        const response = h.response({
            status: 'succes',
            messege: 'data berhasi di rubah'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'failed',
        messege: 'data tidak berhasi di rubah'
    })
    response.code(404)
    return response
}


//untuk melihat data spesifik 

const getnoteByhandler = (request, h) => {
    const { id } = request.params

    const note = notes.filter((n) => n.id === id )[0];

    if( note !== undefined) {
        return {
            status : 'sucess',
            data : {
                note,
            }
        }
    }

}





// 
const handlerNotesapp = (request, h) => {
    const { title = 'untitle', tags, body } = request.payload;

    const id = nanoid(16);
    // Selanjutnya properti createdAt dan updatedAt. Karena kasus sekarang adalah menambahkan catatan baru, maka nilai kedua properti tersebut seharusnya sama. Jadi, kita bisa secara mudah memberikan nilai new Date().toISOString();
    // toISOstring format standar untuk waktu
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const Newnote = {
        title, tags, body, id, createAt, updateAt
    }

    notes.push(Newnote)

    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            status: 'succes',
            messege: "catatan telah ditambahkan",

            data: {
                noteId: id
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        messege: "catatan gagal untuk di tambahkan",
    })
    response.code(500)
    return response


}



module.exports = { handlerNotesapp, GetAllhandler, editByhandler, getnoteByhandler,deleteHandler };