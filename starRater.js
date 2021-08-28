class StarRater extends HTMLElement {
    constructor() {
        super(); //o super puxa todas as funcionalidades da dom do HTMLElement
        this.build();
    }

    build() {
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.styles());
        const rater = this.createRater();
        this.stars = this.createStars();
        this.stars.forEach((star) => rater.appendChild(star));
        this.resetRating();
        shadow.appendChild(rater);
    }

    createRater() {
        const rater = document.createElement("div");
        rater.classList.add("star-rater");
        return rater;
    }

    createStars() {
        const createStar = (_, id) => {
            //Primeiro parametro _ porque é apenas o length, e o segundo o index.
            const star = document.createElement("span");
            star.classList.add("star"); //coloca a 'star' como class
            star.setAttribute("data-value", Number(id) + 1);
            star.innerHTML = "&#9733;";

            star.addEventListener("click", this.setRating.bind(this)); //bind para trazer o this para o evento
            star.addEventListener("mouseover", this.ratingHover.bind(this)); //bind para trazer o this para o evento
            star.addEventListener("mouseout", this.resetRating.bind(this)); //bind para trazer o this para o evento

            return star;
        };
        return Array.from({ length: 5 }, createStar);
    }

    setRating(event) {
        this.setAttribute("data-rating", event.currentTarget.getAttribute("data-value"));
    }

    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute("data-value");
        this.hightlightRating();
    }

    hightlightRating() {
        this.stars.forEach((star) => {
            //verifica se currentRating que é o data-value de cada estrela é maior ou igual ao data-value de cada estrela
            star.style.color = this.currentRatingValue >= star.getAttribute("data-value") ? "gold" : "gray";
        });
    }

    resetRating() {
        this.currentRatingValue = this.getAttribute("data-rating") || 0;
        this.hightlightRating();
    }

    styles() {
        const style = document.createElement("style");

        style.textContent = `
        .star{
            font-size: 5rem; 
            color: gray;
            cursour: pointer;
        }
      `;

        return style;
    }
}

customElements.define("star-rater", StarRater); // todo custom element precisa ser composto usando -
