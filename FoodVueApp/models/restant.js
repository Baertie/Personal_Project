class Restant {
  constructor(
    id,
    ownerId,
    categoryIds,
    date,
    title,
    imageUrl,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.categoryIds = categoryIds;
    this.date = date;
    this.title = title;
    this.imageUrl = imageUrl;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Restant;
