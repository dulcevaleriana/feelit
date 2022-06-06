let DUMMY_USERS = [
    {
        id:'ul',
        name:'Dulce guzman',
        email:'dulce@gmail.com',
        password:'proof',
        image:'image.png'
    }
]
const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS})
}

const postUsers = (req,res,next) => {}

const login = (req,res,next) => {}

exports.getUsers = getUsers;
exports.postUsers = postUsers;
exports.login = login;