function initMap() {
    const minhaLocalizacao = { lat: -23.55052, lng: -46.633309 };
    const mapa = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: minhaLocalizacao,
    });

    new google.maps.Marker ({
        position: minhaLocalizacao,
        map: mapa,
        title: "Aqui estou eu!",
    });
}