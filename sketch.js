// =====================================================
// 💗 READING DASHBOARD
// Weather + Quotes + Spotify
// =====================================================


// =====================================================
// 🌤️ WEATHER
// =====================================================

let weatherURL =
  "https://api.open-meteo.com/v1/forecast?latitude=55.3948&longitude=12.1447&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1";

let weatherData;
let temp;
let weatherCode;
let weatherSym;


// =====================================================
// 🎧 SPOTIFY
// =====================================================

// ⭐ INDSÆT DIT CLIENT ID HER ⭐
const spotifyClientId = "b33a94c6acaf409b8dd146dc0c2c1201";


// SKAL være præcis den samme i Spotify Dashboard
const spotifyRedirectUri =
  "https://editor.p5js.org/claudia.sdl/full/SI2QkDMa1";


const spotifyScope =
  "user-read-recently-played";


let spotifyAccessToken = null;

let spotifySong =
  "Connect Spotify";

let spotifyArtist = "";

let spotifyAlbum = "";

let spotifyCover = null;

let spotifyConnected = false;

let spotifyLoading = false;


// =====================================================
// FONTS + BILLEDER
// =====================================================

let codeFont;
let symbolfont;
let bookImage;


// =====================================================
// TEKST
// =====================================================

let randomBird;
let todaysQuote;


// =====================================================
// ✨ BAGGRUND
// =====================================================

let particles = [];


// =====================================================
// 📖 QUOTES
// =====================================================

let bookQuotes = [

  "A reader lives a thousand lives.",

  "Books are a uniquely portable magic.",

  "So many books, so little time.",

  "There is no friend as loyal as a book.",

  "Reading is dreaming with open eyes.",

  "Books let you travel without moving your feet.",

  "Just one more chapter...",

  "A book a day keeps reality away."

];


// =====================================================
// SETUP
// =====================================================

async function setup() {
  console.log("MIN SKETCH URL:", window.location.href);

  createCanvas(
    windowWidth,
    windowHeight
  );


  // Fonts
  symbolfont =
    await loadFont(
      "Heartz.ttf"
    );


  codeFont =
    await loadFont(
      "WeatherSymbols.ttf"
    );


  // Bog GIF
  bookImage =
    await loadImage(
      "assets/book.gif"
    );


  // Vejr
  weatherData =
    await loadJSON(
      weatherURL
    );


  temp =
    weatherData.current.temperature_2m;


  weatherCode =
    weatherData.current.weather_code;


  // Random birds tekst
  randomBird =
    int(
      random(
        birds.length
      )
    );


  // Dagens quote
  todaysQuote =
    random(
      bookQuotes
    );


  // Hjerter + stjerner
  createParticles();


  // 🎧 Spotify
  await setupSpotify();


  // Opdater vejret hver time
  setInterval(
    updateWeather,
    60 * 60 * 1000
  );


  // Opdater Spotify hvert minut
  setInterval(
    updateSpotify,
    60 * 1000
  );
}


// =====================================================
// DRAW
// =====================================================

function draw() {

  drawBackground();

  drawParticles();

  drawGreeting();

  drawDateAndTime();

  drawWeather();

  drawQuote();

  drawBook();

  drawBirdText();

  drawSpotifyCircle();

  drawFavoriteCircle();
}


// =====================================================
// 💗 BAGGRUND
// =====================================================

function drawBackground() {

  // ☀️ SOL
  if (
    weatherCode === 0 ||
    weatherCode === 1
  ) {

    background(
      255,
      205,
      225
    );

  }


  // ☁️ SKYET
  else if (
    weatherCode >= 2 &&
    weatherCode <= 48
  ) {

    background(
      245,
      200,
      220
    );

  }


  // 🌧️ REGN
  else if (
    weatherCode >= 51 &&
    weatherCode <= 67
  ) {

    background(
      235,
      190,
      215
    );

  }


  // ❄️ SNE
  else if (
    weatherCode >= 71 &&
    weatherCode <= 77
  ) {

    background(
      255,
      220,
      235
    );

  }


  // 🌦️ BYGER
  else if (
    weatherCode >= 80 &&
    weatherCode <= 86
  ) {

    background(
      230,
      185,
      215
    );

  }


  // ⛈️ TORDEN
  else if (
    weatherCode >= 95
  ) {

    background(
      205,
      165,
      200
    );

  }


  // 💗 DEFAULT
  else {

    background(
      255,
      205,
      225
    );

  }
}


// =====================================================
// ✨ LAV PARTIKLER
// =====================================================

function createParticles() {

  particles = [];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    particles.push({

      x:
        random(width),

      y:
        random(height),

      size:
        random(
          10,
          28
        ),

      speed:
        random(
          0.15,
          0.5
        ),

      symbol:
        random([
          "♥",
          "♡",
          "✦",
          "✧"
        ]),

      alpha:
        random(
          40,
          110
        )

    });
  }
}


// =====================================================
// ✨ TEGN PARTIKLER
// =====================================================

function drawParticles() {

  push();


  textAlign(
    CENTER,
    CENTER
  );


  noStroke();


  for (
    let p of particles
  ) {

    fill(
      255,
      245,
      250,
      p.alpha
    );


    textSize(
      p.size
    );


    text(
      p.symbol,
      p.x,
      p.y
    );


    p.y -=
      p.speed;


    p.x +=
      sin(
        frameCount *
        0.02 +
        p.y
      ) *
      0.15;


    if (
      p.y < -30
    ) {

      p.y =
        height + 30;


      p.x =
        random(width);

    }
  }


  pop();
}


// =====================================================
// 🌅 HILSEN
// =====================================================

function drawGreeting() {

  let h =
    hour();


  let greeting;


  if (
    h < 11
  ) {

    greeting =
      "Godmorgen!";

  }


  else if (
    h < 17
  ) {

    greeting =
      "God eftermiddag!";

  }


  else {

    greeting =
      "Godaften!";

  }


  push();


  textAlign(
    CENTER
  );


  textFont(
    "Gabriela"
  );


  textSize(
    55
  );


  stroke(
    255
  );


  strokeWeight(
    5
  );


  fill(
    235,
    85,
    155
  );


  text(
    greeting,
    width / 2,
    75
  );


  pop();
}


// =====================================================
// 🕐 TID + DATO
// =====================================================

function drawDateAndTime() {

  let h =
    nf(
      hour(),
      2
    );


  let m =
    nf(
      minute(),
      2
    );


  let timeText =
    h +
    ":" +
    m;


  let dateText =
    day() +
    "/" +
    month() +
    "/" +
    year();


  push();


  textAlign(
    CENTER
  );


  textFont(
    "Gabriela"
  );


  noStroke();


  fill(
    170,
    90,
    130
  );


  // TID
  textSize(
    27
  );


  text(
    timeText,
    width / 2,
    120
  );


  // DATO
  textSize(
    16
  );


  text(
    dateText,
    width / 2,
    145
  );


  pop();
}


// =====================================================
// 🌤️ VEJR
// =====================================================

function drawWeather() {

  push();


  textAlign(
    CENTER
  );


  // 📍 STED

  textFont(
    "Gabriela"
  );


  textSize(
    16
  );


  noStroke();


  fill(
    160,
    90,
    125
  );


  text(
    "Tessebølle, DK",
    width / 2,
    180
  );


  // 🌡️ TEMPERATUR
  // Temperaturen vises kun her

  textSize(
    45
  );


  stroke(
    255
  );


  strokeWeight(
    3
  );


  fill(
    235,
    105,
    145
  );


  text(
    temp + "°",
    width / 2 - 90,
    245
  );


  // ☁️ VEJRSYMBOL

  weatherSym =
    getWeatherSymbol(
      weatherCode
    );


  textFont(
    codeFont
  );


  textSize(
    100
  );


  stroke(
    255
  );


  strokeWeight(
    3
  );


  fill(
    190,
    120,
    190
  );


  text(
    weatherSym,
    width / 2 + 90,
    260
  );


  // 📚 VEJRTEKST

  textFont(
    "Gabriela"
  );


  textSize(
    18
  );


  noStroke();


  fill(
    155,
    80,
    120
  );


  text(
    getWeatherMessage(),
    width / 2,
    305
  );


  pop();
}


// =====================================================
// 🌦️ VEJRSYMBOL
// =====================================================

function getWeatherSymbol(code) {

  if (
    code === 0
  ) {

    return "N";

  }


  else if (
    code >= 1 &&
    code <= 48
  ) {

    return "O";

  }


  else if (
    code >= 51 &&
    code <= 67
  ) {

    return "M";

  }


  else if (
    code >= 71 &&
    code <= 77
  ) {

    return "L";

  }


  else if (
    code >= 80 &&
    code <= 86
  ) {

    return "M";

  }


  else {

    return "O";

  }
}


// =====================================================
// 📚 VEJRTEKST
// =====================================================

function getWeatherMessage() {

  // ☀️ SOL

  if (
    weatherCode === 0 ||
    weatherCode === 1
  ) {

    if (
      temp >= 18
    ) {

      return (
        "Tag bogen med udenfor ☀️📖"
      );

    }

    else {

      return (
        "Solskin og en god bog 💗"
      );

    }
  }


  // ☁️ SKYET

  else if (
    weatherCode >= 2 &&
    weatherCode <= 3
  ) {

    return (
      "Cloudy reading weather ☁️📚"
    );

  }


  // 🌫️ TÅGE

  else if (
    weatherCode >= 45 &&
    weatherCode <= 48
  ) {

    return (
      "Lidt mystisk bogstemning i dag 🌫️"
    );

  }


  // 🌧️ REGN

  else if (
    weatherCode >= 51 &&
    weatherCode <= 67
  ) {

    return (
      "Regn + bog + tæppe = perfekt 🌧️📖"
    );

  }


  // ❄️ SNE

  else if (
    weatherCode >= 71 &&
    weatherCode <= 77
  ) {

    return (
      "Cozy reading weather ❄️☕"
    );

  }


  // 🌦️ BYGER

  else if (
    weatherCode >= 80 &&
    weatherCode <= 86
  ) {

    return (
      "En god dag til at blive inde 🌧️📚"
    );

  }


  // ⛈️ TORDEN

  else if (
    weatherCode >= 95
  ) {

    return (
      "Dramatic reading weather ⛈️📖"
    );

  }


  else {

    return (
      "Hvad skal vi læse i dag? 💗"
    );

  }
}


// =====================================================
// 📖 DAGENS QUOTE
// =====================================================

function drawQuote() {

  push();


  textAlign(
    CENTER,
    CENTER
  );


  textFont(
    "Gabriela"
  );


  noStroke();


  fill(
    155,
    80,
    120
  );


  textSize(
    18
  );


  text(
    "📖 Dagens quote",
    width / 2,
    355
  );


  fill(
    180,
    95,
    135
  );


  textStyle(
    ITALIC
  );


  textSize(
    18
  );


  text(
    '"' +
    todaysQuote +
    '"',
    width / 2,
    395
  );


  textStyle(
    NORMAL
  );


  pop();
}


// =====================================================
// 📖 BOG GIF
// =====================================================

function drawBook() {

  if (
    !bookImage
  ) {

    return;

  }


  push();


  imageMode(
    CENTER
  );


  let floating =
    sin(
      frameCount *
      0.04
    ) *
    4;


  let bookWidth =
    100;


  let bookHeight =
    bookImage.height /
    bookImage.width *
    bookWidth;


  image(
    bookImage,
    width / 2,
    455 + floating,
    bookWidth,
    bookHeight
  );


  pop();
}


// =====================================================
// 💗 RANDOM TEKST FRA BIRDS
// =====================================================

function drawBirdText() {

  push();


  textAlign(
    CENTER,
    CENTER
  );


  textFont(
    "Gabriela"
  );


  noStroke();


  fill(
    180,
    95,
    135
  );


  textSize(
    16
  );


  text(
    birds[
      randomBird
    ],
    width / 2,
    520
  );


  pop();
}


// =====================================================
// 🎧 SPOTIFY CIRKEL
// =====================================================

function drawSpotifyCircle() {

  let x =
    width * 0.17;


  let y =
    height * 0.68;


  let normalSize =
    240;


  let circleSize =
    normalSize;


  let d =
    dist(
      mouseX,
      mouseY,
      x,
      y
    );


  // Hover
  if (
    d <
    normalSize / 2
  ) {

    circleSize =
      255;

  }


  push();


  // CIRKEL

  stroke(
    255
  );


  strokeWeight(
    6
  );


  fill(
    238,
    140,
    180
  );


  circle(
    x,
    y,
    circleSize
  );


  textAlign(
    CENTER,
    CENTER
  );


  textFont(
    "Gabriela"
  );


  noStroke();


  // ===================================================
  // IKKE FORBUNDET
  // ===================================================

  if (
    !spotifyConnected
  ) {

    textSize(
      38
    );


    fill(
      255
    );


    text(
      "🎧",
      x,
      y - 38
    );


    textSize(
      18
    );


    text(
      spotifyLoading
        ? "Connecting..."
        : "Connect Spotify",
      x,
      y + 15
    );


    textSize(
      13
    );


    fill(
      255,
      225,
      240
    );


    text(
      "Click here",
      x,
      y + 45
    );

  }


  // ===================================================
  // FORBUNDET
  // ===================================================

  else {

    // Albumcover

    if (
      spotifyCover
    ) {

      imageMode(
        CENTER
      );


      image(
        spotifyCover,
        x,
        y - 48,
        75,
        75
      );

    }


    fill(
      255,
      235,
      245
    );


    textSize(
      12
    );


    text(
      "LAST LISTENED",
      x,
      y + 5
    );


    // SANG

    fill(
      255
    );


    textSize(
      17
    );


    text(
      shortenText(
        spotifySong,
        22
      ),
      x,
      y + 32
    );


    // ARTIST

    fill(
      255,
      225,
      240
    );


    textSize(
      14
    );


    text(
      shortenText(
        spotifyArtist,
        25
      ),
      x,
      y + 58
    );

  }


  pop();


  // SPOTIFY LABEL

  push();


  textAlign(
    CENTER
  );


  textFont(
    "Gabriela"
  );


  textSize(
    18
  );


  noStroke();


  fill(
    155,
    80,
    120
  );


  text(
    "Spotify",
    x,
    y +
    circleSize / 2 +
    30
  );


  pop();
}


// =====================================================
// 💗 FAVORITES CIRKEL
// =====================================================

function drawFavoriteCircle() {

  let x =
    width * 0.83;


  let y =
    height * 0.68;


  let normalSize =
    240;


  let circleSize =
    normalSize;


  let d =
    dist(
      mouseX,
      mouseY,
      x,
      y
    );


  if (
    d <
    normalSize / 2
  ) {

    circleSize =
      255;

  }


  push();


  stroke(
    255
  );


  strokeWeight(
    6
  );


  fill(
    238,
    140,
    180
  );


  circle(
    x,
    y,
    circleSize
  );


  textAlign(
    CENTER,
    CENTER
  );


  textFont(
    symbolfont
  );


  textSize(
    circleSize *
    0.42
  );


  noStroke();


  fill(
    255
  );


  // Heartz font
  text(
    "P",
    x,
    y
  );


  pop();


  // LABEL

  push();


  textAlign(
    CENTER
  );


  textFont(
    "Gabriela"
  );


  textSize(
    18
  );


  noStroke();


  fill(
    155,
    80,
    120
  );


  text(
    "Favorites",
    x,
    y +
    circleSize / 2 +
    30
  );


  pop();
}


// =====================================================
// 🎧 SPOTIFY SETUP
// =====================================================

async function setupSpotify() {

  // ---------------------------------------------------
  // ⭐ VIGTIG ÆNDRING
  //
  // Spotify sender ?code= til p5's FULL PAGE.
  // Selve sketchen ligger inde i en iframe.
  //
  // Derfor prøver vi at læse URL'en fra window.top.
  // ---------------------------------------------------

  let searchParams =
    "";


  try {

    searchParams =
      window.location.search;

  }

  catch (
    error
  ) {

    searchParams =
      window.location.search;

  }


  const params =
    new URLSearchParams(
      searchParams
    );


  const code =
    params.get(
      "code"
    );


  // Debug
  console.log(
    "Spotify code:",
    code
      ? "FUNDET"
      : "IKKE FUNDET"
  );


  // ===================================================
  // HVIS SPOTIFY HAR SENDT EN CODE TILBAGE
  // ===================================================

  if (
    code
  ) {

    spotifyLoading =
      true;


    console.log(
      "Spotify authorization code fundet!"
    );


    await exchangeSpotifyCode(
      code
    );


    spotifyLoading =
      false;


    // -------------------------------------------------
    // Fjern ?code= fra URL'en
    // -------------------------------------------------

    try {

      window.history.replaceState(
        {},
        document.title,
        spotifyRedirectUri
      );

    }

    catch (
      error
    ) {

      console.log(
        "Kunne ikke fjerne Spotify code fra URL."
      );

    }
  }


  // ===================================================
  // SE OM VI HAR TOKEN
  // ===================================================

  spotifyAccessToken =
    localStorage.getItem(
      "spotify_access_token"
    );


  if (
    spotifyAccessToken
  ) {

    console.log(
      "Spotify access token fundet!"
    );


    spotifyConnected =
      true;


    await getRecentlyPlayed();

  }

  else {

    console.log(
      "Intet Spotify access token endnu."
    );


    spotifyConnected =
      false;

  }
}


// =====================================================
// 🎧 LOGIN MED SPOTIFY
// =====================================================

async function loginSpotify() {

  spotifyLoading =
    true;


  // Lav PKCE verifier

  const verifier =
    generateRandomString(
      64
    );


  // Gem verifier i browseren

  localStorage.setItem(
    "spotify_code_verifier",
    verifier
  );


  // Lav SHA256

  const hashed =
    await sha256(
      verifier
    );


  // Lav challenge

  const challenge =
    base64encode(
      hashed
    );


  // Spotify login URL

  const authURL =
    new URL(
      "https://accounts.spotify.com/authorize"
    );


  const params = {

    response_type:
      "code",

    client_id:
      spotifyClientId,

    scope:
      spotifyScope,

    code_challenge_method:
      "S256",

    code_challenge:
      challenge,

    redirect_uri:
      spotifyRedirectUri

  };


  authURL.search =
    new URLSearchParams(
      params
    ).toString();


  // ---------------------------------------------------
  // ⭐ VIGTIGT
  //
  // Vi bruger TOP-vinduet.
  // Ellers prøver Spotify at åbne inde i p5 iframe.
  // ---------------------------------------------------

  window.location.href =
    authURL.toString();
}


// =====================================================
// 🎧 PKCE RANDOM STRING
// =====================================================

function generateRandomString(
  length
) {

  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


  const values =
    crypto.getRandomValues(
      new Uint8Array(
        length
      )
    );


  return values.reduce(

    (
      acc,
      x
    ) =>

      acc +
      possible[
        x %
        possible.length
      ],

    ""

  );
}


// =====================================================
// 🎧 SHA256
// =====================================================

async function sha256(
  plain
) {

  const encoder =
    new TextEncoder();


  const data =
    encoder.encode(
      plain
    );


  return window.crypto.subtle.digest(
    "SHA-256",
    data
  );
}


// =====================================================
// 🎧 BASE64
// =====================================================

function base64encode(
  input
) {

  return btoa(

    String.fromCharCode(

      ...new Uint8Array(
        input
      )

    )

  )

    .replace(
      /=/g,
      ""
    )

    .replace(
      /\+/g,
      "-"
    )

    .replace(
      /\//g,
      "_"
    );
}


// =====================================================
// 🎧 BYT SPOTIFY CODE TIL ACCESS TOKEN
// =====================================================

async function exchangeSpotifyCode(
  code
) {

  const verifier =
    localStorage.getItem(
      "spotify_code_verifier"
    );


  if (
    !verifier
  ) {

    console.log(
      "Spotify code verifier mangler!"
    );


    spotifyConnected =
      false;


    return;
  }


  try {

    const response =
      await fetch(

        "https://accounts.spotify.com/api/token",

        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/x-www-form-urlencoded"

          },

          body:
            new URLSearchParams({

              client_id:
                spotifyClientId,

              grant_type:
                "authorization_code",

              code:
                code,

              redirect_uri:
                spotifyRedirectUri,

              code_verifier:
                verifier

            })

        }

      );


    const data =
      await response.json();


    console.log(
      "Spotify token response:",
      data
    );


    // =================================================
    // TOKEN MODTAGET
    // =================================================

    if (
      data.access_token
    ) {

      spotifyAccessToken =
        data.access_token;


      localStorage.setItem(
        "spotify_access_token",
        data.access_token
      );


      // Refresh token

      if (
        data.refresh_token
      ) {

        localStorage.setItem(
          "spotify_refresh_token",
          data.refresh_token
        );

      }


      spotifyConnected =
        true;


      console.log(
        "Spotify connected!"
      );


      // Hent sang
      await getRecentlyPlayed();

    }


    // =================================================
    // FEJL
    // =================================================

    else {

      console.log(
        "Kunne ikke få Spotify token:",
        data
      );


      spotifyConnected =
        false;

    }

  }

  catch (
    error
  ) {

    console.log(
      "Spotify token fejl:",
      error
    );


    spotifyConnected =
      false;

  }
}


// =====================================================
// 🎧 HENT SENEST AFSPILLEDE SANG
// =====================================================

async function getRecentlyPlayed() {

  if (
    !spotifyAccessToken
  ) {

    return;

  }


  try {

    let response =
      await fetch(

        "https://api.spotify.com/v1/me/player/recently-played?limit=1",

        {

          headers: {

            Authorization:
              "Bearer " +
              spotifyAccessToken

          }

        }

      );


    // =================================================
    // TOKEN ER UDLØBET
    // =================================================

    if (
      response.status === 401
    ) {

      console.log(
        "Spotify token udløbet. Prøver refresh..."
      );


      let refreshed =
        await refreshSpotifyToken();


      if (
        refreshed
      ) {

        return await getRecentlyPlayed();

      }

      else {

        spotifyConnected =
          false;


        return;

      }
    }


    // =================================================
    // API FEJL
    // =================================================

    if (
      !response.ok
    ) {

      console.log(
        "Spotify API fejl:",
        response.status
      );


      return;
    }


    const data =
      await response.json();


    console.log(
      "Recently played:",
      data
    );


    // =================================================
    // VI HAR EN SANG
    // =================================================

    if (
      data.items &&
      data.items.length > 0
    ) {

      const track =
        data.items[0].track;


      // Sangtitel

      spotifySong =
        track.name;


      // Artist

      spotifyArtist =
        track.artists

          .map(
            artist =>
              artist.name
          )

          .join(
            ", "
          );


      // Album

      spotifyAlbum =
        track.album.name;


      // Albumcover

      if (
        track.album.images &&
        track.album.images.length > 0
      ) {

        spotifyCover =
          loadImage(
            track.album.images[0].url
          );

      }


      spotifyConnected =
        true;


      console.log(
        "Seneste sang:",
        spotifySong,
        "-",
        spotifyArtist
      );

    }


    // Ingen sange
    else {

      spotifySong =
        "No recent songs";

      spotifyArtist =
        "";

    }

  }

  catch (
    error
  ) {

    console.log(
      "Kunne ikke hente Spotify:",
      error
    );

  }
}


// =====================================================
// 🎧 REFRESH SPOTIFY TOKEN
// =====================================================

async function refreshSpotifyToken() {

  const refreshToken =
    localStorage.getItem(
      "spotify_refresh_token"
    );


  if (
    !refreshToken
  ) {

    console.log(
      "Intet Spotify refresh token."
    );


    return false;
  }


  try {

    const response =
      await fetch(

        "https://accounts.spotify.com/api/token",

        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/x-www-form-urlencoded"

          },

          body:
            new URLSearchParams({

              client_id:
                spotifyClientId,

              grant_type:
                "refresh_token",

              refresh_token:
                refreshToken

            })

        }

      );


    const data =
      await response.json();


    if (
      data.access_token
    ) {

      spotifyAccessToken =
        data.access_token;


      localStorage.setItem(
        "spotify_access_token",
        data.access_token
      );


      // Spotify kan også give et nyt refresh token

      if (
        data.refresh_token
      ) {

        localStorage.setItem(
          "spotify_refresh_token",
          data.refresh_token
        );

      }


      console.log(
        "Spotify token refreshed!"
      );


      return true;

    }

  }

  catch (
    error
  ) {

    console.log(
      "Spotify refresh fejl:",
      error
    );

  }


  return false;
}


// =====================================================
// 🎧 OPDATER SPOTIFY
// =====================================================

async function updateSpotify() {

  if (
    spotifyConnected
  ) {

    await getRecentlyPlayed();

  }
}


// =====================================================
// ✂️ FORKORT LANG SANG/ARTIST
// =====================================================

function shortenText(
  txt,
  maxLength
) {

  if (
    !txt
  ) {

    return "";

  }


  if (
    txt.length <=
    maxLength
  ) {

    return txt;

  }


  return (
    txt.substring(
      0,
      maxLength - 3
    ) +
    "..."
  );
}


// =====================================================
// 🖱️ CURSOR
// =====================================================

function mouseMoved() {

  let spotifyX =
    width * 0.17;


  let favoriteX =
    width * 0.83;


  let buttonY =
    height * 0.68;


  let overSpotify =
    dist(
      mouseX,
      mouseY,
      spotifyX,
      buttonY
    ) < 125;


  let overFavorite =
    dist(
      mouseX,
      mouseY,
      favoriteX,
      buttonY
    ) < 125;


  if (
    overSpotify ||
    overFavorite
  ) {

    cursor(
      HAND
    );

  }

  else {

    cursor(
      ARROW
    );

  }
}


// =====================================================
// 🖱️ KLIK
// =====================================================

function mousePressed() {

  let spotifyX =
    width * 0.17;


  let favoriteX =
    width * 0.83;


  let buttonY =
    height * 0.68;


  // ===================================================
  // 🎧 SPOTIFY
  // ===================================================

  if (
    dist(
      mouseX,
      mouseY,
      spotifyX,
      buttonY
    ) < 125
  ) {

    // Ikke connected
    // → Login

    if (
      !spotifyConnected
    ) {

      loginSpotify();

    }


    // Connected
    // → Opdater sang

    else {

      getRecentlyPlayed();

    }

  }


  // ===================================================
  // 💗 FAVORITES
  // ===================================================

  if (
    dist(
      mouseX,
      mouseY,
      favoriteX,
      buttonY
    ) < 125
  ) {

    console.log(
      "Favorites clicked!"
    );

  }
}


// =====================================================
// 🌤️ OPDATER VEJR
// =====================================================

async function updateWeather() {

  weatherData =
    await loadJSON(
      weatherURL
    );


  temp =
    weatherData.current.temperature_2m;


  weatherCode =
    weatherData.current.weather_code;
}


// =====================================================
// 🖥️ RESIZE
// =====================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );


  createParticles();
}
