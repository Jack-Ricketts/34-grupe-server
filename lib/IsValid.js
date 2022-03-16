class IsValid {
    /**
     * Metodas `username` validavimui.
     * @param {string} text Vartotojo username
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static username(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "username" reiksme'];
        }
        return [false, 'Username is valid'];
    }

    /**
     * Metodas `email` validavimui.
     * @param {string} text Vartotojo email
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static email(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "email" reiksme'];
        }
        return [false, 'Email is valid'];
    }

    /**
     * Metodas `password` validavimui.
     * @param {string} text Vartotojo password
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static password(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "password" reiksme'];
        }
        return [false, 'Password is valid'];
    }
}

export { IsValid }