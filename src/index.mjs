import {topHeadlinesUrl} from './newsApi.mjs'
import './news-article.mjs'

window.addEventListener('load', () => {
  fetchNews();
  registerSW();
})

async function fetchNews() {
  const res = await fetch(topHeadlinesUrl)
  const json = await res.json()

  const main = document.querySelector('main')

  json.articles.forEach(article => {
    let el = document.createElement('news-article')
    el.article = article
    main.appendChild(el)
  })
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js')
    } catch (e) {
      console.log(`SW registration failed`)
    }
  }
}