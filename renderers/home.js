// renderers/home.js

    addEventListener('load',async  () =>{
    const profile = await window.electronAPI.getProfile();
    //document.getElementById('picture').src = profile.picture;
    document.getElementById('name').innerText = profile.name;
    //document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
  });
  
  document.getElementById('logout').onclick = () => {
    console.log("logout");
    window.electronAPI.logOut();
  };

  document.getElementById('getscore').onclick = async () => {
    var output = await window.electronAPI.getLeaderboard();
    console.log(output);
    console.log(output[0]);
  };
  document.getElementById('setscore').onclick = async () => {
    var profile = await window.electronAPI.getProfile();
    var inputData = {points: 1000, game:"CS", uid:profile.sub};
    console.log(inputData);
    var output = await window.electronAPI.setLeaderboard(inputData);
    console.log(output);
  };
  
  /*document.getElementById('secured-request').onclick = async () => {
    try {
      const response = await window.electronAPI.getPrivateData();
      const messageJumbotron = document.getElementById('message');
      messageJumbotron.innerText = response;
      messageJumbotron.style.display = 'block';
    } catch(error) {
      console.error('Error connecting to te API: ' + error);
    }
  };*/