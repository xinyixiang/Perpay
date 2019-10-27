import firebase from 'firebase';

const db = firebase.database();

export const getProfile = async (uid: string) => {
  const profile = (await db.ref(`users/${uid}/profile`).once('value')).val()
  return profile;
}

export const getWallet = async (phoneNumber: string) => {
  const wallet = (await db.ref(`wallets/${phoneNumber}`).once('value')).val();
  return wallet;
}

export const createUser = async (uid: string, phoneNumber: string) => {
  const profile = await getProfile(uid);

  if (!profile) {
    await db.ref(`users/${uid}/profile`).set({
      phoneNumber,
      createdAt: Date.now()
    });

    const wallet = await getWallet(phoneNumber);

    if (wallet) {
      await db.ref(`wallets/${phoneNumber}`).set({
        uid,
        ...wallet
      });
    } else {
      await db.ref(`wallets/${phoneNumber}`).set({
        uid,
        balance: 0,
        createdAt: Date.now()
      });
    }
  }
}

export const createAloneWallet = async (phoneNumber: string) => {
  const wallet = await getWallet(phoneNumber);

  if (!wallet) {
    const data = {
      balance: 0,
      createdAt: Date.now()
    };
    await db.ref(`wallets/${phoneNumber}`).set(data);
    return data;
  } else {
    return wallet;
  }
}