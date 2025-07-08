document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('articleForm');
    const titleInput = document.getElementById('articleTitle');
    const contentInput = document.getElementById('articleContent');
    const list = document.getElementById('articleList');
    const viewer = document.getElementById('viewer');
    const viewTitle = document.getElementById('viewTitle');
    const viewContent = document.getElementById('viewContent');
    const closeViewer = document.getElementById('closeViewer');

    let articles = loadArticles();
    renderArticles();

    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        if (title && content) {
            articles.push({ title, content });
            saveArticles();
            renderArticles();
            form.reset();
        }
    });

    closeViewer.addEventListener('click', () => {
        viewer.classList.add('hidden');
    });

    function renderArticles() {
        list.innerHTML = '';
        articles.forEach((article) => {
            const li = document.createElement('li');
            li.textContent = article.title;
            li.addEventListener('click', () => {
                viewTitle.textContent = article.title;
                viewContent.textContent = article.content;
                viewer.classList.remove('hidden');
            });
            list.appendChild(li);
        });
    }

    function loadArticles() {
        const data = localStorage.getItem('articles');
        try {
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    function saveArticles() {
        localStorage.setItem('articles', JSON.stringify(articles));
    }
});
