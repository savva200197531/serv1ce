import { Service } from '../../types/service'

export type UploadService = (payload: any) => Promise<any>

export type DeleteService = (payload: any) => Promise<any>

export interface ServicesContextProps {
  services: Service[]
  loading: boolean
  uploadService: UploadService
  deleteService: DeleteService
}
