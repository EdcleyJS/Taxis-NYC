var filterbymouth,filterbytri,alpha=43,left=22000,right=36000,database,interOn,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[],GeoLayer,LayerRange,layerTuto1,layerTuto2,layerTuto3,layerTuto4,dataset,max,featurename,selecionados=[],medias=[],hops=true,mesmedia,mesmediaN;
var mapMedia = L.map('vis4').setView([40.752866,-73.986023], 13);
var mapVis04 = L.map('vis04').setView([40.752866,-73.986023], 13);
var legendMedia = L.control({position: 'bottomright'});
var grades=[43,6000,12000,18000,24000,30000,36000,42000,54469];
var LayerMedia,GeoLayer2,GeoLayer3;
mapMedia.doubleClickZoom.disable();
mapVis04.doubleClickZoom.disable();
var infoMedia = L.control();

//-- MAPA DE MÉDIA COM ANIMAÇÃO DA ETAPA DE PERGUNTAS AO USUÁRIO. --
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mapMedia);

//-- DIV INFO DO MAPA CONTROLADO --
infoMedia.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

//-- DIV LEGENDA DO MAPA CONTROLADO --
legendMedia.onAdd = function (mapMedia) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorM(grades[i])+'; background:'+colorM(grades[i])+'"></i>'+grades[i]+'</br>';
  }
  return div;
};
legendMedia.addTo(mapMedia);

//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function inicioMedia(dados){
  var maximo=0;
  if(LayerMedia!= null){
    LayerMedia.clearLayers();
  }
  LayerMedia= L.geoJson(dados,{
    style: function(feature){
      if(mesmedia!=undefined){
        var media= distribuicaoNYC(feature.properties.OBJECTID)[mesmediaN];
      }else{
        var probArea= new distribuicaoTeste(distribuicaoNYC(feature.properties.OBJECTID),0);
        var media= probArea.media().toFixed(2);
      }
      
      if(opcoes.includes(feature.properties.OBJECTID)){
        return {
          weight: 3.5,
          opacity: 1,
          fillColor: colorM(media),
          dashArray: '3',
          color: 'blue',
          fillOpacity: 0.9
        };
      }else{      
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorM(media),
            color: 'black',
            fillOpacity: 0.9
        };
      }
    },
      onEachFeature: function (feature, layer) {
          if(mesmedia!=undefined){
            var media= distribuicaoNYC(feature.properties.OBJECTID)[mesmediaN];
          }else{
            var probArea= new distribuicaoTeste(distribuicaoNYC(feature.properties.OBJECTID),0);
            var media= probArea.media().toFixed(2);
          }
          layer.bindPopup(""+feature.properties.OBJECTID+": "+media);
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              LayerMedia.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(mapMedia);
  if(mesmedia!=undefined){
    infoMedia.update = function (props) {
      this._div.innerHTML= '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for the month of '+mesmedia+' in the period.');
    };
  }else{
    infoMedia.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoMedia.addTo(mapMedia);
}

//-- MAPA DE MÉDIA COM ANIMAÇÃO DA ETAPA DE PERGUNTAS AO USUÁRIO. --
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis04);

//-- DIV INFO DO MAPA CONTROLADO --
var infoVis04=L.control();
infoVis04.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis04 = L.control({position: 'bottomright'});
legendVis04.onAdd = function (mapMedia) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorM(grades[i])+'; background:'+colorM(grades[i])+'"></i>'+grades[i]+'</br>';
  }
  return div;
};
legendVis04.addTo(mapVis04);

//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function Vis04TutorialFunction(dados){
  var maximo=0;
  if(layerTuto4!= null){
    layerTuto4.clearLayers();
  }
  layerTuto4= L.geoJson(dados,
    {style: function(feature){
      if(mesmedia!=undefined){
        var media= distribuicaoNYC(feature.properties.OBJECTID)[mesmediaN];
      }else{
        var probArea= new distribuicaoTeste(distribuicaoNYC(feature.properties.OBJECTID),0);
        var media= probArea.media().toFixed(2);
      }
      if(opcoes.includes(feature.properties.OBJECTID)){
        return {
          weight: 3.5,
          opacity: 1,
          fillColor: colorM(media),
          dashArray: '3',
          color: 'blue',
          fillOpacity: 0.9
        };
      }else{      
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorM(media),
            color: 'black',
            fillOpacity: 0.9
        };
      }

      },onEachFeature: function (feature, layer) {
          if(mesmedia!=undefined){
            var media= distribuicaoNYC(feature.properties.OBJECTID)[mesmediaN];
          }else{
            var probArea= new distribuicaoTeste(distribuicaoNYC(feature.properties.OBJECTID),0);
            var media= probArea.media().toFixed(2);
          }
          layer.bindPopup(""+feature.properties.OBJECTID+": "+media);
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              LayerMedia.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(mapVis04);
  if(mesmedia!=undefined){
    infoVis04.update = function (props) {
      this._div.innerHTML= '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for the month of '+mesmedia+' in the period.');
    }
  }else{
    infoVis04.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoVis04.addTo(mapVis04);
}