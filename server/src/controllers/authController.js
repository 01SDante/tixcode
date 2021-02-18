const jwt = require('jsonwebtoken')

const {jwtSecret} = require('../config') 
const MyError = require('../utils/myError')
const User = require('../models/userModel')

exports.signup = async (req, res, next) => {
    try {
        const {name, surname, user, address, password, confirmPassword} = req.body
        
        const registeredUser = await User.findOne({user: user})
        
        if (registeredUser) {
            return next(new MyError(400, 'User already exists'))
        }

        const newUser = await User.create({
            name,
            surname,
            user,
            address,
            password,
            confirmPassword
        })
        
        newUser.password = undefined
        
        res.status(201).json({
            success: 'User created',
            user: newUser
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const {user, password} = req.body
        
        if (!user || !password) {
            return next(new MyError(401, 'User or password is missing'))
        }

        const registeredUser = await User.findOne({user: user})

        if (!registeredUser) {
            return next(new MyError(401, 'User does not exist'))
        }
            
        if (!await registeredUser.checkPassword(password, registeredUser.password)) {
            return next(new MyError(401, 'Password is wrong'))
        }

        const token = jwt.sign({id: registeredUser._id, user: registeredUser.user}, jwtSecret, {expiresIn: '1h'})

        res.status(200).json(token)
    } catch (error) {
        next(error)
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return next(new MyError(401, 'You must login to continue'))
        }

        const decoded = jwt.verify(token, jwtSecret)

        const registeredUser = await User.findById(decoded.id)

        if (!registeredUser) {
            return next(new MyError(401, 'User no longer exists'))
        }

        req.userData = {id: registeredUser._id, user: registeredUser.user}

        next()
    } catch (error) {
        next(error)
    }
}