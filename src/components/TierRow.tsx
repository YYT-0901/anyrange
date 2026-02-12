import { useDroppable } from '@dnd-kit/core'
import { Tier } from '../types'
import DraggableImage from './DraggableImage'

interface TierRowProps {
  tier: Tier
}

export default function TierRow({ tier }: TierRowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: tier.id,
  })

  const textColor = tier.color === '#FFFF33' || tier.color === '#FFFDD0' || tier.color === '#F5F5F5' 
    ? 'text-gray-800' 
    : 'text-white'

  return (
    <div 
      className="flex items-stretch rounded-2xl overflow-hidden flex-1"
      style={{
        boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
      }}
    >
      {/* Label Header */}
      <div
        className={`flex items-center justify-center font-bold text-base sm:text-xl w-16 sm:w-[120px] flex-shrink-0 ${textColor}`}
        style={{ backgroundColor: tier.color }}
      >
        {tier.label}
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-1 sm:p-2 bg-[#e0e5ec] flex flex-wrap gap-1 sm:gap-2 items-start content-start overflow-auto transition-all ${
          isOver ? 'bg-[#cdd5e0]' : ''
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {tier.items.map((item) => (
          <DraggableImage key={item.id} item={item} isDragging={false} />
        ))}
      </div>
    </div>
  )
}
