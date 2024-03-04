'use strict'

import User from './user.model.js'
import { checkPassword, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

//REGISTER
export const registerUser = async(req, res) => {
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({msg: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({msg: 'Error registerin user', err })
    }
}

export const login = async(req, res) => {
    try{
        let { phone, mail, username, password } = req.body

        let user = await User.findOne({$or: [{phone},{mail},{username}]})
        if(!user){
            if(username){
                return res.status(404).send({msg: 'The username you entered is not connected to an account'})
            }else if(mail){
                return res.status(404).send({msg: 'The mail you entered is not connected to an account'})
            }else if(phone){
                return res.status(404).send({msg: 'The phone you entered is not connected to an account'})
            }
        }

        if(user && await checkPassword(password, user.password)){
            let loggedUser ={
                uid: user._id,
                phone: user.phone,
                mail: user.mail,
                username: user.username,
                names: user.names
            }
            let token = await generateJwt(loggedUser)
            return res.send({
                msg: `Welcome ${user.names}`,
                loggedUser,
                token
            })
        }
        return res.status(404).send({msg: 'Invalid credentials'})
    }catch{
        console.error(err)
        return res.status(500).send({msg: 'Failed to login', err})
    }
}