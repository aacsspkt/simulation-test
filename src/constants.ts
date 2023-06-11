import assert from 'assert';
import bs58 from 'bs58';
import dotenv from 'dotenv';

import { web3 } from '@project-serum/anchor';

dotenv.config();

export const ZEBEC_PROGRAM = new web3.PublicKey('zbcKGdAmXfthXY3rEPBzexVByT2cqRqCZb9NwWdGQ2T');

const getPrivateKey = () => {
    const key = process.env.PRIVATE_KEY || ""
    assert(key != "", "Environment variable 'PRIVATE_KEY' is missing");

    return key;
};

export const KEYPAIR = web3.Keypair.fromSecretKey(bs58.decode(getPrivateKey()))