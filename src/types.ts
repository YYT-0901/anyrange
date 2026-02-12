export interface TierItem {
  id: string
  url: string
}

export interface Tier {
  id: string
  label: string
  color: string
  items: TierItem[]
}
