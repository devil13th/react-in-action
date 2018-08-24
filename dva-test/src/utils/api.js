

let serverUrl = "/"
if(window.APP_CFG.serverUrl){
  serverUrl = window.APP_CFG.serverUrl
}



function headers() {
  const token = localStorage.getItem('token');

  return {
    //'Access-Control-Allow-Origin': '*',
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${token}`,
    //'token': token,
  };
}

function formHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
    'token': token,
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    //console.log(json)
    //alert(json.status)
    return json;
  });
}

function queryString(params) {
  console.log(params)
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    
    // params.token = localStorage.getItem('token');
    return fetch(`${serverUrl}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers()
    })
      .then(parseResponse);
  },

  post(url, data) {
    // data.token = localStorage.getItem('token');
    const body = JSON.stringify(data);
    console.log("data:" + body);
    //console.log(body);
    return fetch(`${serverUrl}${url}`, {
      method: 'POST',
      headers: headers(),
      //credentials: 'include',
      body,
    })
      .then(parseResponse);
  },

  postForm(url, formData) {
    return fetch(`${serverUrl}/${url}`, {
      method: 'POST',
      headers: formHeaders(),
      credentials: 'include',
      body: formData,
    })
      .then(parseResponse);
  },

  patch(url, data) {
    // data.token = localStorage.getItem('token');
    const body = JSON.stringify(data);

    return fetch(`${serverUrl}/${url}`, {
      method: 'PATCH',
      headers: headers(),
      credentials: 'include',
      body,
    })
      .then(parseResponse);
  },

  delete(url) {
    return fetch(`${serverUrl}${url}`, {
      method: 'DELETE'
    })
      .then(parseResponse);
  },
};
