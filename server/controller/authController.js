import userModel from '../model/userModel.js'

const register = async (req, res) => {
    try {
        const { username,password } = req.body;
        const user = await userModel.create({ username,password });
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

const login = async (req, res) => {

    try {
        const { username,password } = req.body;
        const user = await userModel.findOne({ username: username, password: password}).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }

}

export {register, login};