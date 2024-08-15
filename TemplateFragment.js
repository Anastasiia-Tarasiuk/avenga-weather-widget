import { getGeolocation } from "./fetch";

const template = document.querySelector("#root-template").shadowRoot;

getGeolocation({key: "ad3e4f050c831243787b3b3283c70545", language: "uk", root: template, type: "template"}); 
