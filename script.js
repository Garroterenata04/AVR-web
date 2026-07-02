/* =========================
VARIABLES
========================= */

let modalImages = [];
/* pedir a aldana que quieren poner al pasar el cursor, a eso se le agrega el tipo de proyecto que es*/
const proyectosData = [
    { img: "techo.jpg", nombre: "Techo // Proyecto publico" },
    { img: "privcasaamplio.jpg", nombre: "Vivienda // Proyecto privado" },
    { img: "privgob.jpg", nombre: "Edificio institucional // Proyecto publico" },
    { img: "fondo.jpg", nombre: "Galpon // Proyecto privada" },
    { img: "publicreja.jpg", nombre: "Infraestructura // Proyecto publico" },
    { img: "publitech.jpeg", nombre: "Remodelación integral" }, 
    /* { img: "publigalpon.jpeg", nombre: "Construcción comercial" },
    { img: "proyecto8.jpg", nombre: "Centro educativo" },
    { img: "proyecto9.jpg", nombre: "Proyecto urbano" } */
];

const proyectosGrid = document.getElementById("proyectosGrid");
const pagination = document.getElementById("pagination");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCounter = document.getElementById("modal-counter");
const backToTop = document.getElementById("backToTop");

let currentPage = 1;
let currentImageIndex = 0;

const itemsPerPage = 3;


/* =========================
RENDER PROYECTOS
========================= */

function renderProjects(){

    proyectosGrid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentItems = proyectosData.slice(start, end);

    currentItems.forEach((proyecto, index) => {

        const div = document.createElement("div");

        div.classList.add("proyecto");

        div.innerHTML = `
            <img src="img/${proyecto.img}" alt="${proyecto.nombre}">
            <div class="overlay">
                ${proyecto.nombre}
            </div>
        `;

        div.addEventListener("click", () => {

            modalImages = proyectosData.map(p => p.img);

            currentImageIndex = start + index;

            openModal();

        });

        proyectosGrid.appendChild(div);

    });

}


/* =========================
PAGINACIÓN
========================= */

function renderPagination(){

    pagination.innerHTML = "";

    const totalPages = Math.ceil(proyectosData.length / itemsPerPage);

    const prevBtn = document.createElement("button");

    prevBtn.innerHTML = "&#10094;";

    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener("click", ()=>{

        if(currentPage > 1){

            currentPage--;

            renderProjects();

            renderPagination();

        }

    });

    pagination.appendChild(prevBtn);

    for(let i = 1; i <= totalPages; i++){

        const btn = document.createElement("button");

        btn.textContent = i;

        if(i === currentPage){

            btn.classList.add("active");

        }

        btn.addEventListener("click", () => {

            if(i === currentPage) return;

            proyectosGrid.classList.add("fade-out");

            setTimeout(()=>{

                currentPage = i;

                renderProjects();

                renderPagination();

                proyectosGrid.classList.remove("fade-out");

            }, 300);

        });

        pagination.appendChild(btn);

    }

    const nextBtn = document.createElement("button");

    nextBtn.innerHTML = "&#10095;";

    nextBtn.disabled = currentPage === totalPages;

    nextBtn.addEventListener("click", ()=>{

        if(currentPage < totalPages){

            currentPage++;

            renderProjects();

            renderPagination();

        }

    });

    pagination.appendChild(nextBtn);

}


/* =========================
MODAL
========================= */

function openModal(){

    modal.style.display = "flex";

    modalImg.src = "img/" + modalImages[currentImageIndex];

    modalCounter.textContent = `${currentImageIndex + 1} / ${modalImages.length}`;

}

function closeModal(){

    modal.style.display = "none";

}

function nextImage(){

    currentImageIndex =

        (currentImageIndex + 1) % modalImages.length;

    modalImg.src = "img/" + modalImages[currentImageIndex];

    modalCounter.textContent =

        `${currentImageIndex + 1} / ${modalImages.length}`;

}

function prevImage(){

    currentImageIndex =

        (currentImageIndex - 1 + modalImages.length) % modalImages.length;

    modalImg.src = "img/" + modalImages[currentImageIndex];

    modalCounter.textContent =

        `${currentImageIndex + 1} / ${modalImages.length}`;

}


/* =========================
EVENTOS MODAL
========================= */

document.querySelector(".close-modal")

    .addEventListener("click", closeModal);


modal.addEventListener("click", (e)=>{

    if(e.target === modal){

        closeModal();

    }

});


/* =========================
FLECHAS TECLADO
========================= */

document.addEventListener("keydown", (e)=>{

    if(modal.style.display === "flex"){

        if(e.key === "ArrowRight") nextImage();

        if(e.key === "ArrowLeft") prevImage();

    }

});


/* =========================
SWIPE MÓVIL
========================= */

let touchStartX = 0;

let touchEndX = 0;

modal.addEventListener("touchstart", e=>{

    touchStartX = e.changedTouches[0].screenX;

});

modal.addEventListener("touchend", e=>{

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    if(touchEndX < touchStartX - 50){

        nextImage();

    }

    if(touchEndX > touchStartX + 50){

        prevImage();

    }

}


/* =========================
BOTÓN BACK TO TOP
========================= */

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 900){

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", (e)=>{

    e.preventDefault();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================
INICIALIZAR
========================= */

renderProjects();

renderPagination();


/* =========================
SERVICIOS - ABRIR MODAL
========================= */

const serviceCards = document.querySelectorAll(".card");

serviceCards.forEach(card => {

    card.addEventListener("click", () => {

        const imagesData = card.getAttribute("data-images");

        if(!imagesData) return;

        modalImages = imagesData.split(",").map(img => img.trim());

        currentImageIndex = 0;

        openModal();

    });

});

// ================= GALERIA DE VIDEOS =================

const videoItems = document.querySelectorAll(".video-item");
const videoModal = document.getElementById("videoModal");
const videoGrande = document.getElementById("videoGrande");
const cerrarVideo = document.querySelector(".close-video");
const prevVideo = document.querySelector(".video-prev");
const nextVideo = document.querySelector(".video-next");

let videosList = [];
let currentVideoIndex = 0;

// armar lista de videos
videoItems.forEach((item, index) => {

    const src = item.querySelector("source").getAttribute("src");
    videosList.push(src);

    item.addEventListener("click", () => {

        currentVideoIndex = index;

        openVideoModal();

    });

});

function openVideoModal(){

    videoModal.style.display = "flex";
    videoGrande.src = videosList[currentVideoIndex];
    videoGrande.play();

}

function closeVideoModal(){

    videoModal.style.display = "none";
    videoGrande.pause();
    videoGrande.src = "";

}

function nextVid(){

    currentVideoIndex = (currentVideoIndex + 1) % videosList.length;
    videoGrande.src = videosList[currentVideoIndex];
    videoGrande.play();

}

function prevVid(){

    currentVideoIndex = (currentVideoIndex - 1 + videosList.length) % videosList.length;
    videoGrande.src = videosList[currentVideoIndex];
    videoGrande.play();

}

// eventos
cerrarVideo.addEventListener("click", closeVideoModal);

nextVideo.addEventListener("click", nextVid);
prevVideo.addEventListener("click", prevVid);

// click afuera
videoModal.addEventListener("click", (e) => {

    if(e.target === videoModal){
        closeVideoModal();
    }

});

// teclado
document.addEventListener("keydown", (e)=>{

    if(videoModal.style.display === "flex"){

        if(e.key === "ArrowRight") nextVid();
        if(e.key === "ArrowLeft") prevVid();

    }

});