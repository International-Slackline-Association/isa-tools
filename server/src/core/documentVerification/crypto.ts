import { ssm } from 'core/aws/clients';
import jwt, { SignOptions } from 'jsonwebtoken';
import { documentVerificationPublicKey } from './verificationPublicKey';
import { GetParametersCommand } from '@aws-sdk/client-ssm';
import { createHash } from 'crypto';

const jwtSecretSSMParameter = 'isa-documents-rsa-private-key';

export const signJWT = async (payload: Record<string, any>, opts: SignOptions) => {
  const ssmParam = await ssm.send(new GetParametersCommand({ Names: [jwtSecretSSMParameter] }));
  const jwtPrivateKey = ssmParam.Parameters?.[0].Value ?? '';

  const token = jwt.sign(payload, jwtPrivateKey, { ...opts, algorithm: 'RS256' });
  return token;
};

export const verifyJWT = (token: string) => {
  const payload = jwt.verify(token, documentVerificationPublicKey, { algorithms: ['RS256'] });
  return payload;
};

export const hashValue = (value: string) => {
  const hash = createHash('sha256').update(value).digest('hex');
  return hash.substring(0, 8);
};
