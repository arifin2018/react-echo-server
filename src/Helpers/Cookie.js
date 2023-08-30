import Cookies from "universal-cookie";


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function DeleteAll(){
  const cookies = new Cookies(null, { 
    path: '/',
  });

  for (const cookie in cookies.getAll()) {
    cookies.remove(cookie,{path:'/'})
  }
}

function SetCookie(name,value,expires){
  const cookies = new Cookies(null, { 
    path: '/',
    expires: expires,
  });

  cookies.set(name,value)
}


export {getCookie,DeleteAll,SetCookie}