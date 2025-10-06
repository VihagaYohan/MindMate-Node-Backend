const bcrypt = require('bcrypt')

// encrypt data
const encryptData = async (value: any) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(value, salt)
}

export default {
    encryptData
}