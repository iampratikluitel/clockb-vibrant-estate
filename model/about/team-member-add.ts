import { Schema, model, models, Model } from 'mongoose';


const teamMemberSchema = new Schema({
    name:String,
    image: String,
    role: String,
    description: String,
    postedDate: {
      type: Date,
      default: Date.now(),
    },
}, { strict: false });

let TeamMember: Model<any>;
try {
  TeamMember = models.TeamMember || model('TeamMember', teamMemberSchema, 'TeamMember');
} catch (error) {
  TeamMember = model('TeamMember', teamMemberSchema, 'TeamMember');
}

export default TeamMember;