function main(){
  if (app.documents.length <= 0)
  {
      return;
  }

  var doc = app.activeDocument;
  var docName  = getDocNameAndSlice();

  renameLayerNames(doc, docName);
}

function getDocNameAndSlice(){
  var name = app.activeDocument.name;
  var reg = /\.psd|\.jpe?g/gi;
  return name.replace(reg, '');
}

function renameLayerNames(layerSet, docName){
  var name;
  for (var i = 0; i < layerSet.artLayers.length; i++){
    name = layerSet.artLayers[i].name;
    layerSet.artLayers[i].name = name.replace(/layer-0/gi, docName)
  };

  for (var i = 0; i < layerSet.layerSets.length; i++){
    name = layerSet.layerSets[i].name;
    layerSet.layerSets[i].name = name.replace(/layer-0|layer 0|layer0/gi, docName)
    
    renameLayerNames(layerSet.layerSets[i], docName);
  };
}

main();