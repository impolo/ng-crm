export class Category {
  categoryId: string = ""
  categoryName: string = ""
  level: string
  parentId: string
  owner: string
  active: string
  childrens: any[]

  static extract(obj: any[]): Category[] {
    return obj.map(data => {
      let category = new Category()
      category.categoryId = data["114.93"]
      category.categoryName = data["120.45"]
      category.level = data["120.44"]
      category.parentId = data["122.21"]
      category.owner = data["127.10"]
      category.active = data["122.183"]
      category.childrens = []

      return category
    })
  }

}
