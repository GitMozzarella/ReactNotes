if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/serviceWorker.js')
		.then(registration => {
			console.log('Service Worker registered', registration)
		})
		.catch(error => {
			console.log('Service Worker not registered', error)
		})
}
