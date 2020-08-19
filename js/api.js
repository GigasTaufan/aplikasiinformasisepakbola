const konfigurasi = {
  base_url: 'https://api.football-data.org/v2/',
  api_token: '89e4a375e3f74c819e36b74a5065fcb8',
  league_id: '2021'
}

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
                            <li class="collection-item avatar" style="display:flex;align-items:center">
                              <img src="${urlTeamImage}" width="15px" alt="" class="circle"> &emsp;
                              <span class="title">${article.team.name}</span>
                            </li>
                          </a>
                        </ul>
                      </td>
                      <td>${article.playedGames}</td>
                      <td>${article.won}</td>
                      <td>${article.draw}</td>
                      <td>${article.lost}</td>
                      <td>${article.points}</td>
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
                            <li class="collection-item avatar" style="display:flex;align-items:center">
                              <img src="${urlTeamImage}" width="15px" alt="" class="circle"> &emsp;
                              <span class="title">${article.team.name}</span>
                            </li>
                          </a>
                        </ul>
                      </td>
                      <td>${article.playedGames}</td>
                      <td>${article.won}</td>
                      <td>${article.draw}</td>
                      <td>${article.lost}</td>
                      <td>${article.points}</td>
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
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var articleHTML = `
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${data.result.cover}" />
                            </div>
                            <div class="card-content">
                                <span class="card-title">${data.result.post_title}</span>
                                ${snarkdown(data.result.post_content)}
                            </div>
                        </div>
                    `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "article/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.result.cover}" />
                    </div>
                    <div class="card-content">
                        <span class="card-title">${data.result.post_title}</span>
                        ${snarkdown(data.result.post_content)}
                    </div>
                </div>
            `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  })
}

function getSavedTimFavorit() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {
      var description = article.post_content.substring(0, 100);
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
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
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${article.cover}" />
        </div>
        <div class="card-content">
          <span class="card-title">${article.post_title}</span>
          ${snarkdown(article.post_content)}
        </div>
      </div>
    `;
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}