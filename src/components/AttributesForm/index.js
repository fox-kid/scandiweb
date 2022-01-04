import { Component } from "react";
import styles from "./AttributesForm.module.css";

class AttributesForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active: [],
  //   };
  // this.toggleClass = this.toggleClass.bind(this);
  // }

  // toggleClass(attrName, option) {
  //   const existingActive = this.state.active.find(
  //     (item) => item.name === attrName
  //   );

  //   existingActive
  //     ? this.state.active.map((item) => {
  //         item.name === attrName
  //           ? {
  //               ...item,
  //               value: option.value,
  //             }
  //           : item;
  //       })
  //     : this.setState({
  //         active: [
  //           ...this.state.active,
  //           {
  //             name: attrName,
  //             value: option.value,
  //           },
  //         ],
  //       });
  // }

  render() {
    return (
      <form>
        {this.props.values.map((attr) => (
          <div key={attr.name}>
            <p className={styles.attribute_name}>{attr.name}:</p>
            <div className={styles.options_wrapper}>
              {attr.items.map((option) => (
                <label
                  key={option.id}
                  htmlFor={(attr.name + option.id) // Because it would find attribute with option ID yes/no and had a bug
                    .split(" ")
                    .join("_")
                    .toLowerCase()}
                  className={styles.option_box}
                >
                  <input
                    type="radio"
                    name={attr.name}
                    id={(attr.name + option.id)
                      .split(" ")
                      .join("_")
                      .toLowerCase()}
                    value={option.id}
                    style={{ display: "none" }}
                    onClick={(e) =>
                      this.props.updateSelectedOptions({
                        name: e.target.name,
                        displayValue: e.target.value,
                        type: attr.type,
                        value: option.value,
                      })
                    }
                  />
                  <div
                    className={`${styles.option}`}
                    value={option.id}
                    // onClick={() => this.toggleClass(attr.name, option)}
                    onKeyDown={this.handleKeyDown}
                    role="presentation"
                    style={{
                      backgroundColor:
                        attr.type === "swatch" ? `${option.value}` : "none",
                    }}
                  >
                    {attr.type !== "swatch" && option.displayValue}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
        {/* {!this.props.choseAllAttributes && (
          <p className={`${styles.submit_text} ${styles.submit_error}`}>
            *Please choose your options for all the attributes.
          </p>
        )}
        {this.props.submitted && (
          <p className={`${styles.submit_text} ${styles.submit_success}`}>
            Item was added to your cart.
          </p>
        )} */}
      </form>
    );
  }
}

export default AttributesForm;
