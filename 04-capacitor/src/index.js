// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css'

import { defineCustomElements } from '@ionic/core/loader'
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader'
import { Camera, CameraResultType } from '@capacitor/camera'
import { Storage } from '@capacitor/storage'

const SAVED_POSTS_KEY = 'saved-posts'
const PENDING_IMAGE_KEY = 'pending-imageUrl'

const postsListEle = document.querySelector('#posts-list')
const cameraBtnEle = document.querySelector('#camera-btn')

const modalEle = document.querySelector('#modal')
const modalFormSubmitEle = document.querySelector('#modal form')
const modalFormTitleEleFn = () => document.querySelector('#modal form input[name="title"]')
const modalFormBriefEleFn = () => document.querySelector('#modal form input[name="brief"]')
const modalFormCloseEle = document.querySelector('#modal #modal-close')
console.log(modalEle, modalFormSubmitEle, modalFormTitleEleFn(), modalFormBriefEleFn(), modalFormCloseEle)

const getPosts = async () => {
  const posts = await fetch('https://devfest-nantes-2018-api.cleverapps.io/blog').then(res => res.json())
  posts.forEach(post => (post.image = `https://devfest2018.gdgnantes.com${post.image}`))

  const savedPosts = JSON.parse((await Storage.get({ key: SAVED_POSTS_KEY })).value || '[]')
  return [...savedPosts.reverse(), ...posts]
}

const getCardEle = ({ title, brief, image }) => {
  const ele = document.createElement('ion-card')
  ele.innerHTML = `
  <img src="${image}" />
  <ion-card-header>
    <ion-card-title>${title}</ion-card-title>
  </ion-card-header>
  <ion-card-content>${brief}</ion-card-content>`
  return ele
}

const renderPosts = async () => {
  const posts = await getPosts()
  posts.forEach(post => postsListEle.appendChild(getCardEle(post)))
}
const clearPosts = () => {
  postsListEle.innerHTML = ''
}

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  })

  const imageUrl = image.webPath
  console.log(imageUrl)
  return imageUrl
}

const showModal = isVisible => modalEle.setAttribute('is-open', isVisible)

const blobUrlToBase64 = blobUrl =>
  new Promise(async resolve => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    const blob = await fetch(blobUrl).then(res => res.blob())
    reader.readAsDataURL(blob)
  })

const cameraBtnEventHandler = async () => {
  const imageBlobUrl = await takePicture()
  const imageBase64 = await blobUrlToBase64(imageBlobUrl)
  await Storage.set({ key: PENDING_IMAGE_KEY, value: imageBase64 })
  showModal(true)
}

const modalFormSubmitEventHandler = async event => {
  event.preventDefault()

  const image = (await Storage.get({ key: PENDING_IMAGE_KEY })).value
  const title = modalFormTitleEleFn().value
  const brief = modalFormBriefEleFn().value

  await Storage.remove({ key: PENDING_IMAGE_KEY })

  const savedPosts = JSON.parse((await Storage.get({ key: SAVED_POSTS_KEY })).value || '[]')
  savedPosts.push({ title, brief, image })
  await Storage.set({ key: SAVED_POSTS_KEY, value: JSON.stringify(savedPosts) })
  showModal(false)

  clearPosts()
  renderPosts()
}

const modalFormCloseEventHandler = async () => {
  await Storage.remove({ key: PENDING_IMAGE_KEY })
  showModal(false)
}

const init = async () => {
  // chargement de tous les composants
  // la démarche n'est pas optimale car nous importons tous les composants
  await defineCustomElements(window)
  await pwaElements(window)

  cameraBtnEle.addEventListener('click', cameraBtnEventHandler)
  modalFormSubmitEle.addEventListener('submit', modalFormSubmitEventHandler)
  modalFormCloseEle.addEventListener('click', modalFormCloseEventHandler)

  renderPosts()
}

init()
