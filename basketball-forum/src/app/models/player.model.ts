export interface Player {
    _id: string;
    name: string;
    team: string;
    height: string;
    weight: string;
    description: string;
    userId: string;
    photo: string;
    likes?: string[];
}