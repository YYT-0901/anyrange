import { useDroppable } from '@dnd-kit/core'
import { TierItem } from '../types'
import DraggableImage from './DraggableImage'

interface UnrankedPoolProps {
  items: TierItem[]
}

export default function UnrankedPool({ items }: UnrankedPoolProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'unranked',
  })

  return (
    <div
      ref={setNodeRef}
      className={`h-full bg-[#e0e5ec] rounded-2xl p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 items-start content-start overflow-auto transition-all ${
        isOver ? 'bg-[#cdd5e0]' : ''
      }`}
      style={{ 
        touchAction: 'pan-x',
        boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
      }}
    >
      {items.map((item) => (
        <DraggableImage key={item.id} item={item} isDragging={false} />
      ))}
    </div>
  )
}
