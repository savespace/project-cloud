'use strict';
// Ustawienia
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors-list',
  optTagsListSelector = '.tags.list';

// Funkcja kliknięcia w art
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const allArticles = document.querySelectorAll(optArticleSelector);
  for (let article of allArticles) {
    article.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}

// Generowanie listy linków do art
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    html += '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

// Generowanie tagów do art
function generateTags() {
  let allTags = [];

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    if (!tagWrapper) continue;

    let html = '';

    const articleTags = article.getAttribute('data-tags');
    if (!articleTags) {
      tagWrapper.innerHTML = '';
      continue;
    }

    const tagsArray = articleTags.split(' ').filter(Boolean);

    for (let tag of tagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      html += linkHTML + ' ';

      if (allTags.indexOf(linkHTML) == -1) {
        allTags.push(linkHTML);
      }
    }

    tagWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTags.join(' ');
}

// Kliknięcia w tagi
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeLink of activeTagLinks) {
    activeLink.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// Dodaje clicklistery do tagów
function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

// Generuje autorów w art
function generateAuthorsInArticles() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    if (!authorWrapper) continue;

    const author = article.getAttribute('data-author');
    authorWrapper.innerHTML = '<a href="#author-' + author + '">' + author + '</a>';
  }
}

//  Generuje liste autorów po prawej stronie
function generateAuthorsSidebar() {
  const articles = document.querySelectorAll(optArticleSelector);
  const authors = {};

  for (let article of articles) {
    const author = article.getAttribute('data-author');
    if (author) authors[author] = true;
  }

  const authorsListContainer = document.querySelector(optAuthorsListSelector);
  if (!authorsListContainer) return;

  let html = '';
  for (let author in authors) {
    html += '<li><a href="#author-' + author + '">' + author + '</a></li>';
  }

  authorsListContainer.innerHTML = html;

  const authorLinks = authorsListContainer.querySelectorAll('a');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

// Kliknięcie w autora
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeLink of activeAuthorLinks) {
    activeLink.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


// Dodanie cliclisterów do autorów
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

// Wyświetlanie listy tagów



generateTitleLinks();
generateTags();
generateAuthorsInArticles();
generateAuthorsSidebar();
addClickListenersToTags();
addClickListenersToAuthors();
