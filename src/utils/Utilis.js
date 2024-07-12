import toast, { Toaster } from 'react-hot-toast';

class Utils {
    constructor() {
        this.toast = toast;
        this.Toaster = Toaster;
    }
    getDate(dob) {
        const { year, day, month } = dob;
        return `${year}-${month}-${day}`;
    }
    addComa(input) {
        if (input === undefined || input === null) return

        if (typeof input !== 'string') {
            input = input.toString()
        }

        let num = input.replace(/[^0-9-]/g, '') // Keep only digits and minus sign
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Add commas for thousands separator
        return num
    }
}

export default Utils;