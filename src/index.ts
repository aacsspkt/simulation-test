import { BN } from '@project-serum/anchor';
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';

import { KEYPAIR } from './constants';
import {
  getConnection,
  getWallet,
  getZebecProgram,
} from './program';
import { getDepositTokenTransaction } from './transactions';

const connection = getConnection();
const program = getZebecProgram();
const owner = getWallet();

async function simulateDeposit() {
	const amount = new BN("100000");
	const sourceAccount = owner.publicKey;
	const mint = new PublicKey("HCByP6cVmoTWrkBS5VuhiFK7pPNEcesQoAkNhUC55qay");

	const depositTx = await getDepositTokenTransaction(program, amount, sourceAccount, mint);

	const { blockhash } = await connection.getLatestBlockhash();

	const messageV0 = new TransactionMessage({
		payerKey: sourceAccount,
		recentBlockhash: blockhash,
		instructions: depositTx.instructions,
	}).compileToV0Message();

	const transaction = new VersionedTransaction(messageV0);

    transaction.sign([KEYPAIR])

    try {
        const response = await connection.simulateTransaction(transaction, {sigVerify: true});
        
        console.log("logs", response.value.logs)
        console.log("units consumed", response.value.unitsConsumed)
        console.log("return data", response.value.returnData)
        console.log("accounts", response.value.accounts)
        console.log("err", response.value.err)
    } catch (error) {
        console.log(error)
    }    
}

simulateDeposit()
