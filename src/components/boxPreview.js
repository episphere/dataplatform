export function showPreview(id) {
  const access_token = JSON.parse(localStorage.parms).access_token;
  try{ 
    console.log("SHOWING PREVIEW", id);
    let previewContainer = document.getElementById('boxFilePreview');
    var preview = new Box.Preview();
    preview.show(id, access_token, {
      container: previewContainer,
      showDownload: true,
      header: 'light'
    });

  } catch(error) {
    console.error(error);
  }
}

export function updatePreview(id){
  const access_token = JSON.parse(localStorage.parms).access_token;
  
}
