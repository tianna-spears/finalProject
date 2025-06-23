// create user
// get user
// update user by ID
// delete user by ID

// get user
const getUsers = async (req, res) => {
    const user = await User.find()
    res.send({ user })
}

// create user 
const createUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email && !password) {
        return res.status(500).send('User not found. Please try again')
    }
    res.status(200).send('User successfully created!')
}

const updateUser = async (req, res) => {
    const update = await User.findByID()
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    // deleteUser   
}