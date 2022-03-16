import { PageTemplate } from "../lib/Page.js";

class PageBlog extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'blog';
    }

    getBlogPostsData() {
        return [];
        // return [{}, {}, {}, {}];
    }

    emptyBlogHTML() {
        return '<div class="row empty-list">Seems like the blog is empty. Come back later, please! 💖</div>';
    }

    isValidPost(post) {
        return true;
    }

    blogPostHTML(post) {
        return `<article class="post">
                    <img src="/img/blog.jpg" alt="Blog image" class="post-img">
                    <h2 class="post-title">Blog post title</h2>
                    <p class="post-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, deleniti...</p>
                    <a href="./good-morning/" class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                </article>`;
    }

    blogListHTML(list) {
        let HTML = '';

        for (const item of list) {
            if (!this.isValidPost(item)) {
                continue;
            }
            HTML += this.blogPostHTML(item);
        }

        return `<div class="row list">${HTML}</div>
                <div class="row">
                    BLOG PAGINATION
                </div>`;
    }

    mainHTML() {
        const blogList = this.getBlogPostsData();
        const contentHTML = blogList.length ? this.blogListHTML(blogList) : this.emptyBlogHTML();

        return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    ${contentHTML}
                </section>`;
    }
}

export { PageBlog };