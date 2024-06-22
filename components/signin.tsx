import { auth, signIn } from "~/auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
 
export async function SignIn() {
  const session = await auth()

  if (session?.user) return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="font-medium">{session?.user.name}</span>
    </div>
  )
    
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