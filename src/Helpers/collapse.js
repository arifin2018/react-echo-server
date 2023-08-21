import { useState } from "react"

function useCollapse(id) {
    const [open, setOpen] = useState(false)


    function onToggle() {
        const element = document.getElementById(id)
        element.classList.toggle('expand')
        setOpen(!open)
    }

    return {onToggle, open}
}

export {useCollapse}