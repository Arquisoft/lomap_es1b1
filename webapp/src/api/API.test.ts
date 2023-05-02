import { addPublicLocation, deletePublicLocation, getPublicLocations, updatePublicLocation } from "./API";

global.fetch = () => {
    return {json: jest.fn()} as any
}


test("funcion para listar direcciones", async () => {
    let dir = await getPublicLocations()
});

test("funcion para añadir direccion", async () => {
    let dir = await addPublicLocation({
        id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee: false,
        reviews: [], webId: ""
    })
});

test("funcion para actualizar direcciones", async () => {
    let dir = await updatePublicLocation({
        id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee: false,
        reviews: [], webId: ""
    })
});

test("funcion para borrar direcciones", async () => {
    let dir = await deletePublicLocation({
        id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee: false,
        reviews: [], webId: ""
    })
});
