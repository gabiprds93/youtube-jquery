"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";
class Aplicacion
{
    constructor()
    {
        this.videos = [];
        this.selectedVideo = null;
        this.searchTerm = "";
        this.buscar = $(`#buscar`);
        this.btnBuscar = $(`#btnBuscar`);
        this.lista = $("#root");
        this.video = $(`#video`);
    }
    init() 
    {
        this.buscar.focus();
        this.buscar.keyup((e) =>
        {
            if(e.which == 13)
            {
                this.btnBuscar.click();
            }
        });
        this.btnBuscar.click((e) =>
        {
            e.preventDefault();
            this.lista.empty();
            this.youtubeSearch(this.buscar.val());
            //this.video.append()
        });
        //app.videoSearch("iPhone");
        
    }
    getVideoList(videos) 
    {
        return videos.map((video, index) => 
        {
            console.log(video.snippet.title);
            const imageUrl = video.snippet.thumbnails.medium.url;
            //<iframe class="embed-responsive-item" src=${url}></iframe>
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<li>
                        <p>
                            <img class="media-object" src=${imageUrl} />
                            <label>${video.snippet.title}</label>
                        </p>
                    </li>`;
        });
    }
    youtubeSearch(searchTerm) 
    {
        console.log(searchTerm);

        YTSearch({ key: API_KEY, term: searchTerm }, data => 
        {
            console.log("result", data);
            this.videos = data;
            this.selectedVideo = data[0];
            this.searchTerm = searchTerm;
            let list = this.getVideoList(this.videos);
            console.log(this.selectedVideo);
            this.lista.append(list);
            let videoSelec = this.videoSeleccionado(this.selectedVideo);
            this.video.append(videoSelec);
        });
    }
    videoSeleccionado(video)
    {
        const url = `https://www.youtube.com/embed/${video.id.videoId}`;
        return `<iframe class="embed-responsive-item" src=${url}></iframe>`;
    }
    videoSearch(searchTerm) 
    {
        jQuery.getJSON("list.json", data => 
        {
            console.log("result", data.items);
            this.videos = data.items;
            this.selectedVideo = data.items[0];
            this.searchTerm = searchTerm;
            let list = this.getVideoList(this.videos);
            console.log("lis: ", list);
            $("#root").append(list);
        });
    }
}
let app = new Aplicacion();
$(document).ready(app.init());
