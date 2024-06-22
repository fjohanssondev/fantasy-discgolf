export default function CreateLeague(){
  return (
    <div>
      <h1 className="sr-only">Create or Join league</h1>
      <div>
        <h2>Create league</h2>
        <form>
          <label htmlFor="leagueName">League name</label>
          <input type="text" id="leagueName" />
          <button>Create league</button>
        </form>
      </div>
      <div>
        <h2>Join league</h2>
        <form>
          <label htmlFor="leagueCode">League code</label>
          <input type="text" id="leagueCode" />
          <button>Join league</button>
        </form>
      </div>
    </div>
  )
}