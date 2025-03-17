"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var admin = require("firebase-admin");
var serviceAccount = {
    "type": "service_account",
    "project_id": "okinawa-now",
    "private_key_id": "8439cca9e9b8f42a2d127bdfe71e46ae1e18a89c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC79nAfi+BIp+Gy\nf1cw0FppoE/BlVtxEDU81OromYqwLYnr7I+pYIFP11M7CJHsNpn6JSEWexfhIott\npN9F5ICJuhDGfAXI+JkPqmA+cKkCYpbEEiYPSFThIlSfL8KnBdcNRWvaiE74dawf\ngcqxG6u61dNZef1teYj5qMN9pRWzTDfe98xlDXirhkJk4elLw9aGvPhODWvbnIhK\nJexb/XdNsQfc+q8/pcM3GyGeAUapfKxUcBWgoplhHfSN17GNCL1Lu3XWH/l1hS8a\nkC0jHNe9Z7+tM0FZrSiTi07LbuuUtU5yHy/VqvJSKLDuFXd7Gjpksp7LExKwUwpK\neZ1FiJ+9AgMBAAECggEAAkF2XgKNOgH9xOkfUEAn3Z2lZ2LV+pjhsq2xdgIltnCN\nd63amYNFegJRBuPW8HlFRsm8SGtIwZRrDPFOFqYj3sNDYUZqwVsuZxA54HX0qUkq\nmwbGuyc4kY0aa+CkWuHIj2m2XiSFohizbJtfpdl5qZ/YTfoXTwGG4cwjMHZTONgb\nhtcO0JhOwqWDFgbSnNhFAtsisAozTVMurEtghsybOQw4Rd6yP1c8BKjojP+5oWkA\nn/8HT1UcoyJFsaqA7nAhsVGVLnbethgsNIYrVR2QdjfFQFIufEwfGDfcssMoxcoq\n2OykllIAWAf2jLakSLeyCDJLMb37JLcs9DwD4YS2gQKBgQDymywAkKSQmFpqYbIS\nnIBbNDnNWnlM5iL5b1Fxt8oNlQHayikJBPJ7P9lasvLHbCvXV3ljAZm1B3HmlrFW\nfF+ujXU1N7AjGXZ0OAQoMfLVfTVFDFUOl23t+HbQyxVdXJ83tvvG3DH5wBaG7kIv\n4kzGB6DngtYtreZxhDRVp3wFwQKBgQDGVvj9QT9KY3qzOBvwLmglg50xZ32M95h7\nAd9w+2O9z6ZyNiUZmrn/51TpnQLmYGz5xO3PT1CCn1tjbWbvLukjGkyZdowZGOGN\nQH4R3ntbWAuXuu3iiByZYFe7zfHf7zIJWx8DG3Uso4wykUIcWibiQKUzHtfdyN7z\nx2t80xLw/QKBgHV1b15uqV5ghRYQatjb8ME3jezAqw3yNmix3qrCIw9kX1uAmVGG\nlafah++DyEuJMci2z0yCD9s32Yuc1gtbeC/YyTCU37B+uX0XSdv0Iu/+CPZ/PAcu\nhci7jTsVuChVmbit3USwg3m56K43WNA6LpWKR/sOu4euNG4tZfE6f6+BAoGBAJJM\nUurTtvCTAk2yBIGcaXvKYiev858IfvO0xPEcrUy0H009fQ4u4CXPqAWNqDbwR1HR\nHaz+Dx/aldl4OCYTTypyWrAUDnDwtmavfI6HsiwFfL+VxaSDy7yioPRJi7EnSZw3\nF1/+X+bmWCJwnPg201muX2yewpG4eiQNI872DpGtAoGBANr/AnqhWB2Lt/fvn4Uy\nz4OvlKOHHyA0/HVetu0a/c/fbHXlXMK8waY3Gp7XBQtD/YcrJ/cUJCHkKceY7S4l\nRjxsT6OQoKoo9vXWeUOGeCdZb71RCqf3ps0wtPtSXePPIYqCBDY9UtK/MOHO6UTb\nf31pTQzwr/yqD4gDcW2938H/\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@okinawa-now.iam.gserviceaccount.com",
    "client_id": "115856239916484376232",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40okinawa-now.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
exports.db = admin.firestore();
