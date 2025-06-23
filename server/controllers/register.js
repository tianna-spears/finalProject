// create user
// get user by ID
// update user by ID
// delete user by ID

const getUser = async (req, res) => {
    res.send('Get User')
}

const registerUser = async(req, res) => {
    res.send('Register user')
}


// create user 
// const registerUser  = async (req, res) => {
//     const { fname, lname, email, password } = req.body;

//     if(!fname && !lname && !email && !password) {
//         return res.status(500).send('User not found. Please try again')
//     }
//     res.status(200).send('User successfully created!')
// }

module.exports = getUser
    // registerUser