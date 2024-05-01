import { fetchQuantities } from "@/types";

export function urlMaker(query: string) {
  const Cmsurl = process.env.CmsQueryUrl;
  return Cmsurl + encodeURIComponent(query);
}

class CMS {
  bestProductsUrl() {
    return urlMaker(`
    *[
    _type == "product" && _id in *[ _type == "Best"].product._ref
    ]
    {
      "id": _id,
      "title": name,
      "image": images[0].asset -> url,
      price
    }`);
  }

  productsUrl() {
    return urlMaker(`
    *[ _type == "product" ]
    {
      "id": _id,
      "title": name,
      "image": images[0].asset -> url,
      price
    }`);
  }
  
  searchProductsUrl(query: string) {
    return urlMaker(`
    *[ _type == "product" && name match "${query}*" ]
    {
      "id": _id,
      "title": name,
      "image": images[0].asset -> url,
      price
    }`);
  }

  searchProductUrl(value: string) {
    return urlMaker(`
    *[ _type == "product" && title == "${value}" ]
    {
      "id": _id,
      "title": name,
      "image": images[0].asset -> url,
      price
    }
    `);
  }

  categoriesUrl() {
    return urlMaker(`
    *[ _type == "Category" ]{ "id": _id, name }
    `);
  }

  getIdProductUrl(id: string) {
    return urlMaker(`
    *[ 
      _type == "product"
      &&
      _id == "${id}"
    ]{
      "id": _id,
      "title": name,
      "images": images[].asset -> url,
      price,
      "category":  category -> {name, "id": _id},
      quantity
    }
    `);
  }

  getProductsQty(ids: string[]) {
    const idsString = ids.reduce((accumulator, currentValue, index) => {
      if (index === 0) return `"${currentValue}"`;
      else return accumulator + `,"${currentValue}"`;
    }, "");
    return urlMaker(`
    *[
      _type == "product" && _id in [${idsString}]
    ]{ "id": _id, quantity }
    `);
  }

  async patchProductsAty(changes: { id: string; num: number }[]) {
    const id = changes.map((value) => value.id);
    const url = this.getProductsQty(id);
    const qtyResponse = await fetch(url);
    const qtyData: fetchQuantities[] = await qtyResponse.json();

    const mutations = changes.map((value) => {
      const wantedId = qtyData.find(
        (data) => value.id === data.id,
      ) as fetchQuantities;
      const wantedNumber = wantedId.quantity;
      return {
        patch: {
          id: value.id,
          set: {
            quantity: wantedNumber - value.num,
          },
        },
      };
    });

    const body = JSON.stringify({ mutations });
    const mutateUrl = process.env.CmsMutateUrl as string;
    const mutatekey = process.env.SANITY_KEY as string;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${mutatekey}`);
    myHeaders.append("Content-Type", "application/json");

    const responseOptions = {
      method: "POST",
      headers: myHeaders,
      body
    }

    const response = await fetch(mutateUrl, responseOptions)

    if (response.ok) {
      console.log("Change successful")
    }
  }
}

export const cmsClient = new CMS();

export default CMS;
