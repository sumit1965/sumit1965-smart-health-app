const CACHE = 'sha-v5';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : { title: 'Smart Health', body: 'Medication alert' };
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    requireInteraction: true,
    vibrate: [300, 100, 300, 100, 300],
    tag: d.tag || 'sha-alert'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
