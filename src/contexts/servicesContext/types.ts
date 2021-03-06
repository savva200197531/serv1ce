import { Service, ServiceFields } from '../../types/service'

export type UploadService = (payload: ServiceFields) => Promise<any>

export type DeleteService = (id: string) => Promise<any>

export type GetService = (id: string) => Service

export interface ServicesContextProps {
  services: Service[]
  loading: boolean
  uploadService: UploadService
  deleteService: DeleteService
  getService: GetService
}
