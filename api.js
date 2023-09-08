const URL = 'http://localhost:3000'; //Trayendo la URL del JSON. Enlace general del JSON//Lugo hay que sustituirla en el raywail


export const getContact = async () => {
    try {

        let { data } = await axios(`${URL}/usuarios`);
        console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}