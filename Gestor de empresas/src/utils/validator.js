import { compare, hash } from 'bcrypt'

export const encrypt = async(password) => {
    try{
        return await hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkPassword = async(password, hash) => {
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, companyId) => {
    if(companyId){
        if(
            Object.entries(data).length === 0 ||
            data.companyName == '' ||
            data.impactLevel == '' ||
            data.yearsOfTrayectory == '' ||
            data.category == ''
        )return false
        return true
    }
}