import { HttpResponse } from "src/models"

export const internalServerError = (res: HttpResponse) => {
    return res.json({ msg: "Internal Server Error" }).status(500)
}
export const noContent = (res: HttpResponse) => {
    return res.status(204)
}
export const ok = (res: HttpResponse, body: Record<string, unknown>, message: string) => {
    return res.status(200).json({ body, message })
}
