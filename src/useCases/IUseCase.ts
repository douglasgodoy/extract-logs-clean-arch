export interface UseCaseResponse<T = Record<string, any>> {
  statusCode: number,
  message?: string,
  body?: T
}

export interface IUseCase {
  execute(...params: any[]): Promise<UseCaseResponse>
}
