const User = require('../models/userModel')
const MyError = require('../utils/myError')

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return next(new MyError(404, 'No user found for provided id'))
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}