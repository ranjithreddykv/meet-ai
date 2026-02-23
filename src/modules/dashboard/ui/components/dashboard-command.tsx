import React, { Dispatch, SetStateAction } from 'react'
import { CommandDialog , CommandInput, CommandItem, CommandList } from '@/components/ui/command'

interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({open , setOpen}:Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Find meeting or agent'/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}

export default DashboardCommand
