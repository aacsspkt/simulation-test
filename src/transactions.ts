import {
  BN,
  Program,
} from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import { ZEBEC_PROGRAM } from './constants';
import { Zebec } from './zebec';

export function getZebecVault(address: PublicKey) {
    return PublicKey.findProgramAddressSync([address.toBuffer()], ZEBEC_PROGRAM)[0];
}


export async function getDepositTokenTransaction(program: Program<Zebec>, amount: BN, sourceAccount: PublicKey, mint: PublicKey){
    
    const sourceAccountTokenAccount = getAssociatedTokenAddressSync(mint, sourceAccount);    
    const zebecVault = getZebecVault(sourceAccount);
    const pdaAccountTokenAccount = getAssociatedTokenAddressSync(mint, zebecVault, true);
    
    const tx = await program.methods.depositToken(amount).accounts({
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        mint,
        pdaAccountTokenAccount,
        rent: SYSVAR_RENT_PUBKEY,
        sourceAccount,
        sourceAccountTokenAccount,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        zebecVault
    }).transaction()

    return tx;
}