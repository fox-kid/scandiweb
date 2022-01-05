import { Component } from "react";
import styles from "./Carousel.module.css";
import left_arrow from "../../assets/images/left_arrow.png";
import right_arrow from "../../assets/images/right_arrow.png";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
    this.incrementIndex = this.incrementIndex.bind(this);
    this.decrementIndex = this.decrementIndex.bind(this);
  }

  incrementIndex() {
    this.state.imgIndex < this.props.images.length - 1
      ? this.setState({ imgIndex: this.state.imgIndex + 1 })
      : this.setState({ imgIndex: 0 });
  }

  decrementIndex() {
    this.state.imgIndex > 0
      ? this.setState({ imgIndex: this.state.imgIndex - 1 })
      : this.setState({ imgIndex: this.props.images.length - 1 });
  }

  render() {
    return (
      <div
        className={`${styles.carousel_wrapper} ${
          this.props.showModal && styles.modal_cart
        }`}
      >
        <button
          className={`${styles.btn_arrow} ${styles.left_arrow}`}
          onClick={() => this.decrementIndex()}
        >
          <img src={left_arrow} alt="left_arrow" />
        </button>
        <div className={styles.carousel_content}>
          <img
            src={this.props.images[this.state.imgIndex]}
            alt="carousel_img"
          />
        </div>
        <button
          className={`${styles.btn_arrow} ${styles.right_arrow}`}
          onClick={() => this.incrementIndex()}
        >
          <img src={right_arrow} alt="right_arrow" />
        </button>
      </div>
    );
  }
}

export default Carousel;
