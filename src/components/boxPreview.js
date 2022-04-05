function createBoxPreview(id) {
    const node = document.createElement('div');
    node.classList.add('preview-container');
    node.id = `file${id}Preview`; 
    return node;
}

export function showPreviews(ids) {
  const access_token = JSON.parse(localStorage.parms).access_token;
  for (const id of ids) {
    let previewContainer = createBoxPreview(id);
    console.log("SHOWING PREVIEW", id);
    let section = document.getElementById(`study${id}`);
    section.insertBefore(previewContainer, section.firstChild);
    previewContainer.parentElement.style.display = 'block';
    var preview = new Box.Preview();
    preview.show(id, access_token, {
      container: previewContainer,
    });
}
}

export function showPreview(id) {
  const access_token = JSON.parse(localStorage.parms).access_token;
   
    console.log("SHOWING PREVIEW", id);
    let previewContainer = document.getElementById('boxFilePreview');
    var preview = new Box.Preview();
    preview.show(id, access_token, {
      container: previewContainer
    });
    /*let section = document.getElementById(`study${id}`);
    section.insertBefore(previewContainer, section.firstChild);
    previewContainer.parentElement.style.display = 'block';
    var preview = new Box.Preview();
    preview.show(id, access_token, {
      container: previewContainer,
    });*/
}

export function previewButtons(ids) {
  for (const id of ids.slice(1,)) {
    document.getElementById(`file${id}`)
  }
}