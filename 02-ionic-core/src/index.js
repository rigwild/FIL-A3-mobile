// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css'

import { defineCustomElements } from '@ionic/core/loader'

const imagesList = document.getElementById('images-list')

const getPosts = () => fetch('https://devfest-nantes-2018-api.cleverapps.io/blog').then(response => response.json())

const getCardEle = ({ title, brief, image }) => {
  const ele = document.createElement('ion-card')
  ele.innerHTML = `
  <img src="https://devfest2018.gdgnantes.com${image}" />
  <ion-card-header>
    <ion-card-title>${title}</ion-card-title>
  </ion-card-header>
  <ion-card-content>${brief}</ion-card-content>`
  return ele
}

const init = async () => {
  // chargement de tous les composants
  // la démarche n'est pas optimale car nous importons tous les composants
  await defineCustomElements()

  const posts = await getPosts()

  posts.map(getCardEle).forEach(ele => imagesList.appendChild(ele))
  console.log(posts.map(getCardEle))
}

init()
