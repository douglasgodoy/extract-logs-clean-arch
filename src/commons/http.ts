import { HttpResponse } from "src/models"

export const internalServerError = (res: HttpResponse) => {
    return res.status(500).json({ msg: "Internal Server Error" })
}
export const noContent = (res: HttpResponse) => {
    return res.status(204)
}
export const ok = (res: HttpResponse, body: Record<string, unknown> | Array<object>, message: string) => {
    return res.status(200).json({ body, message })
}

