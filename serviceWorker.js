const staticCacheName = 'static-site-v4'
const dynamicCacheName = 'dynamic-site'
const ASSETS = [
	'/',
	'/src/assets/icons/',
	'/src/assets/screenshots/',
	'/src/components/ErrorBoundary/ErrorBoundary.tsx',
	'/src/context/AuthStatus/AuthStatus.tsx',
	'/src/Router/Router.tsx',
	'/src/components/PrivateRoute/PrivateRoute.tsx',
	'/src/pages/Home/Home.tsx',
	'/src/pages/NotFound/NotFound.tsx',
	'/src/pages/AuthenticationForm/AuthenticationForm.tsx',
	'/src/pages/AuthenticationForm/GoogleButton.tsx',
	'/src/pages/Note/Note.tsx',
	'/src/pages/Workspace/Workspace.tsx',
	'/src/constants/errorMessages.ts',
	'/src/constants/messages.ts',
	'/src/constants/variables.ts',
	'/src/context/AuthProvider/AuthProvider.tsx',
	'/src/context/AuthProvider/useAuth.ts',
	'/src/App.scss',
	'/src/components/AddNoteButton/AddNoteButton.tsx',
	'/src/components/ListItem/ListItem.tsx',
	'/src/components/Loading/Loading.tsx',
	'/src/components/MainLayout/MainLayout.tsx',
	'/src/components/NothingFound/NothingFound.tsx',
	'/src/components/RouteWithErrorBoundary/RouteWithErrorBoundary.tsx',
	'/src/components/Sidebar/Sidebar.tsx',
	'/src/components/Toolbar/Toolbar.tsx',
	'/src/context/NotesProvider/NotesProvider.tsx',
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
