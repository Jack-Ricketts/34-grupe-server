import config from '../config.js';

class PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        this.data = data;
        this.title = 'Server';
        this.pageCSSfileName = 'home';
        this.pageJSfileName = '';
        this.isHomePage = false;
        this.isLogoutPage = false;
        this.yearStarted = 2022;
    }

    /**
     * Generuojamas puslapio `<head>` dalies HTML kodas.
     * @returns {string} HTML kodas
     */
    headHTML() {
        return `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${this.title}</title>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                    <link rel="manifest" href="/favicon/site.webmanifest">
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                    <meta name="msapplication-TileColor" content="#da532c">
                    <meta name="theme-color" content="#ffffff">
                    <link rel="stylesheet" href="/css/pages/${this.pageCSSfileName}.css">
                </head>`;
    }

    /**
     * Generuojamas puslapio `<header>` dalyje esancio logotipo HTML kodas.
     * @returns {string} HTML kodas
     */
    logoHTML() {
        if (this.isHomePage) {
            return `<img src="/img/logo.png" alt="Logo" class="logo">`;
        } else {
            return `<a href="/">
                        <img src="/img/logo.png" alt="Logo" class="logo">
                    </a>`;
        }
    }

    /**
     * Generuojamas puslapio `<header>` dalies HTML kodas.
     * @returns {string} HTML kodas
     */
    headerHTML() {
        const publicLinks = `<a href="/register/">Register</a>
                            <a href="/login/">Log in</a>`;
        const userLinks = `<a href="/create-blog-post/">Create post</a>
                            <a href="/logout/">Logout</a>`;

        return `<header class="container header">
                    <div class="row">
                        ${this.logoHTML()}
                        <nav>
                            <a href="/blog/">Blog</a>
                            ${this.data.user.isLoggedIn ? userLinks : publicLinks}
                        </nav>
                    </div>
                </header>`;
    }

    /**
     * Generuojamas puslapio `<footer>` dalies HTML kodas.
     * 
     * Copyright daliai yra automatiskai apskaiciuojamas ir suformatuojamas metu tekstas
     * @returns {string} HTML kodas
     */
    footerHTML() {
        const d = new Date();
        const currentYear = d.getFullYear();

        let year = this.yearStarted;
        if (this.yearStarted !== currentYear) {
            year += `-${currentYear}`;
        }

        return `<footer class="container">
                    <div class="row">
                        &copy; Copyrights ${year} Oxo All rights reserved.
                    </div>
                </footer>`;
    }

    /**
     * Generuojamas puslapio `<script>` dalies HTML kodas.
     * @returns {string} HTML kodas
     */
    scriptHTML() {
        if (this.pageJSfileName) {
            return `<script src="/js/pages/${this.pageJSfileName}.js" type="module" defer></script>`;
        }
        return '';
    }

    /**
     * Generuojamas puslapio `<main>` dalies HTML kodas.
     * @returns {Promise<string>} HTML kodas
     */
    async mainHTML() {
        return `PAGE CONTENT`;
    }

    /**
     * Generuojamas viso puslapio HTML kodas.
     * @returns {Promise<string>} HTML kodas
     */
    async render() {
        const logoutCookies = [
            'login-token=',
            'path=/',
            'domain=localhost',
            'max-age=0',
            'expires=Sun, 01 Jan 2000 00:00:00 GMT',
            // 'Secure',
            'SameSite=Lax',
            'HttpOnly'
        ];
        const extendSessionCookies = [
            'login-token=' + this.data.cookies['login-token'],
            'path=/',
            'domain=localhost',
            'max-age=' + config.cookiesMaxAge,
            'expires=Sun, 16 Jul 3567 06:23:41 GMT',
            // 'Secure',
            'SameSite=Lax',
            'HttpOnly'
        ];
        const headersObj = {};

        if (this.isLogoutPage) {
            headersObj['Set-Cookie'] = logoutCookies.join('; ');
        }

        if (this.data.user.isLoggedIn) {
            headersObj['Set-Cookie'] = extendSessionCookies.join('; ');
        }

        return [`<!DOCTYPE html>
                <html lang="en">
                    ${this.headHTML()}
                    <body>
                        ${this.headerHTML()}
                        <main>
                            ${await this.mainHTML()}
                        </main>
                        ${this.footerHTML()}
                        ${this.scriptHTML()}
                    </body>
                </html>`, headersObj];
    }
}

export { PageTemplate };