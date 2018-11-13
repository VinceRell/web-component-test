/*
    create a template element
    the template element a special element that can hold html fragments
    such a <div>,<p>,<h1> etc... and not have them rendered to a page

    the slot element is a placeholder element in your template element
    that allows you to place in any type of html fragment
*/ 
const template = document.createElement("template");
template.innerHTML = "<style>:host {display: inline-block}</style><slot />";

class LogoSpinner extends HTMLElement {
    constructor() {
        super();
        /*
          attach the shadow root to the custom element
          the mode property takes in either the "open" or "closed" value
          "open" means that you can access shadowDOM method through Javascript
        */
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        /*
            the shadowRoot property is a property that returns the element hosting the shadow
            that was assigned through attachShadow
            the appendChild method adds an element at the end of the nodelist
            cloneNode creates a copy of an existing node element
        */ 
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.animate([
            {transform: "scale(0) rotate(0deg)"},
            {transform: "scale(1) rotate(1080deg)"}
            //{transform: "scale(0) rotate(2160deg)"}
        ], {
            duration: 5000,
            easing: "cubic-bezier(0.88,0.6,0.3,1)",
            fill: "forwards"
        })
    }
}

/*
   customElements registers the custom element on the page and lets you decide on the behaviour
   the 2 arguments it takes are the name of the cutom element and the class objct that defines
   its behaviour
*/ 
customElements.define("logo-spinner", LogoSpinner);