self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(
          location.pathname.replace('service-worker.js', 'index.html'),
          { ignoreSearch: true },
        ),
      ),
    );
  }
});
