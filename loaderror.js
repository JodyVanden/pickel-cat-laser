// Message shown when the game can't load PixiJS or its images.
function loadErrorMessage(protocol) {
  if (protocol === 'file:') {
    return 'The game can’t load its images when opened as a file. Run ./start_server.sh and open http://localhost:8000/index.html';
  }
  return 'Couldn’t load the game assets. Check your connection and reload the page.';
}
if (typeof module !== 'undefined') module.exports = { loadErrorMessage: loadErrorMessage };
