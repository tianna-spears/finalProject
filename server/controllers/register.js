const registerUser = async(req, res) => {
    res.send('Register user')
}

// const registerUser  = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     if(!firstName && !lastName && !email && !password) {
//         return res.status(500).send('User not found. Please try again')
//     }
//     res.status(200).send('User successfully created!')
// }

module.exports = registerUser