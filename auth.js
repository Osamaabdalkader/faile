import { auth, database } from './firebase-config.js';

// تسجيل الدخول
export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// تسجيل الخروج
export function logout() {
  return auth.signOut();
}

// مراقبة حالة المصادقة
export function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

// تسجيل مستخدم جديد
export function register(email, password, name, referralCode = '') {
  return auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      
      // إنشاء مستخدم في قاعدة البيانات
      return database.ref('users/' + user.uid).set({
        name: name,
        email: email,
        points: 0,
        level: 0,
        referredBy: referralCode,
        referralPath: [],
        members: [],
        earnings: {},
        joinDate: new Date().toISOString()
      });
    });
}

// تسجيل دخول المالك
export function loginAsOwner(ownerPassword) {
  // تحقق من كلمة سر المالك
  if (ownerPassword === '773685428') {
    return login('osamaabdalkader100@gmail.com', 'owner_password');
  } else {
    return Promise.reject(new Error('كلمة سر المالك غير صحيحة'));
  }
}