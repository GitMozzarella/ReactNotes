const staticCacheName = 'static-site-v3'
const dynamicCacheName = 'dynamic-site'
const ASSETS = [
	'/',
	'/src/assets/icons/',
	'/src/components/ErrorBoundary/',
	'/src/context/AuthStatus/',
	'/src/Router/',
	'/src/components/PrivateRoute/',
	'/src/pages/Home/',
	'/src/pages/NotFound/',
	'/src/pages/AuthenticationForm/',
	'/src/pages/Note/',
	'/src/pages/Workspace/',
	'/src/constants/',
	'/src/context/AuthProvider/',
	'/src/App.scss',
	'/src/components/AddNoteButton/',
	'/src/components/ListItem/',
	'/src/components/Loading/',
	'/src/components/MainLayout/',
	'/src/components/NothingFound/',
	'/src/components/RouteWithErrorBoundary/',
	'/src/components/Sidebar/',
	'/src/components/Toolbar/',
	'/src/context/NotesProvider/',
	'/src/index.scss',
	'/src/main.tsx',
	'/src/hooks/',
	'/src/types/'
]

//install event
self.addEventListener('install', async () => {
	const cache = await caches.open(staticCacheName)
	await cache.addAll(ASSETS)
})

//activate event
self.addEventListener('activate', async () => {
	const cachesKeysArr = await caches.keys()
	await Promise.all(
		cachesKeysArr
			.filter(key => key !== staticCacheName && key !== dynamicCacheName)
			.map(key => caches.delete(key))
	)
})

//fetch event
self.addEventListener('fetch', event => {
	if (
		event.request.url.includes(
			'notes-eb92a-default-rtdb.europe-west1.firebasedatabase.app/notes'
		)
	) {
		event.respondWith(networkFirst(event.request))
	} else {
		event.respondWith(cacheFirst(event.request))
	}
})

async function cacheFirst(request) {
	const cachedResponse = await caches.match(request)
	return cachedResponse || fetch(request)
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (error) {
		const cachedResponse = await cache.match(request)
		return cachedResponse || caches.match('./src/pages/NotFound/NotFound.tsx')
	}
}
