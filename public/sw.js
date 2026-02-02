console.log("Service Worker script loaded");

self.addEventListener("install", (event) => {
  console.log('Service Worker: Event "install" is fired');
  //Add caching logic here
});

self.addEventListener("acitvate", (event) => {
  console.log('Service Worker: Event "activate" is fired');
});
