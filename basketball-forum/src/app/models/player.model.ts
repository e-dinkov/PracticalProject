export interface Player {
  _id: string;
  name: string;
  team: string;
  height: string;
  weight: string;
  description: string;
  userId:  any;
  photo: string;
  likes?: string[];
  created_at: Date;
}