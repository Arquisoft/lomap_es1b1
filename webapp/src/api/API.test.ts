import { addPublicLocation, deletePublicLocation, getPublicLocations, updatePublicLocation } from "./API";


test("funcion para listar direcciones", async () => {
        try {
        let dir = await getPublicLocations()
        } catch (error) {}
});

test("funcion para añadir direccion", async () => {
        try {
        let dir = await addPublicLocation({
            id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
            category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee:false,
            reviews: [], webId: ""
        })
        } catch (error) {}
});

test("funcion para actualizar direcciones", async () => {
    try {
    let dir = await updatePublicLocation({
        id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee:false,
        reviews: [], webId: ""
    })
    } catch (error) {}
});

test("funcion para borrar direcciones", async () => {
    try {
    let dir = await deletePublicLocation({
        id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: true, description: "Sin descripción", canFriendsSee:false,
        reviews: [], webId: ""
    })
    } catch (error) {}
});
