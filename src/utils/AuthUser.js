import Cookies from 'js-cookie';
import axios from 'axios';

class AuthUser {
    constructor() {
        this.user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL
        })
        this.http = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers: { 'ID': this.user ? this.user.id : '' }
        })
    }

    saveUser(user) {
        Cookies.set('user', JSON.stringify(user))
    }

    logout() {
        Cookies.remove('user');
    }
    addComa = (input) => {
        if (!input) return
        if (typeof input !== 'string') {
            input = input.toString()
        }
        let num = input.replace(/\D/g, '')
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return num
    }

}

export default AuthUser;