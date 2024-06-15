export type UserWithTeams = User & {
  userTeam: UserTeam[];
};

export type Player = {
  name: string;
  placement: string;
  pdga_number: string;
  player_rating: string;
  prize: string;
  points: string;
}