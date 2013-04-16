# * * * * * * * * * * * * *
# *                       *
# *       data-href       *
# *      MIT License      *
# *         v0.01         *
# *                       *
# * * * * * * * * * * * * *

#jslint browser: true
#global ActiveXObject

datahref = (ele) ->
  "use strict"
  ajax = undefined
  requrl = undefined
  classname = undefined
  data = {}
  ajax = (if (window.ActiveXObject) then new ActiveXObject("Microsoft.XMLHTTP") else (XMLHttpRequest and new XMLHttpRequest()) or null)
  ajaxTimeout = window.setTimeout(->
    ajax.abort()
    console.log "AJAX Timeout Error"
    alert ele.getAttribute("data-timeout")  if (ele.getAttribute("data-timeout") isnt `undefined`) and (ele.getAttribute("data-timeout") isnt null)
  , 6000)
  ajax.onreadystatechange = ->
    json = undefined
    if ajax.readyState is 4
      if ajax.status is 200
        clearTimeout ajaxTimeout
        if ajax.status isnt 200
          console.log "AJAX Response Error"
          alert ele.getAttribute("data-error")  if (ele.getAttribute("data-error") isnt `undefined`) and (ele.getAttribute("data-error") isnt null)
        else
          json = JSON.parse(ajax.responseText)
          if json.status is true
            ele.className = json.classname  if json.classname isnt `undefined`
            ele.innerHTML = json.innerhtml  if json.innerhtml isnt `undefined`
            ele.setAttribute "data-query", json.query  if json.query isnt `undefined`

  data.method = ele.getAttribute("data-method") or "POST"
  data.href = ele.getAttribute("data-href")
  data.query = ele.getAttribute("data-query")
  classname = ele.className
  if data.method is "POST"
    requrl = data.href
  else
    requrl = data.href + "?query=" + data.query + "&classname=" + classname
  ajax.open data.method, requrl, true
  ajax.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
  if data.method is "POST"
    ajax.send data.query
  else
    ajax.send()
datahrefinit = ->
  "use strict"
  links = undefined
  i = undefined
  links = document.getElementsByTagName("a")
  i = 0
  while i < links.length
    links[i].onclick = ->
      window.setTimeout datahref, 5, this
      false
    i += 1
ajaxTimeout = undefined
