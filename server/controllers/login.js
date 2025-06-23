// get user
const getUsers = async (req, res) => {
    // const user = await User.find()
    res.send('POST Users')
}

// create user 
// const getUsers = async (req, res) => {
//     const { email, password } = req.body;

//     if(!email && !password) {
//         return res.status(500).send('User not found. Please try again')
//     }
//     res.status(200).send('User successfully created!')
// }

module.exports = 
    getUsers
    // createUser,
    // updateUser,
    // deleteUser   
