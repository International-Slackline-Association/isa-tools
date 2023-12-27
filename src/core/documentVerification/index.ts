import { getHash, putHash } from 'core/db/genericHash';
import { DDBGenericHashItem } from 'core/db/genericHash/types';
import { hashValue, signJWT, verifyJWT } from 'core/documentVerification/crypto';
import { JwtPayload } from 'jsonwebtoken';
import * as dateFns from 'date-fns';

export interface VerifiableDocumentPayload {
  content: string;
}

export const createSignedDocument = async (document: {
  expiresInSeconds: number;
  subject: string;
  content: string;
  createHash?: boolean;
}) => {
  const { content, expiresInSeconds, subject, createHash } = document;
  const payload: VerifiableDocumentPayload = {
    content,
  };
  const token = await signJWT(
    { payload },
    {
      expiresIn: expiresInSeconds,
      subject: subject,
      issuer: 'docs.slacklineinternational.org',
    },
  );

  let hash: string | undefined;
  if (createHash) {
    const hashItem: DDBGenericHashItem = {
      hash: hashValue(token),
      ddb_ttl: Math.round(Date.now() / 1000) + expiresInSeconds,
      value: token,
      description: content.substring(0, 100),
    };
    await putHash(hashItem);
    hash = hashItem.hash;
  }
  return {
    hash,
    token,
    verificationUrl: generateVerificationUrl(hash, token),
    expiresAt: dateFns.addSeconds(new Date(), expiresInSeconds).toISOString(),
  };
};

export const getSignedDocument = async (id?: string, token?: string) => {
  let signedContent = token;
  if (id) {
    const hash = await getHash(id);
    if (!hash) {
      throw new Error('NotFound');
    }
    signedContent = hash.value;
  }
  if (!signedContent) {
    throw new Error('NotFound');
  }
  try {
    const { iss, payload, iat, exp, sub } = verifyJWT(signedContent) as JwtPayload;
    return {
      issuer: iss,
      subject: sub,
      payload: payload as VerifiableDocumentPayload,
      issuedAt: new Date(iat! * 1000).toISOString(),
      expiresAt: new Date(exp! * 1000).toISOString(),
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        throw new Error('Expired');
      }
    }
    throw new Error('Invalid');
  }
};

const generateVerificationUrl = (hash?: string, token?: string) => {
  const base = 'https://verify.slacklineinternational.org/document';
  if (hash) {
    return `${base}?hash=${hash}`;
  }
  if (token) {
    return `${base}?token=${token}`;
  }
  throw new Error('Invalid verification url');
};
