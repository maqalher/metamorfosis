;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_metamorfosis',
  urlsToCache = [
    './',
    './icono_favicon2.png',
    './icono_favicon2.png',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,900,900i',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css',
    './css/style.css',
    'https://code.jquery.com/jquery-2.1.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js',
    './js/init.js',
    './images/metamorfosis_Logo.png',
    './images/576295_7f620d023de8415bac283755650dccb4-mv2.jpg',
    './images/ana.jpg',
    './images/foto-martha.jpg',
    './images/layla.jpg',
    './images/icon_FB-ci-g.svg',
    './images/icon_TW-ci-g.svg',
    './images/icon_IS-ci-g.svg',
    './images/icon_IN-ci-g.svg',
    './images/576295_7f620d023de8415bac283755650dccb4-mv2.jpg',
    './images/576295_d323610cb4fb4b1d969b5431a9ddebbc-mv2.jpg'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
