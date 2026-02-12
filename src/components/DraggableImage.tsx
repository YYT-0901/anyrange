import { useDraggable } from '@dnd-kit/core'
import { TierItem } from '../types'

interface DraggableImageProps {
  item: TierItem
  isDragging: boolean
}

export default function DraggableImage({ item, isDragging }: DraggableImageProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        touchAction: 'none' as const,
      }
    : {
        touchAction: 'none' as const,
      }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative group cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img
        src={item.url}
        alt="tier item"
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-xl select-none transition-all"
        draggable={false}
        style={{
          boxShadow: '3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff'
        }}
      />
    </div>
  )
}
