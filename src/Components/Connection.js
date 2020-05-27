
export default {
   getBaseUrl() {
      return 'http://192.168.10.6/swap/public/api/';
   }
   ,
   getWebUrl() {
      return 'http://192.168.10.6/swap/public/';
   },

   getToken() {
      // return 'JDJ5JDEwJFJPVGpxRFh3Y2FHSEJuVTN1MjMvQi5Gb3Jjb2EuSFVLQ1YxNm5Bb2E1MUVLT1BjdDZXZngy';
      return this.getSessionToken();
   },

   setLoginSession(user) {
      try {
         localStorage.setItem('user', JSON.stringify(user))
         return true;
      } catch (error) {
         return false
      }
   },

   isLoggedIn() {
      if (localStorage.getItem('user')) {
         return true;
      } else {
         return false;
      }
   },
   getSessionToken() {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user.token;
   }
}
