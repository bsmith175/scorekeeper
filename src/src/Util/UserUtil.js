export const getLeagueUserFromEmail = (email, league) => {
    return league.leagueUsers.find((value) => (value.user.email === email));
}