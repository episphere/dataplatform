function createBoxPreview(id) {
    const node = document.createElement('div');
    node.classList.add('preview-container');
    node.id = `file${id}Preview`; 
    return node;
}

export function showPreview(id) {
  const access_token = JSON.parse(localStorage.parms).access_token;
   
    console.log("SHOWING PREVIEW", id);
    let previewContainer = document.getElementById('boxFilePreview');
    var preview = new Box.Preview();
    preview.show(id, access_token, {
      container: previewContainer
    });
  
}

export function updatePreview(id){
  const access_token = JSON.parse(localStorage.parms).access_token;
  
}
