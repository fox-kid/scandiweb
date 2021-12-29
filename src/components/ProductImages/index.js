import { Component } from "react";
import styles from "./ProductImages.module.css";

class ProductImages extends Component {
  render() {
    return (
      <>
        <div className={styles.product_images_carousel}>
          {this.props.values.map((image) => (
            <div
              key={image}
              className={styles.carousel_image}
              onClick={() => this.props.choosePic({ chosenPicSrc: image })}
              role="presentation"
              onKeyDown={this.handleKeyDown}
            >
              <img src={image} alt={`${this.props.values.name}`} />
            </div>
          ))}
        </div>
        <div className={styles.product_image_chosen}>
          <img
            src={
              this.props.chosenPicSrc
                ? this.props.chosenPicSrc
                : this.props.values[0]
            }
            alt={`${this.props.values.name}`}
          />
        </div>
      </>
    );
  }
}

export default ProductImages;
