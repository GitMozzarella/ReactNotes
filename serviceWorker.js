const staticCacheName = 'static-site-v3'
const dynamicCacheName = 'dynamic-site-v3'
const ASSETS = [
	'/',
	'./src/assets/icons/',
	'./src/components/ErrorBoundary/',
	'./src/context/AuthStatus/',
	'./src/Router/',
	'./src/components/PrivateRoute/',
	'./src/pages/Home/',
	'./src/pages/NotFound/',
	'./src/pages/AuthenticationForm/',
	'./src/pages/Note/',
	'./src/pages/Workspace/',
	'./src/constants/',
	'./src/context/AuthProvider/',
	'./src/App.scss',
	'./src/components/AddNoteButton/',
	'./src/components/ListItem/',
	'./src/components/Loading/',
	'./src/components/MainLayout/',
	'./src/components/NothingFound/',
	'./src/components/PrivateRoute/',
	'./src/components/RouteWithErrorBoundary/',
	'./src/components/Sidebar/',
	'./src/components/Toolbar/',
	'./src/index.scss',
	'./src/main.tsx',
	'./src/hooks/',
	'./src/types/'
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
	event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	try {
		return (
			cached ??
			(await fetch(request).then(() => {
				return networkFirst(request)
			}))
		)
	} catch (error) {
		return networkFirst(request)
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (e) {
		const cached = await cache.match(request)
		return cached ?? (await caches.match('./src/pages/NotFound'))
	}
}
