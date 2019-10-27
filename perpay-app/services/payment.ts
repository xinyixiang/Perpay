import firebase from 'firebase';
import { createAloneWallet, getWallet } from './user';
import { toCurrency } from './utils';

const db = firebase.database();

export const addBalance = async (phoneNumber: string, amount: number) => {
  const wallet = await getWallet(phoneNumber);
  await db.ref(`wallets/${phoneNumber}`).set({
    ...wallet,
    balance: toCurrency((wallet.balance || 0) + amount)
  });
}

export const addExpense = async (totalAmount: number, payee: string, payers: string[]) => {
  const finalPayers = payers.filter(item => item !== payee);

  const eachAmount = toCurrency(totalAmount / payers.length);
  const payeeGainAmount = toCurrency(payers.includes(payee) ? totalAmount - eachAmount : totalAmount);

  await addBalance(payee, payeeGainAmount);

  for (const payer of finalPayers) {
    await db.ref(`wallets/${payee}/transactions`).push({
      type: 'lent',
      amount: eachAmount,
      to: payer,
      createdAt: Date.now()
    });

    await db.ref(`wallets/${payer}/transactions`).push({
      type: 'owed',
      amount: eachAmount,
      to: payee,
      createdAt: Date.now()
    });

    const wallet = await createAloneWallet(payer);
    await db.ref(`wallets/${payer}`).set({
      ...wallet,
      balance: toCurrency((wallet.balance || 0) - eachAmount)
    });
  }
}

export const settleUpExpense = async (amount: number, payee: string, payer: string) => {
  await db.ref(`wallets/${payer}/transactions`).push({
    type: 'sent',
    amount,
    to: payee,
    createdAt: Date.now()
  });
  await db.ref(`wallets/${payee}/transactions`).push({
    type: 'received',
    amount,
    to: payer,
    createdAt: Date.now()
  });
  await addBalance(payee, -amount);
  await addBalance(payer, amount);
}

export const getTransactions = async (phoneNumber: string) => {
  const transactionsRef = await db
    .ref(`wallets/${phoneNumber}/transactions`)
    .orderByKey()
    .once('value')

  if (transactionsRef.exportVal()) {
    return Object.values(transactionsRef.exportVal()).reverse();
  } else {
    return [];
  }
}