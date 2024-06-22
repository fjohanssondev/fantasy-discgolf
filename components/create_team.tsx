import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "./ui/button"
import { auth } from "~/auth"
import Submit from "~/components/submit_button"
import { handleCreateTeam } from "~/actions/actions"

export default async function CreateTeam() {
  const session = await auth()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleCreateTeam}>
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Fill in the form below to create your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue=""
                className="col-span-3"
                placeholder={`${session?.user?.name}'s Team`}
              />
            </div>
          </div>
          <DialogFooter>
            <Submit>Create Team</Submit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}