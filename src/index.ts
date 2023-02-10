export {};

const container = document.querySelector(".container") as HTMLDivElement;
let form = document.querySelector("#message-form") as HTMLFormElement;
let messageInput = document.querySelector("#message-input") as HTMLInputElement;

const renderMain = () => {
    window.location = window.location.href.split("#")[0] as (string | Location) & Location;
    container.innerHTML = `<form id="message-form">
        <h1>Secret Message</h1>
        <div class="form-field">
            <input id="message-input" placeholder="Write your message..." aria-label="Message Input" />
            <span class="error-msg hidden">Enter your message</span>
        </div>
        <button>Create</button>
    </form>`;
    form = document.querySelector("#message-form") as HTMLFormElement;
    messageInput = document.querySelector("#message-input") as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    form.addEventListener("submit", createMessage);
};

const renderMessageLink = (link: string) => {
    container.innerHTML = `<h2>Share this link</h2>
                                <span id="link">${window.location.href.split("#")[0]}#${link}</span>
                                <span class="text-btn" id="return">Create new message</span>`;
    const returnBtn = document.querySelector("#return") as HTMLSpanElement;
    returnBtn.addEventListener("click", renderMain);
    const linkUrl = document.querySelector("#link") as HTMLSpanElement;
    linkUrl.addEventListener("click", () => navigator.clipboard.writeText(linkUrl.innerText));
};

const renderSecretMessage = () => {
    container.innerHTML = `<h2>${atob(window.location.hash.replace("#", ""))}</h2>
    <span class="text-btn" id="return">Create your own secret message</span>`;
    const returnBtn = document.querySelector("#return") as HTMLSpanElement;
    returnBtn.addEventListener("click", renderMain);
};

const createMessage = (e: Event) => {
    e.preventDefault();
    if (messageInput.value.trim() === "") {
        messageInput.classList.add("error");
        messageInput.parentNode?.querySelector(".error-msg")?.classList.remove("hidden");
        return;
    }
    messageInput.classList.remove("error");
    messageInput.parentNode?.querySelector(".error-msg")?.classList.add("hidden");
    const message = messageInput.value.trim();
    renderMessageLink(btoa(message));
};

form.addEventListener("submit", createMessage);

if (window.location.hash) {
    renderSecretMessage();
}
