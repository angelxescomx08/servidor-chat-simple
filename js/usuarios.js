const usuarios = []

const addUsuario = (usuario,socket)=>{
    usuarios.push(
        {
            "usuario":usuario,
            "socket": socket
        }
    )
}

const destinoSocket = (usuario) =>{
    let ind
    usuarios.forEach((element,index)=>{
        if(element.usuario === usuario){
            ind = index
        }
    })
    return usuarios[ind].socket
}

const deleteUsuario = (socket)=>{
    let ind
    usuarios.forEach((element,index)=>{
        if(socket.id===element.socket.id){
            ind = index
        }
    })
    usuarios.splice(ind,1)
}

module.exports = {usuarios, addUsuario, destinoSocket, deleteUsuario}