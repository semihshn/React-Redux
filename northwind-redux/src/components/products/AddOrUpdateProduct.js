import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveProduct } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {//useEffect=ComponentDidMount
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({...props.product });
  }, [props.product]);

  //Özetle handleChange fonksiyonu inputtan string formatında gelen categoryId değerinini Integer değere döndürür ki sonradan Crud işlemleri yaparken sıkıntı çıkmasın
  function handleChange(event) {//event=TextInputun içindeki HTML <input> elementinin onChange attribute'u
    const { name, value } = event.target;
    setProduct((previousProduct) => ({//previousProduct=State'deki product yani önceki product yani en son tutulan product
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value){
    if (name === "productName" && value === ""){
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün İsmi Olmalıdır",
      }));
    }else{
      setErrors((previousErrors) => ({ ...previousErrors, productName: "" }));
    }
  }

  function handleSave(event){
    event.preventDefault();//preventDefault() fonksiyonu o sayfanın refresh olmasını engelliyor
    saveProduct(product).then(() => {//then()=saveProduct() fonksiyonunu çalıştırıp ürünü ekledikten sonra anlamına geliyor
      history.push("/");//redux kullanıcının daha önce bulunduğu sayfaların adresini kayıt altında tutuyor , history objesi aracılığıyla buna ulaşıyoruz yani kullanıcı ekleme işlemi yaptıktan sonra daha önce bulunduğu adrese gidiyor yani saveproduct(AddOrUpdateProduct) , başka bir adrese göndermek için push içine değer verebiliriz
    });
  }
 
  return (
    <ProductDetail
      categories={categories}
      product={product}
      onSave={handleSave}
      onChange={handleChange}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {//ownProps=Şuan Bulunduğumuz Componente Ait Kendi Props'ı
  const productId = ownProps.match.params.productId;//AddOrUpdateProduct componentine ait propslara bak ve productId'yi çek
  const product =
    productId && state.productListReducer.length > 0//productId varsa ve state'in içi boş değilse state'in içinden güncellemek istediğim productId'sini bulucam
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,//product=Güncellenecek product
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
