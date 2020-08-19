const konfigurasi = {
  base_url: 'https://api.football-data.org/v2/',
  api_token: '89e4a375e3f74c819e36b74a5065fcb8',
  league_id: '2021'
}

// const base_url = 'https://api.football-data.org/v2/';
// const api_token = '89e4a375e3f74c819e36b74a5065fcb8';

let fetchData = (url) => {
  return fetch(url, {
    // method: "GET",
    headers: {
      'X-Auth-Token': konfigurasi.api_token
    }
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getKlasemenLiga() {
  if ("caches" in window) {
    caches.match(konfigurasi.base_url + "competitions/2021/standings?standingType=TOTAL").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          // console.log(data);
          var articlesHTML = "";
          data.standings[0].table.forEach(function (article) {
            let urlTeamImage = article.team.crestUrl;
            if (urlTeamImage == null || urlTeamImage == '') {
              urlTeamImage = 'https://via.placeholder.com/350';
            } else {
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            }
            articlesHTML += `
                  <tr>
                      <td>${article.position}</td>
                      <td>
                        <ul style="margin:0">
                            <a href="./article.html?id=${article.team.id}">
                            <li class="collection-item avatar">
                              <img src="${urlTeamImage}" width="30px" alt="" class="circle"> &emsp;
                            </li>
                          </a>
                          <a href="./article.html?id=${article.team.id}">
                            <span class="title">${article.team.name}</span>
                          </a>
                        </ul>
                      </td>
                      <td>${article.playedGames}</td>
                      <td style="color:green">${article.won}</td>
                      <td style="color:blue">${article.draw}</td>
                      <td style="color:red">${article.lost}</td>
                      <td><b>${article.points}</b></td>
                    </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("tim").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchData(konfigurasi.base_url + "competitions/2021/standings?standingType=TOTAL")
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.standings[0].table.forEach(function (article) {
        let urlTeamImage = article.team.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = 'https://via.placeholder.com/350';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        articlesHTML += `
                    <tr>
                      <td>${article.position}</td>
                      <td>
                        <ul style="margin:0">
                          <a href="./article.html?id=${article.team.id}">
                            <li class="collection-item avatar">
                              <img src="${urlTeamImage}" width="30px" alt="" class="circle"> &emsp;
                            </li>
                          </a>
                          <a href="./article.html?id=${article.team.id}">
                            <span class="title">${article.team.name}</span>
                          </a>
                        </ul>
                      </td>
                      <td>${article.playedGames}</td>
                      <td style="color:green">${article.won}</td>
                      <td style="color:blue">${article.draw}</td>
                      <td style="color:red">${article.lost}</td>
                      <td><b>${article.points}</b></td>
                    </tr>
                `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("tim").innerHTML = articlesHTML;
      // console.log(document.getElementById("articles"));
    })
    .catch(error);
}

function getTimById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get('id');

    if ('caches' in window) {
      caches.match(konfigurasi.base_url + 'teams/' + idParam).then(function (response) {
        if (response) {
          response.json().then(function (tim) {
            let urlTeamImage = tim.crestUrl;
            if (urlTeamImage == null || urlTeamImage == '') {
              urlTeamImage = 'https://via.placeholder.com/350';
            } else {
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            }
            var articleHTML = `
            <div class="row" style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
              <div class="col">
                <div style="justify-content: center;
                align-items: center;
                display: flex;">
                  <img src="${urlTeamImage}" class="image-responsive" alt="">
                </div>
              </div>
            </div>
            <div class="row" style = "display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
              <div class="col">
                <h4><b>${tim.name}</b></h4>
                <ul class="collection with-header"  id="card-detail">
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">home</i>
                    <span style="padding-left:8px">${tim.venue}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">group</i>
                    <span style="padding-left:8px">${tim.clubColors}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">location_on</i>
                    <span style="padding-left:8px">${tim.address}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">local_phone</i>
                    <span style="padding-left:8px">${tim.phone}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">email</i>
                    <span style="padding-left:8px">${tim.email}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById('body-content').innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(tim);
          });
        }
      });
    }

    fetchData(konfigurasi.base_url + 'teams/' + idParam)
      .then(status)
      .then(json)
      .then(function (tim) {
        let urlTeamImage = tim.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = 'https://via.placeholder.com/350';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        var articleHTML = `
          <div class="row" style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
            <div class="col">
              <div style="justify-content: center;
              align-items: center;
              display: flex;">
                <img src="${urlTeamImage}" class="image-responsive" alt="">
              </div>
            </div>
          </div>
          <div class="row" style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
            <div class="col">
              <h4><b>${tim.name}</b></h4>
              <ul class="collection with-header"  id="card-detail">
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">home</i>
                  <span style="padding-left:8px">${tim.venue}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">group</i>
                  <span style="padding-left:8px">${tim.clubColors}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">location_on</i>
                  <span style="padding-left:8px">${tim.address}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">local_phone</i>
                  <span style="padding-left:8px">${tim.phone}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">email</i>
                  <span style="padding-left:8px">${tim.email}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById('body-content').innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(tim);
      });
  });
}

function getSavedTimFavorit() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {
      let urlTeamImage = article.crestUrl;
      if (urlTeamImage == null || urlTeamImage == '') {
        urlTeamImage = 'https://via.placeholder.com/350';
      } else {
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      }
      articlesHTML += `
                  <div class="card" style="width:200px">
                    <a href="./article.html?id=${article.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img class="responsive-img" style="height:200px" src="${urlTeamImage}"/>
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title center-align">${article.name}</span>
                    </div>
                  </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (article) {
    articleHTML = '';
    var articleHTML = `
      <div class="card" style="width:200px">
        <a href="./article.html?id=${article.id}">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="responsive-img" style="height:200px" src="${urlTeamImage}"/>
          </div>
        </a>
        <div class="card-content">
          <span class="card-title center-align">${article.name}</span>
        </div>
      </div>
    `;
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}