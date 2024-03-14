export interface EntityNames {
  id: string
  origin: 'accounts' | 'logistics' | 'services' | 'vehicles' | 'manufactures'
  name: string
  deviceToken: string | null
}
