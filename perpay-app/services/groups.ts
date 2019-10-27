import firebase from 'firebase';
import { createAloneWallet, getWallet, getProfile } from './user';
import { toCurrency } from './utils';

const db = firebase.database();

export const createGroup = async (uid: string, magicCode: string) => {
  await db.ref(`groups/${magicCode}/users`).push(uid);
  await db.ref(`groups/${magicCode}/name`).set(`New Group ${magicCode}`);
  await db.ref(`groups/${magicCode}/createdAt`).set(Date.now());
  await db.ref(`users/${uid}/groups`).push(magicCode);
}

export const getGroupUsers = async (magicCode: string) => {
  const usersRef = await db
    .ref(`groups/${magicCode}/users`)
    .orderByKey()
    .once('value')

  if (usersRef.exportVal()) {
    return Object.values(usersRef.exportVal()).reverse() as string[];
  } else {
    return [];
  }
}

export const getGroupTransactions = async (magicCode: string) => {
  const transactionsRef = await db
    .ref(`groups/${magicCode}/transactions`)
    .orderByKey()
    .once('value')

  if (transactionsRef.exportVal()) {
    return Object.values(transactionsRef.exportVal()).reverse();
  } else {
    return [];
  }
}

export const getGroupPhoneNumbers = async (magicCode: string) => {
  const members = await getGroupUsers(magicCode);
  const numbers = (await Promise.all(members.map(uid => getProfile(uid)))).map(item => item.phoneNumber);
  return numbers;
}

export const addGroupExpense = async (magicCode: string, totalAmount: number, payee: string) => {
  const payers = await getGroupPhoneNumbers(magicCode);
  const finalPayers = payers.filter(item => item !== payee);

  const eachAmount = toCurrency(totalAmount / payers.length);
  const payeeGainAmount = toCurrency(payers.includes(payee) ? totalAmount - eachAmount : totalAmount);

  await db.ref(`wallets/${payee}/transactions`).push({
    type: 'group_lent',
    amount: payeeGainAmount,
    to: magicCode,
    createdAt: Date.now()
  });

  const payeeWallet = await getWallet(payee);
  await db.ref(`wallets/${payee}`).set({
    ...payeeWallet,
    balance: toCurrency(payeeWallet.balance + payeeGainAmount)
  });

  await db.ref(`groups/${magicCode}/transactions`).push({
    type: 'split',
    amount: totalAmount,
    createdAt: Date.now()
  });

  for (const payer of finalPayers) {
    await db.ref(`wallets/${payer}/transactions`).push({
      type: 'group_owed',
      amount: eachAmount,
      to: magicCode,
      createdAt: Date.now()
    });
    const wallet = await createAloneWallet(payer);
    await db.ref(`wallets/${payer}`).set({
      ...wallet,
      balance: toCurrency((wallet.balance || 0) - eachAmount)
    });
  }
}

export const getGroups = async (uid: string) => {
  const ref = await db
    .ref(`users/${uid}/groups`)
    .orderByKey()
    .once('value')

  if (ref.exportVal()) {
    const groups = Object.values(ref.exportVal()).reverse();
    const names = (await Promise.all(groups
      .map(magicCode => db
        .ref(`groups/${magicCode}/name`)
        .once('value')
      )
    )).map(ref => ref.val())

    const results = [];
    for (let i = 0; i < names.length; i++) {
      results.push({
        magicCode: groups[i],
        name: names[i]
      });
    }

    return results;
  } else {
    return [];
  }
}