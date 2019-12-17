import Categorie from "../models/categorie";
import Restant from "../models/restant";

export const CATEGORIES = [
  new Categorie(
    "c1",
    "Italiaans",
    require("../assets/images/categories/italiaans.png")
  ),
  new Categorie(
    "c2",
    "Amerikaans",
    require("../assets/images/categories/amerika.png")
  ),
  new Categorie(
    "c3",
    "Belgisch",
    require("../assets/images/categories/belgisch.png")
  ),
  new Categorie(
    "c4",
    "Mexicaans",
    require("../assets/images/categories/mexico.png")
  ),
  new Categorie(
    "c8",
    "Japans",
    require("../assets/images/categories/japan.png")
  ),
  new Categorie(
    "c9",
    "Chinees",
    require("../assets/images/categories/china.png")
  ),
  new Categorie(
    "c5",
    "Groenten",
    require("../assets/images/categories/groenten.png")
  ),
  new Categorie(
    "c6",
    "Vlees",
    require("../assets/images/categories/vlees.png")
  ),
  new Categorie("c7", "Vis", require("../assets/images/categories/vis.png")),
  new Categorie(
    "c10",
    "Fruit",
    require("../assets/images/categories/fruit.png")
  )
];

export const MEALS = [
  new Restant(
    "1",
    "u1",
    ["c1", "c6"],
    "10/12/2019",
    "Spaghetti Carbonara",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg",
    false,
    false,
    false,
    true
  ),
  new Restant(
    "2",
    "u1",
    ["c7", "c5"],
    "13/12/2019",
    "Salade met gerookte zalm",
    "https://cdn.pixabay.com/photo/2016/10/25/13/29/smoked-salmon-salad-1768890_1280.jpg",
    true,
    false,
    false,
    true
  ),
  new Restant(
    "3",
    "u2",
    ["c1", "c6"],
    "10/12/2019",
    "Spaghetti Carbonara",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg",
    false,
    false,
    false,
    true
  )
];
