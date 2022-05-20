import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as admin from "firebase-admin";

const cors = require("cors")({ origin: true });

const smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

admin.initializeApp();

const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCpChza1DZ2zSTGt3y05Nf69FW7L1z700s",
  authDomain: "level-determination-test.firebaseapp.com",
  databaseURL: "https://level-determination-test.firebaseio.com",
  projectId: "level-determination-test",
  storageBucket: "level-determination-test.appspot.com",
  messagingSenderId: "757681122349",
  appId: "1:757681122349:web:3332aa828af81dbedc1ca4",
  measurementId: "G-EJBZTDERR8",
};
firebase.initializeApp(firebaseConfig);

export const sendEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== "POST") {
      response.status(404).send("");
      return;
    }
    if (!request.body.to || !request.body.subject || !request.body.text) {
      response.status(400).send("Bad Request");
      return;
    }

    const message = {
      from: "tiifa.leveling@gmail.com",
      to: request.body.to,
      subject: request.body.subject,
      text: request.body.text,
    };
    smtp.sendMail(message, function (error, info) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(204).send("");
    });
  });
});

export const createUser = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== "POST") {
      response.status(404).send("");
      return;
    }
    if (!request.body.email) {
      response.status(400).send("Bad Request");
      return;
    }
    const email = String(request.body.email);
    admin
      .auth()
      .createUser({
        email: email,
      })
      .then((userRecord) => {
        response.status(201).json(userRecord);
      })
      .catch((error) => {
        response.status(500).send(error);
        return;
      });
  });
});

// パスワード変更リンクの有効期限切れなどで再度送信する場合のapi
// export const resendEmail = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {
//     if (request.method !== "POST") {
//       response.status(404).send("");
//       return;
//     }
//     if (!request.body.email || !request.body.clientId) {
//       response.status(400).send("Bad Request");
//       return;
//     }
//     const email = String(request.body.email);
//     const clientId = String(request.body.clientId);
//     const actionCodeSettings = {
//       url: `https://level-determination-test.web.app/action?client=${clientId}&email=${encodeURIComponent(
//         email
//       )}`,
//     };

//     firebase
//       .auth()
//       .sendPasswordResetEmail(email, actionCodeSettings)
//       .then(() => {
//         response.status(204).json();
//         return;
//       })
//       .catch((error: any) => {
//         response.status(500).send(error);
//         return;
//       });
//   });
// });

// ユーザーの一括削除（普段は使っちゃダメなのでコメントアウト）
// export const deleteUsers = functions.https.onRequest((request, response) => {
//   if (request.method != "DELETE") {
//     response.status(404).send("");
//     return;
//   }
//   const sleep = (msec: number) =>
//     new Promise((resolve) => setTimeout(resolve, msec));

//   (async () => {
//     const users = await admin.auth().listUsers();
//     for (const user of users.users) {
//       console.log(user.uid);
//       await admin.auth().deleteUser(user.uid);
//       await sleep(50); // 速すぎると`QUOTA_EXCEEDED`になるので適当に間隔を開ける
//     }
//     response.status(204).send("");
//   })();
// });
