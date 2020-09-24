const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html','/'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});


// Listen for request 



self.addEventListener("fetch",(event)=>{
   
    if(!navigator.onLine){
        
        event.respondWith(
            caches.match(event.request)
                .then(()=>{
                    
                    return fetch(event.request).then((resp)=>{
                        if(resp){
                            return resp
                           
                        }
                    })
    
                       
                })
        )
        
    }

});


