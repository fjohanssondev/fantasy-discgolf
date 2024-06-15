import { auth, signIn } from "~/auth"
 
export async function SignIn() {

  const session = await auth()

  if (session?.user) return <p>Logged in as: <span className="font-semibold">{session?.user.name}</span></p>

  return (
    <form
      action={async () => {
        "use server"
        await signIn("discord")
      }}
    >
      <button type="submit">Login</button>
    </form>
  )
} 