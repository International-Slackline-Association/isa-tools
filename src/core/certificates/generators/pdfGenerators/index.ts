// import * as honoraryMembers from './honorary-members';
// import * as rigger from './rigger';
// import * as isaMember from './isa-membership';
// import * as approvedGear from './approved-gear';
// import * as worldRecord from './world-record';
// import * as athleticAward from './athletic-award';
// import * as athleteExellence from './athletic-exellence';
// import * as contestOrganizer from './contest-organizer';
import * as instructor from './instructor';

export const pdfGenerators = {
  generateInstructorPDF: instructor.generate,
  // generateRiggerPDF: rigger.generate,
  // generateIsaMembershipPDF: isaMember.generate,
  // generateApprovedGearPDF: approvedGear.generate,
  // generateWorldRecordPDF: worldRecord.generate,
  // generateAthleticAwardPDF: athleticAward.generate,
  // generateAthleteExellencePDF: athleteExellence.generate,
  // generateContestOrganizerPDF: contestOrganizer.generate,
  // generateHonoraryMemberPDF: honoraryMembers.generate,
};
