import logo from './avatar.png';
import './App.css';
import { useEffect, useState } from 'react';
const googleClientId =  '432556948420-h8rf3vftsjd23rl3e4gueh823n5p6vf2.apps.googleusercontent.com';
 
const loadGoogleScript = () => {
  
  (function () {
      const id = 'google-js';
      const src = 'https://apis.google.com/js/platform.js';
      
      const firstJs = document.getElementsByTagName('script')[0];
      
      if (document.getElementById(id)) { return; }
      const js = document.createElement('script'); 
      js.id = id;
      js.src = src;
      js.onload = window.onGoogleScriptLoad; 
      firstJs.parentNode.insertBefore(js, firstJs);
  }());    
  
}

function App() {
  
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  
  const onSuccess = (googleUser) => {
    debugger;
    console.log('result from google', googleUser);
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  useEffect(() => {
    
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    loadGoogleScript();
    
  }, []);

  return (
    <div className="App">
      <header className="App-header">Inicia sesión o regístrate en cuestión de segundos      </header>

        <img src={logo} className="App-logo" alt="logo" />

        <h6>Utiliza tu correo electrónico de Google para continuar con Lesacakana</h6>




        {!isLoggedIn &&
          <div class="center" id="google-signin"></div>
        }
        
        {isLoggedIn &&
          <div>
            <div>
              <img src={imageUrl} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <div class="center">
              <button className='btn-primary' onClick={logOut}>Log Out</button>
            </div>
          </div>
        }
    </div>
  );
}

export default App;
