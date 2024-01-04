import type { AsyncReturnType } from 'type-fest';
import { certificateSpreadsheet } from './spreadsheet';

export type CertificateType =
  | 'instructor'
  | 'rigger'
  | 'athletic-award'
  | 'athlete-excellence'
  | 'contest-organizer'
  | 'judge'
  | 'isa-membership'
  | 'world-record'
  | 'honoraryMember'
  | 'approved-gear';

export type InstructorItem = AsyncReturnType<typeof certificateSpreadsheet.getInstructors>[0];
