
export const signupValidation = ({username,email,password,confirmPassword})=> {
    if(!username || !email || !password || !confirmPassword){
        return{success:false , message:"Please Fill in all the fields"}
    }
    if(password.length < 8){
        return {success:false,message:'Password can not less than 8 characters '}
    }
    if( password !== confirmPassword){
        return {success:false,message:"Password do not match"}
    }

    return{success:true}
}

export const signinValidation = ({email,password})=> {
    if (!email || !password){
        return {success:false,message:"Please fill in all  the fields"}
    }

    return {success:true}
}

export const addItemValidation = ({title,tagline,imgURL,imdb,description})=> {
    if(!title || !tagline || !imgURL || !imdb || !description){
        return{success:false,message:"Please fill in all the fields"}
    }

    return{success:true}
}