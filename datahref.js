/* * * * * * * * * * * * *
 *                       *
 *       data-href       *
 *      MIT License      *
 *         v0.01         *
 *                       *
 * * * * * * * * * * * * */
 
/*jslint browser: true*/
/*global ActiveXObject*/

var ajaxTimeout;

function datahref(ele) {
  "use strict";
  var ajax, requrl, classname, data = {};
  ajax = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : (XMLHttpRequest && new XMLHttpRequest()) || null;
  ajaxTimeout = window.setTimeout(function () {
    ajax.abort();
    console.log("AJAX Timeout Error");
    if((ele.getAttribute('data-timeout') !== undefined)&&(ele.getAttribute('data-timeout') !== null)) {
      alert(ele.getAttribute('data-timeout'));
    }
  }, 6000);
  ajax.onreadystatechange = function () {
    var json;
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        clearTimeout(ajaxTimeout);
        if (ajax.status !== 200) {
          console.log("AJAX Response Error");
          if((ele.getAttribute('data-error') !== undefined)&&(ele.getAttribute('data-error') !== null)) {
            alert(ele.getAttribute('data-error'));
          }
        } else {
          json = JSON.parse(ajax.responseText);
          if(json.status === true) {
            if(json.classname !== undefined) {
              ele.className = json.classname;
            }
            if(json.innerhtml !== undefined) {
              ele.innerHTML = json.innerhtml;
            }
            if(json.query !== undefined) {
              ele.setAttribute('data-query',json.query);
            }
          }
        }
      }
    }
  };
  data.method = ele.getAttribute('data-method') || 'POST';
  data.href   = ele.getAttribute('data-href');
  data.query  = ele.getAttribute('data-query');
  classname   = ele.className;
  
  if(data.method === 'POST') {
    requrl = data.href;
  } else {
    requrl = data.href+'?query='+data.query+'&classname='+classname;
  }
  
  ajax.open(data.method, requrl, true);
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.setRequestHeader('Cache-Control', 'no-cache');
  
  if(data.method === 'POST') {
    ajax.send(data.query);
  } else {
    ajax.send();
  }
}


function datahrefinit() {
  "use strict";
  var links, i;
  
  links = document.getElementsByTagName('a');
  for(i=0;i<links.length;i+=1) {
    links[i].onclick = function () {
      window.setTimeout(datahref, 5, this);
      return false;
    };
  }
}
