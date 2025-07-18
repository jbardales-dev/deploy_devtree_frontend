import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SocialNetwork } from "../types"

type DevTreeLinkProps = {
  link: SocialNetwork
}

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 px-5 py-2 flex items-center gap-5 rounded-lg transition-colors duration-300"
      {...attributes}
      {...listeners}
    >
      <div
        className={`w-12 h-12 bg-cover ${link.name.toLowerCase() === 'github' ? 'filter dark:invert' : ''
          }`}
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize text-black dark:text-white">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  )
}
