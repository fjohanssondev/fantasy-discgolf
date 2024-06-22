import { handleCreateLeague, handleJoinLeague } from "~/actions/actions"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import Submit from "~/components/submit_button"

export default function CreateOrJoinLeague(){
  return (
    <div className="flex gap-12">
      <div>
        <h2>Create league</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={handleCreateLeague}>
              <DialogHeader>
                <DialogTitle>Create League</DialogTitle>
                <DialogDescription>
                  Start creating a league by giving it a name.
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
                      autoComplete="off"
                      placeholder="Enter league name"
                      className="col-span-3"
                    />
                  </div>
              </div>
              <DialogFooter>
                <Submit>Create</Submit>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <h2>Join league</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Join</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form action={handleJoinLeague}>
              <DialogHeader>
                <DialogTitle>Join league</DialogTitle>
                <DialogDescription>
                  Enter the league code to join a league.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="code" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    defaultValue=""
                    placeholder="Enter league code"
                  />
                </div>
              </div>
              <DialogFooter>
                <Submit>Join</Submit>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}