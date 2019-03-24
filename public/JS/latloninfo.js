$(function(){
  let t = new URLSearchParams(window.location.search);
  t.has('latlng')
  let coords = t.get('latlng');

  const fetchurl = `https://api.openaq.org/v1/measurements?has_geo=true&coordinates=${coords}&limit=1`
  console.log(fetchurl);
})