import bcrypt from 'bcrypt'



export const hashPassword = async (password) => {
    try {
        const saltRounds = 12; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Optional: Rethrow the error for the caller to handle
    }
};
export const comparePassword = async (Password, hashedPassword) => {
    try {
        const comeparePassword = await bcrypt.compare(Password, hashedPassword);
        return comeparePassword;

    } catch (error) {
        console.log(error);

    }


}