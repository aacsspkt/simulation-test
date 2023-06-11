import {
  AnchorProvider,
  Program,
  Wallet,
  web3,
} from '@project-serum/anchor';

import {
  KEYPAIR,
  ZEBEC_PROGRAM,
} from './constants';
import { Zebec } from './zebec';
import * as IDL from './zebec.json';

export function getConnection() {
    return new web3.Connection(web3.clusterApiUrl("devnet"))
}

export function getWallet() {
    return new Wallet(KEYPAIR);
}

export function getProvider() {
	return new AnchorProvider(
		getConnection(),
		getWallet(),
		AnchorProvider.defaultOptions(),
	);
}

export function getZebecProgram() {
	return new Program<Zebec>(IDL as Zebec, ZEBEC_PROGRAM, getProvider());
}
