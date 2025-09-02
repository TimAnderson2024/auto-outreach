import apiClient from "./api-client.ts";

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(params?: Record<string, any>) {
        const controller = new AbortController();
        const request = apiClient.get<T>(this.endpoint, {
            params,
            signal: controller.signal,
        })
        return { request, cancel: () => controller.abort()}
    }

    delete(id : number) {
        return apiClient.delete(this.endpoint + "/" + id)
    }

    post<T>(entity: T) {
        return apiClient.post(this.endpoint, entity)
    }

    createAtPath<T>(fullPath: string, entity: T) {
        return apiClient.post(`${this.endpoint}/${fullPath}`, entity)
    }

    createNested<T>(nestedPath: string, entity : T) {
        return apiClient.post(`${this.endpoint}/${nestedPath}`, entity)
    }

    put<T extends Entity>(entity: T) {
        return apiClient.patch<T>(this.endpoint + "/" + entity.id, entity)
    }
}

const create = (endpoint : string) => new HttpService(endpoint);

export default create;