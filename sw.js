/**
 * Mohammad Mahdi Portfolio - Service Worker (PWA Optimized)
 * Immediate Load, Offline Support, and Caching Strategy
 * Built for Fast Performance and Reliability
 */

// Version for cache busting
const CACHE_NAME = 'mm-portfolio-v1.2';
const OFFLINE_CACHE_NAME = 'mm-portfolio-offline-v1';

// Critical assets for immediate load
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/nebula.js',
    '/manifest.json',
    '/images/favicon.ico',
    '/images/apple-touch-icon.png',
    '/images/profile.jpg' // Add if you have real image
];

// Runtime assets (images, fonts, etc.)
const RUNTIME_ASSETS = [
    '/images/og-image.jpg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.gstatic.com/' // Google Fonts (partial match)
];

// Install event - Immediate precaching
self.addEventListener('install', (event) => {
    console.log('🔧 Installing Service Worker - Pre-caching assets...');
    
    // Claim clients immediately for new tabs
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Pre-caching core assets for immediate load...');
            return cache.addAll(PRECACHE_ASSETS).then(() => {
                console.log('✅ Core assets cached successfully');
                // Pre-cache offline fallback
                return caches.open(OFFLINE_CACHE_NAME).then((offlineCache) => {
                    return offlineCache.addAll(['/index.html']); // Simple fallback
                });
            }).catch((error) => {
                console.error('❌ Pre-caching failed:', error);
            });
        })
    );
});

// Activate event - Clean old caches
self.addEventListener('activate', (event) => {
    console.log('🔄 Activating Service Worker - Cleaning up old caches...');
    
    // Take control of all clients immediately
    event.waitUntil(clients.claim());
    
    // Clean up old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('mm-portfolio-')) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Cache cleanup complete - Ready for production');
            return self.clients.matchAll({ type: 'window' });
        }).then((clients) => {
            // Notify all clients of update
            clients.forEach((client) => {
                if (client.url && client.url.includes(location.origin)) {
                    client.postMessage({ type: 'SW_UPDATED', message: 'New version available - Refresh for updates!' });
                }
            });
        })
    );
});

// Fetch event - Immediate cache lookup with fallback
self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    
    // Skip non-GET, non-same-origin, and non-nav requests
    if (event.request.method !== 'GET' || 
        !url.startsWith(self.location.origin) ||
        event.request.destination === 'font' || // Fonts handled by runtime
        event.request.mode === 'navigate' && url.includes('/api/')) {
        return;
    }
    
    // Handle navigation requests (immediate from cache)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('/index.html').then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('⚡ Navigation served from cache:', event.request.url);
                    return cachedResponse;
                }
                
                // Fallback to network
                return fetch(event.request).then((networkResponse) => {
                    // Cache successful responses
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Offline fallback
                    console.log('🌐 Offline - Serving cached index.html');
                    return caches.match('/index.html');
                });
            })
        );
        return;
    }
    
    // Cache-first strategy for assets (immediate load)
    if (PRECACHE_ASSETS.some(asset => url.includes(asset)) || 
        url.endsWith('.css') || url.endsWith('.js')) {
        
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('🚀 Asset from cache:', url.split('/').pop());
                    return cachedResponse;
                }
                
                // Network fallback with caching
                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Offline: Return cached or 404
                    return caches.match('/index.html'); // Graceful fallback
                });
            })
        );
        return;
    }
    
    // Runtime caching for images/fonts (stale-while-revalidate)
    if (event.request.destination === 'image' || event.request.destination === 'style' || 
        url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
        
        event.respondWith(
            caches.open(RUNTIME_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        // Serve stale while revalidating
                        const fetchPromise = fetch(event.request).then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                cache.put(event.request, networkResponse.clone());
                            }
                        }).catch(() => {
                            console.warn('Failed to update runtime asset:', url);
                        });
                        
                        console.log('🔄 Stale-while-revalidate:', url.split('/').pop());
                        return cachedResponse;
                    }
                    
                    // Cache miss - fetch and cache
                    return fetch(event.request).then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // Offline image fallback (transparent placeholder)
                        return new Response('<svg width="1" height="1"/>', {
                            headers: { 'Content-Type': 'image/svg+xml' }
                        });
                    });
                });
            })
        );
        return;
    }
    
    // Default: Network-first for API/dynamic content
    event.respondWith(
        fetch(event.request).then((networkResponse) => {
            // Cache successful API responses
            if (networkResponse && networkResponse.status === 200 && 
                url.includes('/api/')) {
                caches.open(RUNTIME_CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
            }
            return networkResponse;
        }).catch((error) => {
            console.warn('Fetch failed - Offline:', url);
            // Offline for API: Return cached or error
            return caches.match(event.request) || 
                   new Response('Offline - Please check your connection.', {
                       status: 503,
                       statusText: 'Service Unavailable'
                   });
        })
    );
});

// Background sync for form submissions (if offline)
self.addEventListener('sync', (event) => {
    if (event.tag === 'form-submit') {
        event.waitUntil(
            // Restore pending form data (from IndexedDB or localStorage)
            // Simulate restoring and resending
            caches.open(RUNTIME_CACHE_NAME).then((cache) => {
                // Example: Resend queued forms
                console.log('📧 Background sync: Resending offline form...');
                // Implement your sync logic here (e.g., fetch queued data)
                return Promise.resolve();
            })
        );
    }
});

// Push notifications (optional - for future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/images/favicon.ico',
            badge: '/images/apple-touch-icon.png',
            vibrate: [100, 50, 100],
            data: { dateOfArrival: Date.now() },
            actions: [
                { action: 'explore', title: 'Explore Portfolio' },
                { action: 'close', title: 'Close' }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('Mohammad Mahdi Portfolio', options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else {
        // Default: Open portfolio
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Log SW messages from app.js
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    } else if (event.data && event.data.type === 'SW_LOG') {
        console.log('📱 SW:', event.data.message);
    }
});

// Export for debugging
console.log('🔥 Service Worker ready - Immediate caching enabled');
