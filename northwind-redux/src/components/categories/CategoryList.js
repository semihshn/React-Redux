import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h5>Seçili Kategori :{this.props.currentCategory.categoryName}</h5> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer, //currentCategory state'ini redux'daki changeCategoryReducer'dan çek anlamına geliyor aslında state=reducer bunu unutma
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  //mapDispatchToProps = Aksiyonları Propslara bağla
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
