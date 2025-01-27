import crypto from 'crypto'

export const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
}
    
export const tokenExpiry = (seconds = 3600) => {
    return new Date(Date.now + seconds * 100);
}