// import * as approvedGear from './approved-gear';
import * as athleteExellence from './athlete-excellence';
import * as athleticAward from './athletic-award';
import * as honoraryMember from './honorary-member';
// import * as contestOrganizer from './contest-organizer';
import * as instructor from './instructor';
import * as isaMember from './isa-membership';
import * as rigger from './rigger';
import * as worldRecord from './world-record';

export const pdfGenerators = {
  generateInstructorPDF: instructor.generate,
  generateRiggerPDF: rigger.generate,
  generateAthleticAwardPDF: athleticAward.generate,
  generateIsaMembershipPDF: isaMember.generate,
  // generateApprovedGearPDF: approvedGear.generate,
  generateWorldRecordPDF: worldRecord.generate,
  generateAthleteExellencePDF: athleteExellence.generate,
  // generateContestOrganizerPDF: contestOrganizer.generate,
  generateHonoraryMemberPDF: honoraryMember.generate,
};
