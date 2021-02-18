const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Surname field is required'],
        trim: true
    },
    user: {
        type: String,
        required: [true, 'User field is required'],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address field is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minLength: [8, 'Password must be at least 8 characters long']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password field is required'],
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password
            },
            message: 'Passwords do not match'
        }
    }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.checkPassword = async function(typedPassword, hashedPassword) {
    return await bcrypt.compare(typedPassword, hashedPassword)
}

module.exports = mongoose.model('User', userSchema)